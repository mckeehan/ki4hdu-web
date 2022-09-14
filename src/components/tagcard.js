import * as React from 'react'
import { Link } from 'gatsby'
import { FaTag } from 'react-icons/fa'

const TagCard = ({ tag }) => {
  const tagUrl = "/tags/" + tag
  return (
     <div>
      <Link to={tagUrl}>
        <FaTag/>&nbsp;
        {tag}
      </Link>
     </div>
  )
}

export default TagCard
