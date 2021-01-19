import PropTypes from 'prop-types'
import React from 'react'
import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
import { buttonize } from './Shared'

class Main extends React.Component {
  render() {
    let close = (
      <div
        className="close"
        {...buttonize(this.props.onCloseArticle)}
      ></div>
    )

    return (
      <div
        ref={this.props.setWrapperRef}
        id="main"
        style={this.props.timeout ? { display: 'flex' } : { display: 'none' }}
      >
        <article
          id="intro"
          className={`${this.props.article === 'intro' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Intro</h2>
          <span className="image main">
            <img src={pic01} alt="" />
          </span>
          <p>
        Introducing the new Party Punch band!  Some familiar faces and some brand new but still partying for a living and still bringing the area's BEST dance party everywhere we go!<br/>
<br/>
B-Harv and Jim Membership still rocking the mics.<br/>
Magic Mike still slapping the bass.<br/>
B-Shutts rocking guitar, keys, samples, and everything else.<br/>
And introducing Adam Bostick kicking the beat on drums.<br/>
<br/>
Grab a cup and fill it up with PARTY PUNCH.. but most of all SPREAD THE WORD - we can't wait to see you all real soon
          </p>
          <p>
        By the way, check out our <a href="#events">tour schedule</a>.
          </p>
          {close}
        </article>

        <article
          id="events"
          className={`${this.props.article === 'events' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Events</h2>
          <span className="image main">
            <img src={pic02} alt="" />
          </span>
          <p>
        .... Coming soon ....
          </p>
          {close}
        </article>

        <article
          id="about"
          className={`${this.props.article === 'about' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">About</h2>
          <span className="image main">
            <img src={pic03} alt="" />
          </span>
          <p>
            PARTY PUNCH is:<br/>
            B-Harv - Lead vocals<br/>
            Jim Membership - Vocals, keys, guitar, samples<br/>
            Magic Mike - Bass<br/>
            B-Shutts - Vocals, keys, guitar, samples<br/>
            A-Boss - Drums<br/>
          </p>
          {close}
        </article>

        <article
          id="contact"
          className={`${this.props.article === 'contact' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Contact</h2>
          <p>Please find us on <a href="https://www.facebook.com/partypunchband">The Facebook</a></p>
          <ul className="icons">
            <li>
              <a href="https://www.facebook.com/partypunchband" className="icon fa-facebook">
                <span className="label">Facebook</span>
              </a>
            </li>
          </ul>
          {close}
        </article>
      </div>
    )
  }
}

Main.propTypes = {
  route: PropTypes.object,
  article: PropTypes.string,
  articleTimeout: PropTypes.bool,
  onCloseArticle: PropTypes.func,
  onNewArticle: PropTypes.func,
  timeout: PropTypes.bool,
  setWrapperRef: PropTypes.func.isRequired,
}

export default Main
