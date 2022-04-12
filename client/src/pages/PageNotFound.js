import React from 'react'
import bob_static from '../assets/svg/bob_static.svg';

export default function PageNotFound() {
  return (
    <main>
          <div class="signupInformation">
            <img alt="Bob" src={bob_static} width="80px"></img>
            <h2>404 - Page Not Found</h2>
          </div>
    </main> 
  )
}