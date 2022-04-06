import React from 'react'
const { capitalizeFirstLetter } = require('../utils/helpers');

export default function BusinessSchedule(schedule) {

    //----------------------------------------------------------------------------
    //-- logic

    //TODO:: 04/05/22 #EP || Build this out
    const approveTimes = dateTimes => {
        dateTimes.preventDefault();
    };

  return (
    <section className="containerResults dayOfWeek">
        {/* Setup Days of Week, section. */}
        <h3>It looks like your schedule needs to be setup!</h3>
        
        <div className='dayOfWeek'>
            <p>Please confirm the days and times you are available for appointments.</p>
            <form className='dayOfWeek'>
                {Object.keys(schedule).map( (dayOfWeek, index) => (
                <div>
                    
                    <h4>{capitalizeFirstLetter(dayOfWeek)}</h4>
                    {/* Go through each day of week, present days with times and if verified */}
                    {Object.keys(schedule[dayOfWeek]).map((value, index) => ( 
                        <span>
                        {(() => {
                            switch (value) {
                                case 'start'    :   return  <input type='time' id={(`${dayOfWeek}_start`)} defaultValue={schedule[dayOfWeek][value]}></input>;
                                case 'end'      :   return  <input type='time' id={(`${dayOfWeek}_end`)} defaultValue={schedule[dayOfWeek][value]}></input>;
                                case 'verified' :   return  <input type="checkbox" id={(`${dayOfWeek}_verified`)} />;
                                // checked={checked ? 'checked' : ''}
                                default         :   return "NULL";
                            }
                            })()}
                        {/* { (`${schedule[dayOfWeek][time]} -`)  || schedule[dayOfWeek][time] } */}
                        </span>
                    ))}
                </div>
                ))}
                {/* submit button for times */}
                <input type='button' value="Approve Times" onClick={approveTimes}></input>
            </form>
        </div>
    </section>
  )
}
