import React from "react"
import PropTypes from "prop-types"
import { useLocation } from "@reach/router"
import { useStaticQuery, graphql } from "gatsby"

const Head = ({ title, description, image, article }) => {
  const { pathname } = useLocation()
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata

  const img = image && image.startsWith("/") ? siteUrl + image : image;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${img || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      {img && <meta name="robots" content="max-image-preview:large"/>}
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {seo.url && <meta property="og:url" content={seo.url} />}

      {(article ? true : null) && <meta property="og:type" content="article" />}

      {seo.title && <meta property="og:title" content={seo.title} />}

      {seo.description && ( <meta property="og:description" content={seo.description} />)}

      {seo.image && <meta property="og:image" content={seo.image} />}

      <meta name="twitter:card" content="summary_large_image" />

      {twitterUsername && ( <meta name="twitter:creator" content={twitterUsername} />)}

      {seo.title && <meta name="twitter:title" content={seo.title} />}

      {seo.description && ( <meta name="twitter:description" content={seo.description} />)}

      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </>
  )
}

export default Head

Head.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  article: PropTypes.bool,
}

Head.defaultProps = {
  title: "KI4HDU",
  description: null,
  image: null,
  article: false,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        siteUrl: url
        defaultImage: image
        twitterUsername
      }
    }
  }
`
