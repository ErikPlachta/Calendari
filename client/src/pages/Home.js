/* Main homepage */
import React from 'react'

export default function Home() {
  const {capitalizeFirstLetter} = require('../utils/helpers');

  return (
    <section>
      
      {/* WAVE CONTAINER */}
      <div className="wavecontainer">
      
        {/* SLOGAN */}
          <div className="slogan">
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
            <h3 id="sloganForHero" className="inner-header flex">Your Schedule: Untangled</h3>
          </div>
      </div>
      
{/* ABOUT SECTION */}
      <div id="about" className="homeInformation">
        <h3>About</h3>
        <p>
          <b>
            Calendari is an Online Scheduling App for Small Businesses.
          </b>
          <br />
          Our customers create an account, generate a unique URL, and share it 
          with their clients. Clients can then book appointments online based on
          availability and types of appointments.
        </p>
      </div>
      
      <div id="milestones" className="homeInformation">
        <h3>Milestones</h3>
        <p>
          As a Concept application, we've outline some future goals the project could take on.
        </p>
        <ul>
          <li>Account Features based on Account Type / Subscription</li>
          <li>Custom Theming</li>
          <li>Dynamic Business Configuration Options</li>
        </ul>
      </div>
     </section>
  )
}
