import React, { useState, useEffect } from 'react';
// import BusinessSchedule from './BusinessSchedule';

const { 
  capitalizeFirstLetter,
  dateGetMonths,
  dateFormat,
  dateTimeFull,
  dateDayOfWeek,
  dateHourOfDay,
  dateGetTimePassed,
  dateTimeFullLocal
} = require('../../../../utils/helpers');

//------------------------------------------------------------------------------
//-- EXPORT FUNCTION - BusinessScheduler
export default function AppointmentType({
  business, business_id, nextStep, appointmentTypesData
}) {
  
  //-- states to hold the appointment results ready to write
  const [appointmentTypes, setAppointmentTypes] = useState({});

  const validateParams = async () => {  //-- Determine which params are sent in and update state accordingly
        
    //-- Grab ALL appointment data, update state, prepare to build on page

    if(appointmentTypesData){
      setAppointmentTypes(appointmentTypesData)
      console.log(appointmentTypes)
    }
  }

    //-- Runs to set variables
    useEffect( () => {
      validateParams()
    },[]);
  

  //TODO:: 04/05/22 #EP || Add extract from JWT - business from database based on JWT id
  // const appointment_types = business.configuration.appointment_types;

  //----------------------------------------------------------------------------
  //-- RETURN JSX ELEMENT
  return (
    <section className="page business">
      <main className="container business">
        <section className="scheduledAppointments">
          <header className="business">  
            <h2>{business.name ? business.name : "business.name" }</h2>
            {/* <p>{business.welcome ? business.welcome : "business.welcome"}</p> */}
            <p>Scheduler</p>
          </header>

          {/* container holding appointment types  */}
          <section className="signupCard">

          {Object.keys(appointmentTypes).map((appointment, index) => (
            // <h4>{capitalizeFirstLetter(appointment)}</h4>
            <section className="businessContainerResults scheduledAppointment" key={appointmentTypes[appointment]["_id"]}>
              <div>
                <h4>
                  <p>
                    {appointmentTypes[appointment].appt_type_name} 
                  </p>
                </h4>
                   <br/>
                  <span>
                  
                  {appointmentTypes[appointment].summary} 
                  </span>
                  <span>
                    <button 
                      className="appointment_type_button" 
                      id={appointmentTypes[appointment]['_id']}
                      onClick={nextStep}
                    >
                      Start Scheduling
                    </button>
                  </span>
              </div>
              
            </section>
          ))}

          </section>

          
          
          <div className='scheduledAppointments'>
          
          </div>
        </section>
      </main>
    </section>
    
  )
}


// <section className="page business">

// {/* Main content within Business Page */}
// <main className="container business">
  
//   {/* Main Header Section on Business Page */}
//   <header className="business">  
//     <h2>{business.name}</h2>
//       <p>{business.welcome}</p>
//     </header>


//   {/* container holding appointment types  */}
//   <section className="signupCard">
//     {Object.keys(appointment_types).map( (appointment_type, index) => (        
//       // <form>
//       <div className="containerResults appointment_type_card" key={appointment_types[appointment_type]['_id']}>
//           <h3>
//             {capitalizeFirstLetter(appointment_types[appointment_type]['name'])}
//           </h3>
//           <span className="appointment_type_card_summary">
//             {appointment_types[appointment_type]['summary']}
//           </span>
//           <span className="appointment_type_card_description">
//             {appointment_types[appointment_type]['description']}
//           </span>
//           <span className="appointment_type_card_details">
//             <h4 className="appointment_type_card_details">
//               {appointment_types[appointment_type]['Details']['subject']}     
//             </h4>
//             <ul>
//               <li>Date:       {appointment_types[appointment_type]['Details']['date']}        </li>
//               <li>Duration:   {appointment_types[appointment_type]['Details']['duration']}    </li>
//               <li>Start Time: {appointment_types[appointment_type]['Details']['time_start']}  </li>
//               <li>Timezone:   {appointment_types[appointment_type]['Details']['timezone']}    </li>
//             </ul>
//           </span>
          
//           <span>
//             <button 
//               className="appointment_type_button" 
//               id={appointment_types[appointment_type]['_id']}
//               onClick={nextStep}
//             >
//               Start Application
//             </button>
//           </span>
//         </div>
//       // </form>
//     ))}
          
//   </section>
// </main>
// </section>