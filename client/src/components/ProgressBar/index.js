//-- MODULES
import React from 'react'



//-- ASSETS
import backArrow from '../../assets/svg/backward-front-gradient.svg';

export default function ProgressBar({step, state, maxSteps, formerStep}) {
  //-- Used by SignUp and Scheduler as a bott-bar for awareness of location in steps
  return (
    <section className="progressBar">
      <span id='progressBar'>
        {step > 1 
          ? [
            <span key="progress-bar-key-arrow-span" className="progressBarBackArrow">
          <img key="progress-bar-key-arrow-img" src={backArrow} alt='back-arrow' onClick={formerStep}/>
        </span>
          ]

          : ""
        }
        
        <label className="progressBarLabel" htmlFor="progressBarStep">
          Step {step}/{maxSteps}
        </label>
        <progress className="progressBarStep" value={step} max={maxSteps}>{step}/{maxSteps}</progress>
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