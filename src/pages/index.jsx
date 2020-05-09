import "./../styles/index.scss"

import Footer from "../regions/footer"
import GuideDogs from "../regions/guide-dogs"
import Hero from "../regions/hero"
import Progress from "../regions/progress"
import React from "react"
import Route from "../regions/route"
import SEO from "../components/seo"
import { ScrollProvider } from "../contexts/scroll.provider"
import Support from "../regions/support"

const IndexPage = () => {
  return (
    <ScrollProvider>
      <Hero />
      <Route />
      <Progress />
      <GuideDogs />
      <Support />
      <Footer />
      <SEO title="Home" />
    </ScrollProvider>
  )
}

export default IndexPage
