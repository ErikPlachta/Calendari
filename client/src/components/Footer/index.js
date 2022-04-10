import React from 'react'
import bob1 from '../../assets/svg/bob_1.0_tr_nbg_ds.svg'

export default function Footer(props) {
  const { bob1 } = props;

  return (
    <footer classname="footer">
      <div class="footer">
        <img alt="Bob" src={bob1} width="50px"></img>
        <p>Copyright of Mary Margaret Lawton, Erik Platcha, and Christiana Sullivan Morales</p> 
      </div>
    </footer>

  )
}