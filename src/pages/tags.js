import React from "react"
import { Link, graphql } from "gatsby"
import BasePage from '../components/basepage'

const TagsPage = ({ pageContext, data, location }) => (
<BasePage pageContext={pageContext} pageTitle="Notes by Tag" location={location} >
    <section className="py-5">
        <div className="container px-5">
            <h1 className="fw-bolder fs-5 mb-4">Notes by Tag</h1>
            <div className="gx-5 three-col">
                {data.allMarkdownRemark.group.map(tag => (
                  <li key={tag.fieldValue}>
                    <Link to={`/tags/${tag.fieldValue}/`}>
                      {tag.fieldValue} ({tag.totalCount})
                    </Link>
                  </li>
                ))}
            </div>
        </div>
    </section>
</BasePage>
)

export default TagsPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
