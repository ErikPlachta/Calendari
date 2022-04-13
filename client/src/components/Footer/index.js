import React from 'react'

export default function Footer(props) {
  const { bob_static } = props;

  return (
    <footer classname="footer">
      <div class="footerElements">
        <img alt="Bob" src={bob_static} width="50px"></img>
        <p>Copyright of Mary Margaret Lawton, Erik Plachta, and Christiana Sullivan Morales</p> 
      </div>
        
    </footer>

  )
}