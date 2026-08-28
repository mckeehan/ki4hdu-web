import React from "react"
import { Link, graphql } from "gatsby"
import BasePage from '../components/basepage'

const TagsPage = ({ pageContext, data, location }) => {
  const topLevelTags = Object.values(
    data.allMarkdownRemark.nodes.reduce((acc, node) => {
      const tags = node.frontmatter.tags || []
      // Set avoids double-counting a note tagged with multiple
      // sub-paths under the same top-level tag
      const topLevels = new Set(tags.map(tag => tag.split("/")[0]))

      topLevels.forEach(topLevel => {
        if (!acc[topLevel]) {
          acc[topLevel] = { fieldValue: topLevel, totalCount: 0 }
        }
        acc[topLevel].totalCount += 1
      })

      return acc
    }, {})
  ).sort((a, b) => a.fieldValue.localeCompare(b.fieldValue))

  return (
    <BasePage pageContext={pageContext} pageTitle="Notes by Tag" location={location} >
      <section className="py-5">
        <div className="container px-5">
          <h1 className="fw-bolder fs-5 mb-4">Notes by Tag</h1>
          <div className="gx-5 three-col">
            {topLevelTags.map(tag => (
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
}

export default TagsPage

export const pageQuery = graphql`
query pageUsersmckeehansrcki4HduWebsrcpagestagsJs4172131656 {
  allMarkdownRemark {
    nodes {
      frontmatter {
        tags
      }
    }
  }
}
`