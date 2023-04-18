const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const { slash } = require(`gatsby-core-utils`)
const _ = require(`lodash`)
const slugify = require(`slugify`); // Traverse is a es6 module...


Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

Array.prototype.explode = function(separator) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if(this[i]) {
    var subarr = this[i].split(separator);
    arr.push(separator);
    for (var j = 2; j <= subarr.length; j++) {
      arr.push( subarr.slice(0,j).join(separator) )
    }
    }
  }
  return arr;
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  let relativePath = "/"
  if (node.internal.type === `GPXLineString`) {
    relativePath = createFilePath({ node, getNode, trailingSlash: false }).replace(/[|&;$%@"<>()+,]/g, "").replaceAll(/ /g, '-').toLowerCase()
  }
    const { dir = ``, name } = path.parse(relativePath)

   createNodeField({
     node,
     name: `mydir`,
     value: dir
   });

   createNodeField({
     node,
     name: `myname`,
     value: name
   });

    createNodeField({
      node,
      name: `slug`,
      value: relativePath,
    });


  if (node.internal.type === `MarkdownRemark`) {
    const parent = getNode(node.parent);
    let collection = parent.sourceInstanceName;
    const relativePath = createFilePath({ node, getNode, trailingSlash: false }).replace(/[|&;$%@"<>()+,]/g, "").replaceAll(/ /g, '-').toLowerCase()
    const { dir = ``, name } = path.parse(relativePath)

   createNodeField({
     node,
     name: `mydir`,
     value: dir
   });

   createNodeField({
     node,
     name: `myname`,
     value: name
   });

    createNodeField({
      node,
      name: `slug`,
      value: relativePath,
    });

    createNodeField({
      node,
      name: 'collection',
      value: collection,
    });

  }

  if (node.internal.type === `MysqlAlbums` || node.internal.type === 'MysqlParentAlbums') {
    const slug = node.album_path.replace(/[|&;$%@"<>()+,]/g, "").replaceAll(/ /g, '-').toLowerCase()
    createNodeField({
      node,
      name: `slug`,
      value: slug
    });
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  //get all phototag pages
  let phototagPages = []
  const phototagPageQuery = await graphql(`{
  allMysqlTags {
    edges {
      node {
        name
        tag_full
      }
    }
  }
  photoTagDirs: allMysqlTags {
    distinct(field: {tag_hierarchy: SELECT})
  }
}`)

  if (phototagPageQuery.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create phototag  pages
  phototagPageQuery.data.allMysqlTags.edges.forEach(({ node }) => {
    const slug = node.tag_full.split('/').map( e => _.kebabCase(e) ).join('/');
    phototagPages.push(slug)
    createPage({
      path: '/phototags' + slug,
      component: path.resolve(`./src/templates/phototag.js`),
      context: {
        slug: slug,
        pageTitle: node.name,
        tag_full: node.tag_full
      },
    })
  })

  phototagPageQuery.data.photoTagDirs.distinct.explode('/').unique().filter( p => !phototagPages.includes(p)).forEach( ptdir => {
    const slug = ptdir.split('/').map( e => _.kebabCase(e) ).join('/');
    const pageTitle = ptdir.split('/').slice(-1)[0].replace(/_/g, ' ')
    createPage({
      path: '/phototags' + slug,
      component: path.resolve(`./src/templates/phototag.js`),
      context: {
        slug: slug,
        pageTitle: pageTitle,
        tag_full: ptdir,
      },
    })
  })

  //get all gpxmarkdown
  let gpxpages = []
  const gpxmarkdown = await graphql(`{
        allMarkdownRemark(
          filter: { fields: { collection: { eq: "gpx" } } }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }`)

  if (gpxmarkdown.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create gpx  pages
  gpxmarkdown.data.allMarkdownRemark.edges.forEach(({ node }) => {
    gpxpages.push(node.fields.slug)
    createPage({
      path: '/maps' + node.fields.slug,
      component: path.resolve(`./src/templates/gpxpage.js`),
      context: {
        slug: node.fields.slug,
        id: node.id
      },
    })
  })

  const gpxDirs = await graphql(`{
  allGpxDirs: allGpXfile {
    distinct(field: {mydir: SELECT})
  }
  allGpXfile {
    nodes {
      slug
    }
  }
}`)

  if (gpxDirs.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  gpxDirs.data.allGpxDirs.distinct.explode('/').unique().filter( n => n ).filter( p => !gpxpages.includes(p)).forEach( gpxdir => {
    createPage({
      path: '/maps' + gpxdir,
      component: path.resolve(`./src/templates/gpxpage.js`),
      context: {
        slug: gpxdir
      },
    })
  })

  gpxDirs.data.allGpXfile.nodes.forEach( node => {
    createPage({
      path: '/maps' + node.slug,
      component: path.resolve(`./src/templates/gpxpage.js`),
      context: {
        slug: node.slug,
        id: node.id
      },
    })
  })

  //get all blog markdown
  const result = await graphql(`{
        allMarkdownRemark(
          filter: {fields: {collection: {eq: "blog"}}, frontmatter: {public: {eq: "yes"}}}
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }`)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create blog pages
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: '/blog' + node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
        id: node.id
      },
    })
  })

  // Create blog index pages
  const posts = result.data.allMarkdownRemark.edges
  const postsPerPage = 6
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/p/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.js"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })

  // Get all notes markdown
  const notes_result = await graphql(`{
        allMarkdownRemark(
          filter: {fields: {collection: {eq: "notes"}}, frontmatter: {public: {eq: "yes"}}}
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }`)

  if (notes_result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create individual note pages
  notes_result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  // Create notes index pages
  const notes = notes_result.data.allMarkdownRemark.edges
  const notesPerPage = 6
  const numNotePages = Math.ceil(notes.length / notesPerPage)
  Array.from({ length: numNotePages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/notes` : `/notes/p/${i + 1}`,
      component: path.resolve("./src/templates/notes-list-template.js"),
      context: {
        limit: notesPerPage,
        skip: i * notesPerPage,
        numNotePages,
        currentPage: i + 1,
      },
    })
  })


/*
  // Get all gpx directories
  const gpx_result = await graphql(`{
      allGpXfile {
          distinct(field: mydir)
      }
  }`)

  if (gpx_result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create gpx landing pages
  gpx_result.data.allGpXfile.distinct.forEach( value => {
    createPage({
      path: '/maps' + value,
      component: path.resolve(`./src/templates/gpx-list-template.js`),
      context: {
        slug: value,
      },
    })
  })
 * 2023-01-31 wjm
*/

  const tag_result = await graphql(`
    {
  tagsGroup: allMarkdownRemark {
    group(field: {frontmatter: {tags: SELECT}}) {
      fieldValue
    }
  }
}
  `)

  // handle errors
  if (tag_result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  tag_result.data.tagsGroup.group.forEach(tag => {
    createPage({
      path: `/tags/${tag.fieldValue}/`,
      component: path.resolve("src/templates/tag-list-template.js"),
      context: {
        tag: tag.fieldValue,
      },
    })
  })

}
