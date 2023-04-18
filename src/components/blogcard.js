import * as React from 'react'
import { Link } from 'gatsby'

const BlogCard = ({ blog }) => {
  return (
                        <div className="col-lg-4 mb-5">
                            <div className="blogcardcomponent card h-100 shadow border-0">
                                {blog.frontmatter.featuredImage && <img loading="lazy" className="card-img-top" src={blog.frontmatter.featuredImage} alt="" />}
                                <div className="card-body p-4">
                                    {/*<div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div>*/}
                                    <Link className="text-decoration-none link-dark stretched-link" to={`/blog${blog.fields.slug}`}><div className="h5 card-title mb-3">{blog.frontmatter.title}</div></Link>
                                    <p className="card-text mb-0">{blog.excerpt}</p>
                                </div>
                                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div className="d-flex align-items-end justify-content-between">
                                        { blog.frontmatter.author && (
                                          <div className="d-flex align-items-center">
                                              <img loading="lazy" className="rounded-circle me-3" width="40" height="40" src={blog.frontmatter.author.avatar} alt={blog.frontmatter.author.name}/>
                                              <div className="small">
                                                  <div className="fw-bold">{blog.frontmatter.author.name}</div>
                                                  {blog.frontmatter.date && <div className="text-muted">{blog.frontmatter.date}</div>}
                                              </div>
                                          </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
  )
}

export default BlogCard
