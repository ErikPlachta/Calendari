import React from 'react'

export default function StatusBar({step, state}) {
  return (
    <section className="statusBar">
      <span className="" id='progressBar'>
        <label htmlFor="progressBarStep"><b>Step{step}/5</b> </label>
        <progress id="progressBarStep" value={step} max="5">{step}/5</progress>
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