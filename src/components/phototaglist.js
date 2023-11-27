import * as React from 'react'
import _ from 'lodash'
import { Link } from 'gatsby'
import { FaTag } from 'react-icons/fa'

const PhotoTagList = ({ tags, keyPrefix}) => {
    return (
        <div className="ms-3">
            {tags.map( tag => {
                const slug = "/phototags" + tag.tag_full.split('/').map( e => _.kebabCase(e) ).join('/');
                const key = keyPrefix + tag.name;
                return (
                    <span key={key} className="col-md-6"><Link to={slug}><FaTag/>&nbsp;{tag.name}</Link></span>
                )
            })}
        </div>
    )
}

export default PhotoTagList
