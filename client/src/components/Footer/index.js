import React from 'react'

export default function Footer(props) {
  const { bob1 } = props;

  return (
    <footer classname="footer">
      <div class="footerElements">
        <img alt="Bob" src={bob1} width="50px"></img>
      </div>
      <div class="footerElements">
        <p>Copyright of Mary Margaret Lawton, Erik Platcha, and Christiana Sullivan Morales</p> 
      </div>
    </footer>

  )
}