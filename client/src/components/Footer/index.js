import React, { useState } from 'react'

export default function Footer({bobData, bob2}) {
  const [bobs, setBobs] = useState(bobData)
  return (
    <footer classname="footer">
      <div class="footerElements">
        <img className="bob-single-wave"alt="Bob" src={bob2} width="50px"></img>
        <p>Copyright of Mary Margaret Lawton, Erik Plachta, and Christiana Sullivan Morales</p> 
      </div>
    </footer>

  )
}