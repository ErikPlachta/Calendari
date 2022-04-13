import React from 'react'
import bob_static from '../assets/svg/bob_static.svg';

export default function PageNotFound() {
  return (
    <main>
          <div className="pageNotFound">
            <img className="brandLogo" alt="Bob" src={bob_static}></img>
            <h2>404 - Page Not Found</h2>
          </div>
    </main> 
  )
}