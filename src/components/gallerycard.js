import * as React from 'react'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'
import rehypeTruncate from "rehype-truncate";

const GalleryCard = ({ album }) => {
  const pageTitle = album.album_path.replace(/^.*\/(.*)/, "$1").replace(/^....-..-.. /, "")
  return (
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                <img className="card-img-top" src={album.album_image_path.replace(/ /g, '%20')} alt={pageTitle} />
                                <div className="card-body p-4">
                                    <div className="badge bg-primary bg-gradient rounded-pill mb-2">gallery</div>
                                    <Link className="text-decoration-none link-dark stretched-link" to={"/photos" + album.album_path.replace(/ /g,'-').replace(/-+/g,'-').toLowerCase()}><div className="h5 card-title mb-3">{pageTitle}</div></Link>
                                    {album.album_caption && <ReactMarkdown rehypePlugins={[rehypeTruncate]} className="card-text mb-0">{album.album_caption}</ReactMarkdown>}
                                </div>
                                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div className="d-flex align-items-end justify-content-between">
                                        <div className="d-flex align-items-center">
                                            {/*<img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />*/}
                                            <div className="small">
                                                {/*<div className="fw-bold">Kelly Rowan</div>*/}
                                                <div className="text-muted">{album.album_date}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

  )
}

export default GalleryCard
