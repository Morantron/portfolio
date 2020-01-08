import React from "react"
import { Helmet } from "react-helmet"

export const HomeLayout = ({ children }) => (
  <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>morantron.com | Jorge Morante</title>
      <link rel="canonical" href="https://morantron.com" />
    </Helmet>
    { children }
  </>
)
