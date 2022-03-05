import * as React from "react"
import { Link, graphql } from 'gatsby'
import BasePage from '../components/basepage'
import NoteCard from '../components/notecard'

const NotesHome = ({ pageContext, data, location }) => {
  const { currentPage, numPages } = pageContext
  const isLast = currentPage === numPages
  const nextPage = "/notes/p/" + (currentPage + 1).toString()
  return (
<BasePage pageContext={pageContext} pageTitle="Notes" location={location} >
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">Notes page {currentPage}</h2>
                    <div className="row gx-5">
                        {
                            data.allMarkdownRemark.nodes.map(node => (
                                <NoteCard note={node}/>
                            ))
                        }
                    </div>
                    <div className="text-end mb-5 mb-xl-0">
                        {!isLast && (
                          <Link className="text-decoration-none" to={nextPage}>
                            Older stories
                            <i className="bi bi-arrow-right"></i>
                          </Link>
                        )}
                    </div>
                </div>
            </section>
        </BasePage>
  )
}

export const query = graphql`
  query notesListQuery($skip: Int!, $limit: Int!){
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "notes" } } }
      sort: {fields: frontmatter___title}
      limit: $limit
      skip: $skip
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

export default NotesHome
