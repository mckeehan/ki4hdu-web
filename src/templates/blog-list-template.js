import * as React from "react"
import { Link, graphql } from 'gatsby'
import BasePage from '../components/basepage'
import BlogCard from '../components/blogcard'

const BlogHome = ({ pageContext, data, location }) => {
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const nextPage = "/blog/p/" + (currentPage + 1).toString()
  return (
<BasePage pageContext={pageContext} pageTitle="Blog" location={location} >
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">Blog Entries{!isFirst && ( <span>page {currentPage}</span>)}</h2>
                    {isFirst && (
                    <div className="py-3" key="some random thoughts">
                        Some of my random thoughts...
                    </div>
                    )}
                    <div className="row gx-5" key="cardcontainer">
                        {
                            data.allMarkdownRemark.nodes.map(node => (
                                <BlogCard blog={node} key={node.fields.slug}/>
                            ))
                        }
                    </div>
                    <div className="text-end mb-5 mb-xl-0" key="pagination">
                        {!isLast && (
                          <Link className="text-decoration-none" to={nextPage}>
                            Older entries
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
query blogListQuery($skip: Int!, $limit: Int!) {
  allMarkdownRemark(
    filter: {fields: {collection: {eq: "blog"}}, frontmatter: {public: {eq: "yes"}}}
    sort: {frontmatter: {date: DESC}}
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

export default BlogHome
