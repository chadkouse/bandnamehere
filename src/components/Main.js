import PropTypes from 'prop-types'
import React from 'react'
import pic01 from '../images/pic01.jpg'
import pic02 from '../images/pic02.jpg'
import pic03 from '../images/pic03.jpg'
import bandPic from '../images/party_punch_band_photo.png'
import { buttonize } from './Shared'
import { Calendar } from 'grommet-icons'

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
And introducing the inimitable Roy Donk kicking the beat on drums.<br/>
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
        What makes a party go from good to GREAT?  A big bowl of PARTY PUNCH!
          </p>
          <p>If you're having a wedding, a special birthday party, a class reunion, or any other party or event -- PARTY PUNCH can help you take it from good to GREAT.  <a href="#contact">Contact Us</a> and we'll help you figure it all out.</p>
          <h3 style={{ width:'100%', textAlign:'center' }}><a href="/tour-dates/"><Calendar color='#AA0000' /> CLICK HERE FOR OUR EVENTS CALENDAR! <Calendar color='#AA0000' /></a></h3>
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
            Roy Donk - Drums<br/>
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
            <li>
              <a href="https://m.me/partypunchband" className="icon fa-comments-o">
                <span className="label">Facebook Messenger</span>
              </a>
            </li>
          </ul>
          {close}
        </article>
        <article
          id="promo"
          className={`${this.props.article === 'promo' ? 'active' : ''} ${
            this.props.articleTimeout ? 'timeout' : ''
          }`}
          style={{ display: 'none' }}
        >
          <h2 className="major">Promo / Tech</h2>
          <p>Party Punch Band Picture</p>
          <img src={bandPic} alt="Party Punch Band" style={{width: "80%"}} />
          <p><a href={bandPic} download>Hi-Res Version</a></p>
          <p>STAGE PLOT</p>
          <a href="/images/party_punch_stage_plot.jpg" target="_blank"><img src="/images/party_punch_stage_plot.jpg" style={{width: "80%"}} /></a>
          <p><a href="/images/party_punch_stage_plot.pdf" download>PDF Version</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a href="/images/party_punch_stage_plot.jpg" download>JPG Version</a></p>
          <p>Logos</p>
          <p>Color with color background<br/><img src="/images/party_punch_color_logo_thumb.png" /><br/>
            <a href="/images/party_punch_color_logo.png" download>PNG Version</a>
          </p>
          <p>Color with transparent background<br/><img src="/images/party_punch_logo_color_thumb.png" /><br/>
            <a href="/images/party_punch_logo_color.png" download>PNG Version</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/images/party_punch_logo_color.svg" download>SVG Version</a>
          </p>
          <p>One-Color with transparent background<br/><img src="/images/party_punch_logo_one_color_thumb.png" /><br/>
            <a href="/images/party_punch_logo_one_color.png" download>PNG Version</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="/images/party_punch_logo_one_color.svg" download>SVG Version</a>
          </p>
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
