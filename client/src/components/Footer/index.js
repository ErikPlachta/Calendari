import React, { useState } from 'react'

export default function Footer({bobData, bob2}) {
  const [bobs, setBobs] = useState(bobData)
  return (
    <footer className="footer">
      <div className="footerElements">
        <img className="brandLogo"alt="Bob" src={bob2} width="50px"></img>
        <p>Copyright of Mary Margaret Lawton, Erik Plachta, and Christiana Sullivan Morales</p> 
      </div>
    </footer>
  )
}
