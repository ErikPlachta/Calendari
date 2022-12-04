/* Main homepage */
import React from 'react'

export default function Home() {
  const {capitalizeFirstLetter} = require('../utils/helpers');

  return (
    <section>
      <div id="wavecontainer">
          <div className="slogan">
            <h3 id="sloganForHero" className="inner-header flex">Your Schedule: Untangled</h3>
            <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
              <defs>
                <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
              </defs>
                <g className="parallax">
                <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg>
          </div>
        
        <div className="content flex">
          <p>By Erik, Christiana and Mary Margaret</p>
        </div>
      </div>
      <div id="whatIsThis" className="homeInformation">
        <h3>About</h3>
        <p>
          Calendari is a concept online scheduling app for small businesses. 
        </p>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div id="about" className="homeInformation">
      <h3>Why is Calendari Different from Other Scheduling Apps?</h3>
        <p>
          Calendari differs from other scheduling apps because of it's easy, clean interface
          that is easy for both the business, a new customer, and a returning customer
          to understand and use. It allows the business to set their preferences for
          hours and number of appointments they want that day, and then allows users
          the flexibility to choose a date that suits their schedule. Calendari has future development plans that will further set it apart from
           the current scheduling apps on the market, check them out below!
        </p>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div id="futureDev" className="homeInformation">
      <h3>What Does the Future Hold for Calendari?</h3>
        <p>
          We are always looking to improve our customers experience on the app. A few of our enhancements we are currently working outlined below:
        </p>
        <ul>
          <li>Premium Version - This option allows the business the option to choose a theme for their website, schedule appointments 6+ months in advance, users can schedule appointments months in advance, and 24/7 tech support. Please see table below for more information.</li>
          <li>Theme selection - The business can customize the interface to fit their specific business. Whether it's a tattoo parlor, a scuba training facility, or a kids bounce house, we have you covered!</li>
          <li>Schedule Selection - Allows the busines owner the option to select their hours of operation per day instead of the same hours every day.</li>
        </ul>
      </div>
     </section>
  )
}
