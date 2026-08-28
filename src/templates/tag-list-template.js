import * as React from "react"
import { graphql, Link } from 'gatsby'
import BasePage from '../components/basepage'
import NoteCard from '../components/notecard'
import ImageCard from '../components/imagecard'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

const TagsHome = ({ pageContext, data, location }) => {
  const { tag, childTags } = pageContext
  return (
      <SimpleReactLightbox>
<BasePage pageContext={pageContext} pageTitle={tag} location={location} >
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">#{tag}</h2>

                    {childTags && childTags.length > 0 && (
                        <div key="childTags" className="mb-4">
                            {childTags.map(child => (
                                <Link
                                    key={child.path}
                                    to={`/tags/${child.path}/`}
                                    className="btn btn-outline-secondary btn-sm me-2 mb-2"
                                >
                                    {child.label}
                                </Link>
                            ))}
                        </div>
                    )}

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