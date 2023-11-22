import * as React from 'react'
import { graphql, Link } from 'gatsby'
import BasePage from '../components/basepage'
import Zoom from 'react-medium-image-zoom'
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import _ from 'lodash'
import TagCard from '../components/tagcard'

const PhotoPage = ({ pageContext, data, location}) => {
  const image = data.mysqlImages
  const pageTitle = image.image_title !== undefined ? image.image_title : image.image_name
  const position = [image.latitudeNumber, image.longitudeNumber]
  const albumSlug = "/photos" + image.album_path.split('/').map( e => _.kebabCase(e) ).join('/');
  const albumTitle = image.album_path.replace(/^.*\/(.*)/, "$1").replace(/^....-..-.. /, "")
  return (
<BasePage pageContext={pageContext} pageTitle={pageTitle} location={location} description={image.caption} >
    <section className="py-5">
        <div className="container px-3">
            <h2 className="fw-bolder fs-5 mb-4">{pageTitle}</h2>
            <div className="position-relative mb-5 mx-0 text-center">
                <Zoom><img className="img-flex" src={image.full_image_path}  alt={image.image_title} /></Zoom>
            </div>
            {image.image_caption && <div className="position-relative mb-5">{image.image_caption}</div>}
            <div className="row">
              <div className="col-lg-6">
              { image.latitudeNumber && <MapContainer zoom='16' center={position}>
                  <TileLayer
                    url="https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=yoMjNkrKO1TYRL38x7Qu"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                  />
                  <Marker position={position}>
                  </Marker>
                </MapContainer>}
              </div>
		          <div id='image-metadata' className="col-lg-6">
                  Album: <Link to={albumSlug}>{albumTitle}</Link><br/>
			            Creation Date: <span itemProp='dateCreated'>{image.creationDate}</span><br/>
			            Modification Date: <span itemProp='dateModified'>{image.modificationDate}</span><br/>
			            Camera: {image.make} / {image.model} <br/>
			            Lens: {image.lens} <br/>
			            Aperture: f/{image.aperture} <br/>
			            Focal Length: {image.focalLength} mm<br/>
			            Exposure Time: {image.exposureTime} <br/>
			            ISO: {image.sensitivity} <br/>
			            MeteringMode: {image.meteringMode} <br/>
                  {image.tags && image.tags.length > 0 && <div className="ms-3">{ image.tags.map(node => ( <TagCard tag={node.name}/> )) }</div>}
		          </div>
          </div>
        </div>
    </section>
</BasePage>
  )
}

export const query = graphql`
query singlephotoquery($imageId: Int) {
  mysqlImages(image_id: {eq: $imageId}) {
    image_id
      image_name
      image_title
      image_caption
      latitudeNumber
      longitudeNumber
      creationDate(formatString: "MMMM D, YYYY")
      modificationDate(formatString: "MMMM D, YYYY")
      make
      model
      lens
      aperture
      focalLength
      exposureTime
      sensitivity
      meteringMode
      full_image_path
      album_path
      tags {
        name
        tag_full
      }
  }
}`

export default PhotoPage
