import React from 'react'
import {capitalizeFirstLetter} from '../../utils/helpers';
import Signup from "../Signup";

export default function Login(props) {
  const {} = props;

  return (
      <section> 
          <h2 alt="please login">Please login to continue</h2>
          <div>
            <label htmlFor="email">Email:</label>
            {/* need to add validation/handling below */}
            <input type="text" name="email" defaultValue={email}/>
          </div>
          <div>
              <label htmlFor="password">Password:</label>
              {/* need to add validation/handling below */}
              <input type="password" name="password" defaultValue={password}/>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
          <div>
            {/* need to figure out how to make this button click redirect too the signup page */}
            <p>Don't have an account? <a>Sign up</a> to continue</p>
          </div>
      </section>
  )
}
