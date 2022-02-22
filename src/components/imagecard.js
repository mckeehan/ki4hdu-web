import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import 'react-medium-image-zoom/dist/styles.css'

const ImageCard = ({ image }) => {
  return (
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                <img className="card-img-top" src={image.full_image_path} alt={image.image_title} />
                                <div className="card-body p-4">
                                    {image.image_title && <div className="h5 card-title mb-3">{image.image_title}</div>}
                                    <div className="card-text mb-0"><ReactMarkdown>{image.image_caption}</ReactMarkdown></div>
                                </div>
                            </div>
                        </div>

  )
}

export default ImageCard
