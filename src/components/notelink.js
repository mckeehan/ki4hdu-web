import * as React from 'react'
import { Link } from 'gatsby'

const NoteLink = ({ note }) => {
  return (
          <Link className="col-lg-4 col-sm-6 border rounded-3 text-decoration-none link-dark" to={note.fields.slug}>
            <div className="row no-gutters">
                {note.frontmatter.featuredImage &&
                  <div className="col-sm-5 py-3">
                    <img className="card-img-top" src={note.frontmatter.featuredImage} alt=""/>
                  </div>
                }
                <div className="col-sm-7">
                    <div className="card-body">
                        <div className="h5 card-title mb-3">{note.frontmatter.title}</div>
                    </div>
                </div>
            </div>
        </Link>
  )
}

export default NoteLink
