import * as React from 'react'
import { Link } from 'gatsby'
import { FaTag } from 'react-icons/fa'

const TagCard = ({ tag, keyPrefix }) => {
  const tagUrl = "/tags/" + tag
  const key = keyPrefix + tag.name
  return (
     <div key={key}>
      <Link to={tagUrl}>
        <FaTag/>&nbsp;
        {tag}
      </Link>
     </div>
  )
}

export default TagCard
