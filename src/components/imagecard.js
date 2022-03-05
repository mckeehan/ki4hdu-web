import * as React from 'react'
import { Link } from "gatsby"
import ReactMarkdown from 'react-markdown'
import 'react-medium-image-zoom/dist/styles.css'
import _ from 'lodash'

const ImageCard = ({ image }) => {
  return (
                        <div className="col-lg-4 mb-5">
                            <div className="card h-100 shadow border-0">
                                <img className="card-img-top" src={image.full_image_path} alt={image.image_title} />
                                <div className="card-body p-4">
                                    {image.image_title && <div className="h5 card-title mb-3">{image.image_title}</div>}
                                    {image.image_caption && <div className="card-text mb-0"><ReactMarkdown>{image.image_caption}</ReactMarkdown></div>}
                                    {image.imageAlbums && image.imageAlbums.map( album => {
                                      const slug = "/photos" + album.album_path.split('/').map( e => _.kebabCase(e) ).join('/');
                                      const pageTitle = album.album_path.replace(/^.*\/(.*)/, "$1").replace(/^....-..-.. /, "")
                                      return (
                                        <div className="small">
                                            in <Link to={slug}>{pageTitle}</Link>
                                        </div>
                                      )
                                    })}
                                    {image.tags && image.tags.length > 0 && <div className="small">
                                        {image.tags.map( tag => {
                                          const slug = "/phototags" + tag.tag_full.split('/').map( e => _.kebabCase(e) ).join('/');
                                          return (
                                            <li><Link to={slug}>{tag.name}</Link></li>
                                          )
                                        })}
                                    </div>}
                                    <div className="small">
                                        <div className="text-muted">{image.creationDate}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

  )
}

export default ImageCard
