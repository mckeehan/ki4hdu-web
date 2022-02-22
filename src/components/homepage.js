import * as React from 'react'
import Seo from '../components/seo.js';
import SiteNavigation from './siteNavigation.js'
import Footer from './footer.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./basepage.css"

const HomePage = ({ pageContext, pageTitle, location, children }) => {
  return (
    <div className="d-flex flex-column h-100">
        <Seo
          title="William McKeehan"
          image="https://ki4hdu.com/_resources/wm-2012.jpg"
          description="This is my personal website. In it I have placed information about my interest and hobbies that others may find interesting."
        />
        <main className="flex-shrink-0">
            <SiteNavigation/>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default HomePage

