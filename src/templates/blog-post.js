import * as React from 'react'
import BasePage from '../components/basepage'
import TagCard from '../components/tagcard'
import NoteLink from '../components/notelink'
import GalleryCard from '../components/gallerycard'
import { Link, graphql } from 'gatsby'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

//import 'react-medium-image-zoom/dist/styles.css'

const BlogPost = ({ pageContext, data, location}) => {
  const relatedNotes = data.allMarkdownRemark.nodes.filter( node => node.fields.mydir === data.markdownRemark.fields.slug );
  return (
<BasePage pageContext={pageContext} pageTitle={data.markdownRemark.frontmatter.title} location={location} image={data.markdownRemark.frontmatter.featuredImage} description={data.markdownRemark.excerpt}>
            <section>
                <div className="container px-5 my-5">
                    <div className="row gx-5">
                        <div className="col-lg-3 bg-light no-print">
                            <div className="d-flex align-top mt-lg-5 mb-4 ">
                                { data.markdownRemark.frontmatter.author &&
                                <img className="rounded-circle" width="40" height="40" src={data.markdownRemark.frontmatter.author.avatar} alt={data.markdownRemark.frontmatter.author.name}/>
                                }
                                <div className="ms-3">
                                    { data.markdownRemark.frontmatter.author &&
                                    <div className="fw-bold">{data.markdownRemark.frontmatter.author.name}</div>
                                    }
                                    <div className="text-muted">{data.markdownRemark.frontmatter.date}</div>
                                    {data.markdownRemark.tableOfContents && <div className="ms-3"><div className="toc" dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }}/><hr/></div>}
                                    {data.markdownRemark.frontmatter.tags && data.markdownRemark.frontmatter.tags.length > 0 && <div className="ms-3">{ data.markdownRemark.frontmatter.tags.map(node => ( <TagCard tag={node} key="wrapper{node.name}" keyPrefix="pagetags" /> )) }<hr/></div> }
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            {data.markdownRemark.frontmatter.title && <h1 className="d-none">{data.markdownRemark.frontmatter.title}</h1>}
                            <article className="clearfix">
                                {data.markdownRemark.frontmatter.featuredImage &&
                                    <section className="w-50 float-md-end no-print">
                                      <figure className="figure">
                                          <Zoom>
                                            <img className="img-fluid" src={data.markdownRemark.frontmatter.featuredImage} alt="" />
                                          </Zoom>
                                        {data.markdownRemark.frontmatter.featuredImageCaption && <figcaption className="figure-caption" >{data.markdownRemark.frontmatter.featuredImageCaption}</figcaption>}
                                      </figure>
                                    </section>
                                }
                                <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>
                                </article>
                            { relatedNotes.length > 0 && 
                                <section className="py-3">
                                    <h2>Notes related to {data.markdownRemark.frontmatter.title}:</h2>
                                    <div className="row gx-5">
                                    {
                                      relatedNotes.map(note => (
                                        <NoteLink note={note}  key={note.fields.slug}/>
                                      ))
                                    }
                                    </div>
                                </section>
                            }
                            { data.mysqlParentAlbums && data.mysqlParentAlbums.albums.length > 0 &&
                                <section className="py-3">
                                  <h2>{data.markdownRemark.frontmatter.title} Galleries:</h2>
                                  <div className="row gx-5">
                                      {
                                          data.mysqlParentAlbums.albums.slice(0,3).map(node => (
                                              <GalleryCard album={node}/>
                                          ))
                                      }
                                  </div>
                                  { data.mysqlParentAlbums.albums.length > 3 &&
                                      <div className="text-end mb-5 mb-xl-0">
                                          <Link className="text-decoration-none" to={"/photos" + data.mysqlParentAlbums.fields.slug}>
                                              More galleries
                                              <i className="bi bi-arrow-right"></i>
                                          </Link>
                                      </div>
                                  }
                                </section>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </BasePage>
  )
}

export const query = graphql`
query pageUsersmckeehansrcki4HduWebsrctemplatesblogPostJs2106917372($slug: String) {
  markdownRemark(fields: {slug: {eq: $slug}}) {
    fields {
      mydir
      slug
    }
    headings {
      value
      depth
    }
    frontmatter {
      title
      author {
        name
        avatar
      }
      date(formatString: "MMMM D, YYYY")
      featuredImage
      featuredImageCaption
      tags
    }
    excerpt
    html
    tableOfContents(maxDepth: 3)
  }
  allMarkdownRemark(sort: {frontmatter: {title: ASC}}) {
    nodes {
      excerpt
      fields {
        mydir
        slug
      }
      frontmatter {
        title
        author {
          name
          avatar
        }
        date(formatString: "MMMM D, YYYY")
        featuredImage
      }
    }
  }
  mysqlParentAlbums(fields: {slug: {eq: $slug}}) {
    fields {
      slug
    }
    album_path
    album_caption
    album_date(formatString: "MMMM D, YYYY")
    album_image_path
    albums {
      album_path
      album_caption
      album_date(formatString: "MMMM D, YYYY")
      album_image_path
    }
    images {
      image_path
      image_name
      image_caption
      image_title
      creationDate(formatString: "MMMM D, YYYY")
      full_image_path
    }
  }
}
`

export default BlogPost
