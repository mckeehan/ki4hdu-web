import * as React from "react"
import { graphql } from 'gatsby'
import BasePage from '../components/basepage'
import NoteCard from '../components/notecard'

const TagsHome = ({ pageContext, data, location }) => {
  const { tag } = pageContext
  return (
<BasePage pageContext={pageContext} pageTitle={tag} location={location} >
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">#{tag}</h2>
                    <div className="row gx-5">
                        {
                            data.allMarkdownRemark.nodes.map(node => (
                                <NoteCard note={node}/>
                            ))
                        }
                    </div>
                </div>
            </section>
        </BasePage>
  )
}

export const query = graphql`
  query tagListQuery($tag: String){
    allMarkdownRemark(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: {fields: frontmatter___title }
    ) {
      nodes {
        excerpt
        fields {
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
  }
`

export default TagsHome
