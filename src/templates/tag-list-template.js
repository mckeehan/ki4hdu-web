import * as React from "react"
import { graphql } from 'gatsby'
import BasePage from '../components/basepage'
import NoteCard from '../components/notecard'
import ImageCard from '../components/imagecard'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

// eslint-disable-next-line no-extend-native
Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

// eslint-disable-next-line no-extend-native
Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

// eslint-disable-next-line no-extend-native
Array.prototype.explode = function(separator) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if(this[i]) {
    var subarr = this[i].split(separator);
    for (var j = 0; j <= subarr.length; j++) {
      arr.push( subarr.slice(0,j).join(separator) )
    }
    }
  }
  return arr;
}

const TagsHome = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  return (
      <SimpleReactLightbox>
<BasePage pageContext={pageContext} pageTitle={tag} location={location} >
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">#{tag}</h2>
                    <SRLWrapper key="srlwrapper">
                    <div key="tagWrapper" className="row gx-5 wjmtagwrapper">
                        {
                            data.allMarkdownRemark.nodes.map(node => (
                                <NoteCard note={node}/>
                            ))
                        }

                        {data.mysqlTags && data.mysqlTags.taggedImages.map( node => (
                            <ImageCard key={node.name} image={node}/>
                        ))}
                    </div>
                    </SRLWrapper>
                </div>
            </section>
        </BasePage>
      </SimpleReactLightbox>
  )
}

export const query = graphql`
query combinedTagQuery($tag: String) {
  allMarkdownRemark(
    filter: {frontmatter: {tags: {in: [$tag]}, public: {eq: "yes"}}}
    sort: {frontmatter: {title: ASC}}
  ) {
    nodes {
      excerpt
      fields {
        slug
        collection
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

  mysqlTags(obsidian_tag: {eq: $tag}) {
    tag_full
    name
    taggedImages {
      image_id
      image_path
      image_name
      image_caption
      image_title
      creationDate(formatString: "MMMM, DD YYYY")
      full_image_path
      album_path
      imageTags {
        name
        tag_full
      }
      imageAlbums {
        album_path
      }
    }
  }
}
`

export default TagsHome
