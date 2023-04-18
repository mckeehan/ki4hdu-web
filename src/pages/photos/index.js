import * as React from "react"
import { graphql } from 'gatsby'
import BasePage from '../../components/basepage'
import GalleryCard from '../../components/gallerycard'
import { GpxCard } from '../../components/gpxComponents'
import _ from 'lodash'

// eslint-disable-next-line no-extend-native
Array.prototype.contains = function(v) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] === v) return true;
  }
  return false;
};

// eslint-disable-next-line no-extend-native
Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.contains(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};

// eslint-disable-next-line no-extend-native
Array.prototype.explode = function(separator) {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if(this[i]) {
    var subarr = this[i].split(separator);
    for (var j = 0; j <= subarr.length; j++) {
      arr.push( subarr.slice(0,j).join(separator) )
    }
    }
  }
  return arr;
}

const PhotosHome = ({ pageContext, data, location}) => {
  return (
<BasePage pageContext={pageContext} pageTitle="Photo Galleries" location={location}>
            <section className="py-5">
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4">Photos By Tag </h2>
                    <div className="container px-5 row">
                        {data.allMysqlTags && data.allMysqlTags.distinct.explode('/').unique().filter( n => n.split('/').length === 2 ).map(child => {
                            const slug = child.split('/').map( e => _.kebabCase(e) ).join('/');
                            const pageTitle = child.split('/').slice(-1)[0].replace(/_/g, ' ')
                            return (
                                <div className="phototagcard card col-lg-4 col-md-6">
                                  <GpxCard type="tag" link={`/phototags${slug}`} name={pageTitle}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                    
                <div className="container px-5">
                    <h2 className="fw-bolder fs-5 mb-4 mt-4">Photo Galleries</h2>
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

export const query = graphql`
query MyQuery {
  allMysqlTags(sort: {tag_full: ASC}) {
    distinct(field: {tag_full: SELECT})
  }
  allMysqlAlbums(
    sort: {album_date: DESC}
    filter: {album_path: {regex: "/^/(?!.*/)/"}}
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
