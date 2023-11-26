import * as React from 'react'
import _ from 'lodash'
import { Link } from "gatsby"
import ReactMarkdown from 'react-markdown'
import PhotoTagList from '../components/phototaglist'

const ImageCard = ({ image }) => {
  const albumslug = image.album_path ? image.album_path.replace(/[|&;$%@"<>()+,]/g, "").replaceAll(/ /g, '-').toLowerCase() : undefined
  const detailLink = albumslug ? "/photos" + albumslug + "/photo-" + image.image_id : undefined
  return (
                        <div className="col-lg-4 mb-5">
                            <div className="imagecardcomponent card h-100 shadow border-0">
                                <img loading="lazy" className="card-img-top" src={image.full_image_path} alt={image.image_title} />
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
                                    {image.tags && image.tags.length > 0 && <PhotoTagList tags={image.tags}/>}
                                    <div className="small">
                                        <div className="text-muted">{image.creationDate}</div>
                                        {detailLink && <div className="text-muted"><Link to={detailLink}>details</Link></div>}
                                    </div>
                                </div>
                            </div>
                        </div>

  )
}

export default ImageCard
