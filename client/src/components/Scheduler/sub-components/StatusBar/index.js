import React from 'react'
import backArrow from '../../../../assets/svg/backward-front-gradient.svg';

export default function StatusBar({step, state, formerStep}) {
  return (
    <section className="statusBar">
      <span className="" id='progressBar'>
        {step > 1 
          ? [
            <span className="progressBarBackArrow">
          <img src={backArrow} alt='back-arrow' onClick={formerStep}/>
        </span>
          ]

          : ""
        }
        
        <label className="progressBarLabel" htmlFor="progressBarStep">
          Step {step}/5
        </label>
        <progress className="progressBarStep" value={step} max="5">{step}/5</progress>
      </span>
      {/* <span className="">
        <b>Local Storage Session:</b> {state
          ? "False"
          : "True"
        }
        
      </span> */}
    </section>
  )
};


/*

// <div className="containerResults">
              //   <h3>checkState Placeholder: FALSE: No Local Storage</h3>
              // </div>,
              // <BusinessScheduler></BusinessScheduler>
            ]
          : <h3>checkState Placeholder: TRUE: Has giLocal Storage</h3>

*/