/* Main homepage */
import React from 'react'

export default function Home() {
  const {capitalizeFirstLetter} = require('../utils/helpers');

  return (
    <section>
      <div id="calendariSlogan" class="slogan">
        <h1>Your Schedule: Untangled</h1>
      </div>
      <div id="whatIsThis">
        <h3>What is Calendari?</h3>
        <p>
          Calendari is a scheduling app for your business. It gives business owners the
          ability to streamline the appointment booking process by letting the users
          schedule their own appointments based on the business's availability. This
          app can be used by any business in any industy, and future development includes
          plans to customize the look of the website!
        </p>
      </div>
      <div id="whyIsThisDifferent">
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
      <div id="futureDev">
      <h3>What Does the Future Hold for Calendari?</h3>
        <p>
          We are always looking to improve our customers experience on the app. A few of our enhancements we are currently working outlined below:
        </p>
        <ul>
          <li>Premium Version - This option allows the business the option to choose a theme for their website, schedule appointments 6+ months in advance, users can schedule appointments months in advance, and 24/7 tech support. Please see table below for more information.</li>
          <li>Theme selection - The business can customize the interface to fit their specific business. Whether it's a tattoo parlor, a scuba training facility, or a kids bounce house, we have you covered!</li>
        </ul>
      </div>
      <div id="freeVsPremium">
      <h3>What's the Difference Between Free and Premium?</h3>
        <div classname="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Free</th>
                <th>Premium</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Theme Selection</td>
                <td> ❌ </td>
                <td> ✔️ </td>
              </tr>
              <tr>
                <td>6+ Month Scheduling</td>
                <td> ❌ </td>
                <td> ✔️ </td>
              </tr>
              <tr>
                <td>24/7 tech Support</td>

                <td> ❌ </td>
                <td> ✔️ </td>
              </tr>
              <tr>
                <td>Toggle Week Start Day</td>
                <td> ❌ </td>
                <td> ✔️ </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
