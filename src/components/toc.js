import React, { useState } from "react"

export default function Toc({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="toc">
      <button
        type="button"
        className="toc-toggle"
        aria-expanded={open}
        aria-controls="toc-content"
        onClick={() => setOpen(o => !o)}
      >
        Table of Contents
      </button>

      <div id="toc-content" className={`toc-content${open ? " is-open" : ""}`}>
        {children}
      </div>
    </div>
  )
}
