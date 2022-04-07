import React from 'react';
import {Link} from 'react-router'
import {capitalizeFirstLetter} from '../../utils/helpers';
import Login from "../Login";

export default function Signup(props) {
  const {} = props;

  return (
    <section> 
      <h2 alt="please sign up">Please sign up to continue</h2>
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
        <button type="submit">Sign Up</button>
      </div>
      <div>
        <li><Link to={"/Login"} state={{from: Signup}}>Already have an account? Please Log in to continue</Link></li>
      </div>
    </section>
  )
}
