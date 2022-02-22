import * as React from 'react'
import { Link } from 'gatsby'

const TagCard = ({ tag }) => {
  const tagUrl = "/tags/" + tag
  return (
     <div><Link to={tagUrl}>#{tag}</Link></div>
  )
}

export default TagCard
