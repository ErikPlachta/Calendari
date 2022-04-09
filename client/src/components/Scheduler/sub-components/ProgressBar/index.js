import React from 'react'

export default function ProgressBar({step, state}) {
  return (
    <section className="progressBar containerResults">
      <span className="containerResults">Step# {step}</span>
      <span className="containerResults">
        State: {state
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