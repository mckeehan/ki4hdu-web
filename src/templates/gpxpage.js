import React from "react"
import { Link, graphql } from 'gatsby'
import BasePage from '../components/basepage'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import TagCard from '../components/tagcard'
import { TrackCard, WaypointCard, GpxCard } from '../components/gpxComponents'
import LeafletMap from '../components/leafletMap'

function arrayContains(arr, v) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === v) return true;
  }
  return false;
};

function arrayUnique(arr) {
  var arrN = [];
  for (var i = 0; i < arr.length; i++) {
    if (!arrayContains(arrN,arr[i])) {
      arrN.push(arr[i]);
    }
  }
  return arrN;
};

function arrayExplode(arr) {
  var arrN = [];
  for (var i = 0; i < arr.length; i++) {
    var subarr = arr[i].split('/');
    for (var j = 0; j <= subarr.length; j++) {
      arrN.push( subarr.slice(0,j).join('/') )
    }
  }
  return arrN;
};

function getChildren(arr,parent) {
  var arrN = [];
  var parentSize = parent.split('/').length;
  for (var i = 0; i < arr.length; i++) {
    if( arr[i].startsWith(parent)
      && arr[i].split('/').length === (parentSize + 1)) {
      arrN.push(arr[i]);
    }
  }
  return arrN
};

const MapPage = ({ pageContext, data, location }) => {
  const { slug } = pageContext
  const children = getChildren(arrayUnique(arrayExplode(data.allDirectories.distinct)), slug === '/' ? '' : slug)
  const pageTitle = data.markdownRemark ? data.markdownRemark.frontmatter.title : data.gpXfile ? data.gpXfile.name.replace(/_/g,' ') : slug.split('/').slice(-1)[0].replace(/_/g, ' ')
  return (
<BasePage pageContext={pageContext} pageTitle={pageTitle} location={location} image={data.markdownRemark && data.markdownRemark.frontmatter.featuredImage} description={data.markdownRemark && data.markdownRemark.excerpt}>
    {data.gpXfile && <section className="">
        <div className="container px-5">
            <div className="row gx-5 pt-2">
              {typeof window !== "undefined" && (<LeafletMap data={data.gpXfile} />)}
            </div>
        </div>
    </section>}
    <section>
         <div className="container px-5">
             <div className="row gx-5">
                 <div className="col-lg-3 bg-light">
                     {data.markdownRemark && 
                     <div className="d-flex align-top mt-lg-5 mb-4 ">
                         <img className="rounded-circle" width="40" height="40" src={data.markdownRemark.frontmatter.author.avatar} alt={data.markdownRemark.frontmatter.author.name}/>
                         <div className="ms-3">
                             <div className="fw-bold">{data.markdownRemark.frontmatter.author.name}</div>
                             <div className="text-muted">{data.markdownRemark.frontmatter.date}</div>
                             {data.markdownRemark.tableOfContents && <div className="ms-3"><div className="toc" dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }}/><hr/></div>}
                             {data.markdownRemark.frontmatter.tags && data.markdownRemark.frontmatter.tags.length > 0 && <div className="ms-3">{ data.markdownRemark.frontmatter.tags.map(node => ( <TagCard tag={node}/> )) }<hr/></div> }
                         </div>
                     </div>
                     }
                     {data.gpXfile &&
                     <Link to={`/gpx/${data.gpXfile.relativePath}`}>Download</Link>
                     }
                 </div>
                 <div className="col-lg-9">
                     {!data.markdownRemark && <h1>{pageTitle}</h1>}
                     <article className="clearfix">
                         {data.markdownRemark && data.markdownRemark.frontmatter.featuredImage &&
                         <section className="w-50 float-md-end">
                             <figure className="figure">
                                     <img className="img-fluid" src={data.markdownRemark.frontmatter.featuredImage} alt="" />
                                 {data.markdownRemark.frontmatter.featuredImageCaption && <figcaption className="figure-caption" >{data.markdownRemark.frontmatter.featuredImageCaption}</figcaption>}
                             </figure>
                         </section>
                         }
                         {data.markdownRemark && <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}/>}
                         {data.gpXfile && data.gpXfile.properties && data.gpXfile.properties.desc && <ReactMarkdown rehypePlugins={[rehypeRaw]}>{data.gpXfile.properties.desc}</ReactMarkdown>}
                     </article>
                    <section className="py-5">
                      <div className="container px-5 row">
                      {data.gpXfile && data.gpXfile.waypoints.sort( (a, b) => { 
                          var nameA = a.properties.name.toUpperCase();
                          var nameB = b.properties.name.toUpperCase();
                          if (nameA < nameB) { return -1; }
                          if (nameA > nameB) { return 1; }
                          return 0;
                        }).map(waypoint => (
                          <div className="waypointcard card col-lg-4 col-md-6">
                              <WaypointCard waypoint={waypoint}/>
                          </div>
                      ))}
                      {data.gpXfile &&  data.gpXfile.tracks.sort( (a, b) => {
                          var nameA = a.properties.name.toUpperCase();
                          var nameB = b.properties.name.toUpperCase();
                          if (nameA < nameB) { return -1; }
                          if (nameA > nameB) { return 1; }
                          return 0;
                        }).map(track => (
                          <div className="trackcard card col-lg-4 col-md-6">
                              <TrackCard track={track}/>
                          </div>
                        ))}
                        {children.length > 0 && children.map( gpxdir => (
                          <div className="gpxchild card col-lg-4 col-md-6">
                              <GpxCard type="folder" link={`/maps${gpxdir}`} name={gpxdir.split('/').slice(-1)[0]}/>
                          </div>
                        ))}
                        {data.allGpXfile.edges && data.allGpXfile.edges.map(gpxNode => (
                          <div className="gpxedge card col-lg-4 col-md-6">
                            <GpxCard type="file" name={gpxNode.node.name} link={`/maps${gpxNode.node.slug}`} />
                          </div>
                         ))}
                      </div>
                    </section>
               </div>
           </div>
       </div>
   </section>
</BasePage>
)}

export const query = graphql`
query gpXQuery($slug: String) {
  markdownRemark(fields: {slug: {eq: $slug}, collection: {eq: "gpxkml"}}) {
    fields {
      mydir
      slug
    }
    headings {
      value
      depth
    }
    frontmatter {
      title
      author {
        name
        avatar
      }
      date(formatString: "MMMM D, YYYY")
      featuredImage
      featuredImageCaption
      tags
    }
    excerpt
    html
    tableOfContents(maxDepth: 3)
  }
  gpXfile(slug: {eq: $slug}) {
    slug
    name
    mydir
    properties {
      desc
    }
    tracks {
      type
      geometry {
        type
        coordinates
      }
      properties {
        name
        _gpxType
        time(formatString: "MMMM D, YYYY h:mm A")
        desc
        stroke
      }
    }
    waypoints {
      type
      properties {
        name
        sym
        time(formatString: "MMMM D, YYYY h:mm A")
        desc
      }
      geometry {
        type
        coordinates
      }
    }
  }
  allDirectories: allGpXfile {
    distinct(field: {mydir: SELECT})
  }
  allGpXfile(
    filter: {mydir: {eq: $slug}}
    sort: [{properties: {time: DESC}}, {name: ASC}]
  ) {
    edges {
      node {
        slug
        name
      }
    }
  }
}
`

export default MapPage
