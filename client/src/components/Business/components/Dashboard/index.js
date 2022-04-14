//------------------------------------------------------------------------------
//-- MODULES
import React, { useEffect, useState } from 'react';
import { capitalizeFirstLetter } from '../../../../utils/helpers';



export default function Dashboard({appointmentDetails, businessName, userName}) {
  
  const [appointments, setAppointments] = useState({
    appointments: {},
    stats: {
      "scheduled"   : null,
      "canceled"    : null,
      "completed"   : null,
      "total"       : null
    }
  })

  console.log()

  const validateParams = async (appointmentData) => {  //-- Determine which params are sent in and update state accordingly
    // console.log(appointmentData)

    if(appointmentData){
      const totalAppointments = Object.keys(appointmentDetails).length;
      const canceledAppointments ="TODO"
      const completedAppointments ="TODO"

      setAppointments({...appointments, 
                        "appointments": appointmentDetails,
                        stats: {
                                "scheduled" : totalAppointments,
                                //TODO:: 05/10/22 #EP || Get this info from appts from query first then update these.
                                "canceled"  : canceledAppointments,
                                "completed" : completedAppointments
                        }
        // "scheduled" : Object.keys(appointmentDetails).length,
        // "canceled"  : 0,
        // "completed" : 0
      });
    }
  }

  useEffect( () => {
    validateParams(appointmentDetails)
  },[]);


  return (
    <section className="businessContainerResults">
      {/* Dashboard is high-level summary  */}
      <div id="businessDashboard">
        <h3>{capitalizeFirstLetter(businessName)}'s Business Homepage</h3>
        <p>Welcome to your business page. Use the navigation on the left to can
          manage your business, your settings, and your appointments.
        </p>

        {/* <h4>Appointments</h4>
        <ul>
          <li>Scheduled: {appointments.stats.scheduled} </li>
          <li>Completed: {appointments.stats.completed} </li>
          <li>Canceled:  {appointments.stats.canceled}  </li>
        </ul> */}
      </div>
    </section>
  )
}
