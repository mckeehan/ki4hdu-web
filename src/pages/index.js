import * as React from "react"
import { Link, graphql } from 'gatsby'
import HomePage from '../components/homepage'
import Headshot from '../../static/wm-2012-600x400.png'
import BlogCard from '../components/blogcard'
import { FaTwitter, } from 'react-icons/fa'
import Search from '../components/search'

const IndexPage = ({ pageContext, data, location }) => {
  const nextPage = "/blog/"
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
                                <p className="text-center">
                                   <div>
                                       <a id="follow-button" className="rounded-pill p-2 twitter-button text-white text-decoration-none" title="Follow @mckeehan on Twitter" href="https://twitter.com/intent/follow?original_referer=https%3A%2F%2Fwww.ki4hdu.com%2F&amp;ref_src=twsrc%5Etfw%7Ctwcamp%5Ebuttonembed%7Ctwterm%5Efollow%7Ctwgr%5Emckeehan&amp;region=follow_link&amp;screen_name=mckeehan">
                                         <span className="text-light"><FaTwitter/> Follow <b>@mckeehan</b></span>
                                       </a>
                                   </div>
                                </p>
                            </div>
                        </div>
                        <div className="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img className="img-fluid rounded-3 my-5" src={Headshot} alt="William McKeehaan Headshot" /></div>
                    </div>
                </div>
            </header>
            <div className="container my-1">
              <Search size="medium" showExcerpt={true} />
            </div>
            <section className="bg-light py-1">
                <div className="container px-5 my-5">
                    <div className="text-center mb-5">
                        <h2 className="fw-bolder">My Interests</h2>
                    </div>
                    <div className="row gx-5">
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img loading="lazy" className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/amateur-radio-cover.jpg" alt="amateur radio" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="/amateur-radio">Amateur Radio</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img loading="lazy" className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/off-road-cover.jpg" alt="off-road" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="/off-road">Off-Road</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img loading="lazy" className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/pics/thumbnails/Motorcycle/2013-10-20%20Over%20the%20Mountains%20to%20the%20Blue%20Ridge/DSC_3724-1024x768.JPG" alt="Smoky Mountain Fall" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="/photos">Photos</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img loading="lazy" className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/gaiascreenshot.png" alt="maps" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="/maps">Maps</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img loading="lazy" className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/todo.jpg" alt="todo" />
                                <Link className="h3 fw-bolder text-decoration-none link-dark stretched-link" to="productivity">Productivity</Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="position-relative mb-5 text-center">
                                <img loading="lazy" className="img-fluid rounded-3 mb-3" src="https://ki4hdu.com/_resources/clipart_tipsandtricks.jpg" alt="tips and tricks" />
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
                                <p className="lead fw-normal text-muted mb-5">Some random thougts.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row gx-5">
                        {
                            data.allMarkdownRemark.nodes.map((node,index) => (
                                <BlogCard blog={node} key={index}/>
                            ))
                        }
                    </div>
                    <div className="text-end mb-5 mb-xl-0">
                        <Link className="text-decoration-none" to={nextPage}>
                          Older entries
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </section>
            <section className="py-3">
              <h2>Other areas of interest</h2>
              <div className="row gx-5">
                <Link className="col-lg-4 col-sm-6 border rounded-3 text-decoration-none link-dark" to="/martial-arts">
                  <div className="row no-gutters">
                    <div className="col-sm-7">
                      <div className="card-body">
                        <div className="h5 card-title mb-3">Martial Arts</div>
                      </div>
                    </div>
                  </div>
                </Link>
                <Link className="col-lg-4 col-sm-6 border rounded-3 text-decoration-none link-dark" to="/computers">
                  <div className="row no-gutters">
                    <div className="col-sm-7">
                      <div className="card-body">
                        <div className="h5 card-title mb-3">Computer Stuff</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
        </HomePage>
  )
}

export const query = graphql`
query homePageBlogListQuery {
  allMarkdownRemark(
    filter: {fields: {collection: {eq: "blog"}}, frontmatter: {public: {eq:
"yes"}}}
    sort: {frontmatter: {date: DESC}}
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
