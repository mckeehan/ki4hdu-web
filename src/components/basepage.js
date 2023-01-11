import * as React from 'react'
import { Breadcrumb } from 'gatsby-plugin-breadcrumb'
import Seo from '../components/seo.js';
import SiteNavigation from './siteNavigation.js'
import Footer from './footer.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import "./basepage.css"

const BasePage = ({ pageContext, pageTitle, location, image, description, children }) => {
  const { breadcrumb: { crumbs } } = pageContext

  return (
    <div className="d-flex flex-column h-100">
        <Seo
          title={pageTitle}
          image={image}
          description={description}
        />
        <main className="flex-shrink-0">
            <header class="no-print">
              <SiteNavigation/>
              <Breadcrumb crumbs={crumbs} crumbSeparator=" / " />
            </header>
            {children}
        </main>
        <Footer/>
    </div>
  )
}

export default BasePage

