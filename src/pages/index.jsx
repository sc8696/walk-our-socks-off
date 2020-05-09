import "./../styles/index.scss"

import Footer from "../regions/footer"
import GuideDogs from "../regions/guide-dogs"
import Hero from "../regions/hero"
import How from "../regions/how"
import Progress from "../regions/progress"
import { ProgressProvider } from "../contexts/progress.provider"
import React from "react"
import Route from "../regions/route"
import SEO from "../components/seo"
import { ScrollProvider } from "../contexts/scroll.provider"
import Support from "../regions/support"

const IndexPage = () => {
  return (
    <ProgressProvider>
      <ScrollProvider>
        <Hero />
        {/* <Route /> */}
        <Progress />
        <How />
        <GuideDogs />
        <Support />
        <Footer />
        <SEO title="Home" />
      </ScrollProvider>
    </ProgressProvider>
  )
}

export default IndexPage
