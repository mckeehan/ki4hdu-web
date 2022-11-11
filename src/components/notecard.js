import * as React from 'react'
import { Link } from 'gatsby'
import avatar from "./wm-2012.jpg"

const NoteCard = ({ note }) => {
  const linkPath = note.fields.collection === "blog" ? "/blog" + note.fields.slug : note.fields.slug
  return (
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                {note.frontmatter.featuredImage && <img loading="lazy" className="card-img-top" src={note.frontmatter.featuredImage} alt="" />}
                                <div className="card-body p-4">
                                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">{note.fields.collection}</div>
                                    <Link className="text-decoration-none link-dark stretched-link" to={linkPath}><div className="h5 card-title mb-3">{note.frontmatter.title}</div></Link>
                                    <p className="card-text mb-0">{note.excerpt}</p>
                                </div>
                                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div className="d-flex align-items-end justify-content-between">
                                        { note.frontmatter.author && (
                                          <div className="d-flex align-items-center">
                                              <img loading="lazy" className="rounded-circle me-3" width="40" height="40" src={avatar} alt={note.frontmatter.author.name}/>
                                              <div className="small">
                                                  <div className="fw-bold">{note.frontmatter.author.name}</div>
                                                  {note.frontmatter.date && <div className="text-muted">{note.frontmatter.date}</div>}
                                              </div>
                                          </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
  )
}

export default NoteCard
