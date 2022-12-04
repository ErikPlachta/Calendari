import React, { useState } from 'react'

export default function Footer({bobData, bob2}) {
  const [bobs, setBobs] = useState(bobData)
  return (
    <footer className="footer">
      <div className="footerElements">
        <img className="brandLogo"alt="Bob" src={bob2} width="50px"></img>
        <p>
          By Christiana Sullivan Morales,
          Erik Plachta, & Mary Margaret Lawton
          <br/>
          <b>&#169; 2022</b> 
          
        </p>
      </div>
    </footer>
  )
}
