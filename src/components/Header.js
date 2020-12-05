import PropTypes from 'prop-types'
import React from 'react'
import Bandname from './Bandname'

const Header = props => (
  <header id="header" style={props.timeout ? { display: 'none' } : {}}>
    <div className="logo">
      <span className="icon fa-diamond"></span>
    </div>
    <div className="content">
      <div className="inner">
        <h1><Bandname /></h1>
        <div className="blurb">
          <div>The area&apos;s best party band!</div>
          <div>Come party with we who party for a living!</div>
        </div>
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
