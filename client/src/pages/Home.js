import React from 'react';
import Auth from '../utils/auth';


//-- check to see if logged in
const loggedIn = Auth.loggedIn();

export default function Home() {
  return (
    <div>Home</div>
  )
}
