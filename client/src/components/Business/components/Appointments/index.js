//------------------------------------------------------------------------------
//-- MODULES
import React, { useEffect, useState } from 'react';
import PageNotFound from '../../../../pages/PageNotFound';

import { useMutation } from '@apollo/client';
import { ADD_APPT } from '../../../../utils/mutations';

//------------------------------------------------------------------------------
//-- HELPERS
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
/* EXPORT FUNCTION - User
  //TODO:: 04/10/22 #EP || Update this
*/export default function Appointments({appointmentsData, appointmentTypesData}) {
    // console.log(appointmentData)

    const [appointments, setAppointments] = useState({});
    const [appointmentTypes, setAppointmentTypes] = useState({});

    // add appt test object
    const apptTest = {
      businessId: "625608e9d634e02c54faece3",
      userId: "625608f3d634e02c54faece5",
      apptTypeId: "6256090ed634e02c54faece8",
      appointmentDate: "date",
      appointmentTime: "time"
    }

    // add appointment mutation
    const [addAppt] = useMutation(ADD_APPT);

    const addApptSubmit = async () => {
      try {
        await addAppt({
          variables: {
            businessId: apptTest.businessId,
            userId: apptTest.userId,
            apptTypeId: apptTest.apptTypeId,
            appointmentStatus: "Scheduled",
            appointmentDate: apptTest.appointmentDate,
            appointmentTime: apptTest.appointmentTime
          }
        })
        console.log("success!")
      } catch (e){
        console.error(e);
      }
    };

    
    const validateParams = async () => {  //-- Determine which params are sent in and update state accordingly
        
        //-- Grab ALL appointment data, update state, prepare to build on page
        if(appointmentsData){ 
          setAppointments( appointmentsData )
          console.log(appointments)
        };

        if(appointmentTypesData){
          setAppointmentTypes(appointmentTypesData)
        }
      }
    
    //-- Runs to set variables
    useEffect( () => {
      validateParams()
    },[]);
  
  return (   
    <section className="scheduledAppointments">
        <header className="business" onClick={addApptSubmit}>
          <h3>Here are your scheduled appointments</h3>
        </header>
          
          
          <div className='scheduledAppointments'>
          {Object.keys(appointments).map((appointment, index) => (
            // <h4>{capitalizeFirstLetter(appointment)}</h4>
            <section className="businessContainerResults scheduledAppointment" key={appointments[appointment]["_id"]}>
              <div>
                <h4>
                  <p>
                  {appointmentTypes[0].appt_type_name} 
                  <br/>
                    { appointments[appointment]['client_full_name']
                      ? (appointments[appointment]['client_full_name'], appointments[appointment]['appointment_status'])
                      : capitalizeFirstLetter(appointments[appointment]['appointment_status'])
                    } 
                    {} on {dateFormat(appointments[appointment]['appointment_date'])}
                    {} at {appointments[appointment]['appointment_time']} 
                    {} {appointments[appointment]['timezone'] ? appointments[appointment]['timezone'] : "EST"}
                  </p>
                </h4>
                <p>
                  {appointmentTypes[0].summary}
                </p>

                <div>
                  <h5>Appointment Details</h5>
                  <ul>
                    <li>Type: {appointments[appointment]['__typename']}</li>
                    <li>Date: {appointments[appointment]['appointment_date']}</li>
                    <li>Status: {appointments[appointment]['appointment_status']}</li>
                    <li>Time: {appointments[appointment]['appointment_time']}</li>
                    <li>ID: {appointments[appointment]['_id']}</li>
                  </ul>
                </div>

                <div>
                  <h5>Client Details</h5>
                  <ul>
                    
                    {/* Client full name */}
                      {appointments[appointment]['client_full_name']
                        ? <li>Name: client_full_name</li>
                        : ""
                      }
                    {/* client email */}
                      {appointments[appointment]['client_email'] 
                        ? <li>appointments[appointment]['client_email']</li>
                        : ""
                      }
                    {/* client phone */}
                      {appointments[appointment]['client_phone'] 
                        ? <li>appointments[appointment]['client_phone']</li>
                        : ""
                      }
                    {/* Appointment  Notes */}
                    {appointments[appointment]['appt_notes'] 
                        ? <li> appointments[appointment]['appt_notes'] </li>
                        : ""
                      }
                  </ul>
                </div>
              </div>
              
            </section>
          ))}

       
            
          </div>

    </section>
  )
}


// {Object.keys(appointments).map((appointment, index) => (
//   // <h4>{capitalizeFirstLetter(appointment)}</h4>
//   <section className="businessContainerResults scheduledAppointment" key={appointments[appointment]["_id"]}>
//     <div>
//       <h4>
//       {appointments[appointment]["User"]["name_first"]} {appointments[appointment]["User"]["name_last"]} has
//       a {appointments[appointment]["status"]}
//       - a {appointments[appointment]['Appointment_Type']["name"]} Appointment
//         with {appointments[appointment]['Details']['client']['name']} on
//         - {dateTimeFull((appointments[appointment]['Details']['date_time']))}
//       </h4>

//         {/* on {dateFormat((appointments[appointment]['Details']['date_time']))}
//         at {dateHourOfDay(appointments[appointment]['Details']['date_time'])}
//         for {appointments[appointment]['Details']['durations']} */}
      
//       {/* dateGetMonths,
//       dateDayOfWeek,
//       dateHourOfDay, */}
//       <div>
//         <h5>Appointment Details</h5>
//         <ul>
//           <li>Type: {appointments[appointment]['Details']["type"]}</li>
//           <li>Subject: {appointments[appointment]['Details']["subject"]}</li>
//           <li>Summary: {appointments[appointment]['Details']["summary"]}</li>
//           <li>Date & Time for Host: {dateTimeFullLocal(appointments[appointment]['Details']["date_time"])}</li>
//           <li>Duration: {appointments[appointment]['Details']["duration"]}</li>
//           <li>Appointment ID: {appointments[appointment]["_id"]}</li>
//         </ul>
//       </div>

//       <div>
//         <h5>Client Details</h5>
//         <ul>
//         <li>Name: {appointments[appointment]['Details']['client']['name']}   </li>
//         <li>Email: {appointments[appointment]['Details']['client']['email']}  </li>
//         <li>Phone: {appointments[appointment]['Details']['client']['phone']}  </li>
//         <li>Date & Time for Client: {dateTimeFull(appointments[appointment]['Details']['date_time'])}  </li>
//         <li>Timezone: {appointments[appointment]['Details']['timezone']}  </li>
//         </ul>
//       </div>
//     </div>
//     <div>
//     </div>
//   </section>
// ))}
