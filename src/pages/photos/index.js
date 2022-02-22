import * as React from "react"
import { graphql } from 'gatsby'
import BasePage from '../../components/basepage'
import GalleryCard from '../../components/gallerycard'

const PhotosHome = ({ pageContext, data, location}) => {
  return (
<BasePage pageContext={pageContext} pageTitle="Photo Galleries" location={location}>
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">Photo Galleries</h2>
                    <div className="row gx-5">
                        {
                            data.allMysqlAlbums.nodes.map(node => (
                                <GalleryCard album={node}/>
                            ))
                        }
                    </div>
                </div>
            </section>
</BasePage>
  )
}

export const query = graphql`query MyQuery {
  allMysqlAlbums(
    sort: {fields: album_date, order: DESC}
    filter: {album_path: {regex: "/^\/(?!.*\/)/"}}
  ) {
    nodes {
      album_path
      album_caption
      album_image_path
      album_date(formatString: "MMMM D, YYYY")
    }
  }
}
`

export default PhotosHome
