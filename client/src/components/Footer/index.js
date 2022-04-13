import React from 'react'

export default function Footer({ bob_static }) {

  return (
    <footer className="footer">
      <div className="footerElements">
        <img className="brandLogo" alt="Bob" src={bob_static}></img>
        <p>Copyright of Mary Margaret Lawton, Erik Plachta, and Christiana Sullivan Morales</p> 
      </div>
    </footer>

  )
}