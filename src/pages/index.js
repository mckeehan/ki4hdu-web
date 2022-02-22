import * as React from "react"
import { Link, graphql } from 'gatsby'
import HomePage from '../components/homepage'
import Headshot from '../../static/wm-2012-600x400.png'
import BlogCard from '../components/blogcard'

const IndexPage = ({ pageContext, data, location }) => {
  return (
    <HomePage pageContext={pageContext} pageTitle="Home" location={location} >
            <header className="bg-dark">
                <div className="container px-5">
                    <div className="row gx-5 align-items-center justify-content-center">
                        <div className="col-lg-8 col-xl-7 col-xxl-6">
                            <div className="my-5 text-center text-xl-start">
                                <h1 className="display-5 fw-bolder text-white mb-2 text-center">William McKeehan</h1>
                                <p className="display-5 fw-bolder text-white mb-2 text-center">KI4HDU</p>
                                <p className="lead fw-normal text-white-50 mb-4">
                                    This is my personal website. In it I have placed information about my interest and hobbies that others may find interesting.
                                </p>
                                <p className="display-5 text-center">
                                    <a href="https://twitter.com/mckeehan?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-size="large" data-show-count="false">Follow @mckeehan</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src={Headshot} alt="William McKeehaan Headshot" /></div>
                    </div>
                </div>
            </header>
            <section className="bg-light py-1">
                <div className="container px-5 my-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder">My Interests</h2>
                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/amateur-radio-cover.jpg" alt="" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="/amateur-radio">Amateur Radio</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/off-road-cover.jpg" alt="" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="/off-road">Off-Road</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/todo.jpg" alt="" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="productivity">Productivity</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img className="img-fluid rounded-3 mb-3" src="https://dummyimage.com/600x400/343a40/6c757d" alt="" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="tips-and-tricks">Tips & Tricks</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container px-5 my-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-lg-8 col-xl-6">
                            <div className="text-center">
                                <h2 className="fw-bolder">From my blog</h2>
                                <p className="lead fw-normal text-muted mb-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque fugit ratione dicta mollitia. Officiis ad.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5">
                        {
                            data.allMarkdownRemark.nodes.map(node => (
                                <BlogCard blog={node}/>
                            ))
                        }
                    </div>
                </div>
            </section>
        </HomePage>
  )
}

export const query = graphql`
  query homePageBlogListQuery {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "blog" } } }
      sort: {fields: frontmatter___date, order: DESC}
      limit: 3
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

export default IndexPage
