import React from 'react'

export default function StatusBar({step, state}) {
  return (
    <section className="StatusBar containerResults">
      <span className="" id='progressBar'>
        <label for="progressBarStep">Progress: </label>
        <progress id="progressBarStep" value={step} max="5">{step}/5</progress>
      </span>
      <span className="">
        <b>Step</b> {step}
      </span>
      <span className="">
        <b>Local Storage Session:</b> {state
          ? "False"
          : "True"
        }
        
      </span>
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