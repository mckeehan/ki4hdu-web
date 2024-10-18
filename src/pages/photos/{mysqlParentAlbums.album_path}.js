import * as React from 'react'
import BasePage from '../../components/basepage'
import GalleryCard from '../../components/gallerycard'
import ImageCard from '../../components/imagecard'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import { graphql } from 'gatsby'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"



const PhotoAlbum = ({ pageContext, data, location }) => {
  const pageTitle = data.mysqlParentAlbums.album_path.replaceAll(/'/g,"-").replace(/^.*\/(.*)/, "$1").replace(/^....-..-.. /, "")
  return (
      <SimpleReactLightbox>
<BasePage pageContext={pageContext} pageTitle={pageTitle} location={location} image={data.mysqlParentAlbums.album_image_path.replace(/ /g, "%20")} description={data.mysqlParentAlbums.album_caption}>
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">{pageTitle}</h2>
                    {data.mysqlParentAlbums.album_caption && <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.mysqlParentAlbums.album_caption}</ReactMarkdown>}
                    <div className="row gx-5">
                        {
                            data.mysqlParentAlbums.albums.map(node => (
                                <GalleryCard album={node}/>
                            ))
                        }
                    </div>
                    <SRLWrapper>
                        <div className="row gx-5">
                        {
                            data.mysqlParentAlbums.images.map(node => (
                                <ImageCard image={node}/>
                            ))
                        }
                        </div>
                    </SRLWrapper>
                </div>
            </section>
</BasePage>
    </SimpleReactLightbox>
  )
}

export const query = graphql`
  query ($id: String) {
    mysqlParentAlbums(id: {eq: $id}) {
        album_path
        album_caption
        album_date(formatString: "MMMM D, YYYY")
        album_image_path
        albums {
          album_path
          album_caption
          album_date(formatString: "MMMM D, YYYY")
          album_image_path
        }
        images {
          image_id
          image_path
          image_name
          image_caption
          image_title
          creationDate(formatString: "MMMM D, YYYY")
          full_image_path
          album_path
          tags {
            name
            tag_full
          }
        }
    }
}
`

export default PhotoAlbum
