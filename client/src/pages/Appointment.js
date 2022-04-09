import React from 'react'



//------------------------------------------------------------------------------
//-- EXPORT FUNCTION

/* 
    Used to view an existing appointment


    props:  (business_id, appointment_id)
      business_id:       Takes business_id to validate the appointment ID
      appointment_id:   Take appointment ID, to validate with business_id

    LOGIC
    
      // if arguements not provided
      if(!business_id || !appointment_id){
        re-direct to page stating does not exist
      }

      // if business_id or business_name do not exist
      if(!business_id || !business_name) {
        re-direct to to business does not exist page
      }

      
      // if the busines_id or business_name contains the appointment ID, return page to manage
      if( ( business[business_id].appointments ) contains appointment_id || business[business_name].appointments ) contains appointment_id ){
          - return page with appointment to either verify, cancel, or re-schedule
      }
      
      else if() - route to business_id
    
*/

export default function Appointment(business_id, appointment_id) {
  return (
    <div>Appointment</div>
  )
}
