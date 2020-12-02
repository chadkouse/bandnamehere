import PropTypes from 'prop-types'
import React from 'react'

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-diamond"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1>{ props.bandName }</h1>
        <p>
          <div>The area&apos;s best party band!</div>
          <div>Come party with we who party for a living!</div>
        </p>
      </div>
    </div>
    <nav>
      <ul>
        <li>
          <a href='#intro'>
            Intro
          </a>
        </li>
        <li>
          <a href='#events'>
            Events
          </a>
        </li>
        <li>
          <a href='#about'>
            About
          </a>
        </li>
        <li>
          <a href='#contact'>
            Contact
          </a>
        </li>
      </ul>
    </nav>
  </header>
)

Header.propTypes = {
  onOpenArticle: PropTypes.func,
  timeout: PropTypes.bool,
  bandName: PropTypes.string
}

export default Header
