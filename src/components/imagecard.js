import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ImageCard = ({ image }) => {
  return (
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                <Zoom><img className="card-img-top" src={image.full_image_path} alt={image.title} /></Zoom>
                                <div className="card-body p-4">
                                    {/*<div className="badge bg-primary bg-gradient rounded-pill mb-2">News</div> */}
                                    {image.image_title && <div className="h5 card-title mb-3">{image.image_title}</div>}
                                    <div className="card-text mb-0"><ReactMarkdown>{image.image_caption}</ReactMarkdown></div>
                                </div>
                                {/*
                                <div className="card-footer p-4 pt-0 bg-transparent border-top-0">
                                    <div className="d-flex align-items-end justify-content-between">
                                        <div className="d-flex align-items-center">
                                            <img className="rounded-circle me-3" src="https://dummyimage.com/40x40/ced4da/6c757d" alt="..." />
                                            <div className="small">
                                                <div className="fw-bold">Kelly Rowan</div>
                                                <div className="text-muted">{image.creationDate}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                */}
                            </div>
                        </div>

  )
}

export default ImageCard
