import React, { useRef, useEffect } from "react"

import { renderPizzaScene } from '../lib/PizzaScene'
import { HomeLayout } from '../layouts/home'
import GithubIcon from '../icons/Github'
import TwitterIcon from '../icons/Twitter'
import EmailIcon from '../icons/Email'

const ICON_SIZE = 32

const iconMap = {
  github: GithubIcon,
  twitter: TwitterIcon,
  email: EmailIcon
}

let Link = ({ icon, url }) => {
  let Icon = iconMap[icon]

  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <Icon width={ICON_SIZE} height={ICON_SIZE} />
    </a>
  )
}

export default () => {
  let threeContainer = useRef(null)

  useEffect(
    () => {
      renderPizzaScene(threeContainer.current)
    },
    []
  )

  return (
    <HomeLayout>
      <div ref={threeContainer} className="three-container" />
      <div className="main">
        <h1>
          Hi!<code> \o/</code><br />
          I'm Jorge Morante
        </h1>
        <p>Full stack developer based in Barcelona.</p>

        <div className="contact-links">
          <ul>
            <li><Link url="https://github.com/morantron" icon="github" /></li>
            <li><Link url="https://twitter.com/morantron" icon="twitter"/></li>
            <li><Link url="mailto:me@morantron.com" icon="email" /></li>
          </ul>
        </div>
      </div>
    </HomeLayout>
  )
}
