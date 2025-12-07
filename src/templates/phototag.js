import React from "react"
import { graphql } from "gatsby"
import BasePage from '../components/basepage'
import ImageCard from '../components/imagecard'
import { GpxCard } from '../components/gpxComponents'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
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

const TagsPage = ({ pageContext, data, location }) => {
  const { tag_full, pageTitle } = pageContext
  return (
      <SimpleReactLightbox>
        <BasePage pageContext={pageContext} pageTitle={pageTitle} location={location} >
            <section className="py-5">
                <div className="container px-5">
                    <h1 className="fw-bolder fs-5 mb-4">{pageTitle}</h1>
                      <div className="container px-5 row">
                        {data.allMysqlTags && data.allMysqlTags.distinct.explode('/').unique().filter( n => n.startsWith(tag_full) && n.split('/').length === (tag_full.split('/').length + 1) ).map(child => {
                            const slug = child.split('/').map( e => _.kebabCase(e) ).join('/');
                            const pageTitle = child.split('/').slice(-1)[0].replace(/_/g, ' ')
                            return (
                                <div className="tagCard card col-lg-4 col-md-6" key={`/phototags${slug}`}>
                                  <GpxCard type="tag" link={`/phototags${slug}`} name={pageTitle}/>
                                </div>
                            )
                        })}
                      </div>
                    <SRLWrapper>
                        <div className="row gx-5">
                        {data.mysqlTags && data.mysqlTags.taggedImages.map( node => (
                            <ImageCard image={node}/>
                        ))}
                        </div>
                    </SRLWrapper>
                </div>
            </section>
        </BasePage>
      </SimpleReactLightbox>
  )
}

export default TagsPage

export const photoTopicQuery = graphql`
query photoTagQuery($tag_full: String) {
  allMysqlTags(sort: {tag_full: ASC}) {
    distinct(field: {tag_full: SELECT})
  }
  mysqlTags(tag_full: {eq: $tag_full}) {
    tag_full
    name
    taggedImages {
      image_id
      image_path
      image_name
      image_caption
      image_title
      creationDate(formatString: "MMMM, DD YYYY")
      full_image_path
      album_path
      imageTags {
        name
        tag_full
      }
      imageAlbums {
        album_path
      }
    }
  }
}
`
