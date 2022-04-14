import React, { useState } from 'react'

import Date from './components/Date';
import Time from './components/Time';
import {} from '../../utils/helpers'

export default function DateTimePicker() {

    const [step, setStep] = useState(1)
    //-- Verifying if requests are made properly or not
  const [state, setState] = useState( true );

    const dateTimePickerLocation = {
        1:   <Date></Date>,
        2:   <Time></Time>
    }
    return (
        <section className='dateTimePicker'>
            {/* contains the step location, back arrow, and has awareness of if local storage or not */}
                {(() => {
                switch(state) {    
                    case true:  return (
                    <section>
                        {/* {dateTimePickerLocation[1]}
                        {dateTimePickerLocation[2]} */}
                        <label for="datetime">Enter a date and time for your appointment:</label>
                        <input 
                                id="datetime"
                                type='datetime-local'
                                min={get}
                        
                        ></input>
                    </section>
                    );
                    // case false: return validateParams ? <PageNotFound /> : <Navigate replace to="/" />;
                    //TODO:: 04/10/22 #EP || Add component for loading
                    default:    return "Loading...";
                }
            })()}
        </section>
    );
}
