import React, { useState, useEffect } from 'react';

//-- HARDCODED DATA USED TO SIMULATE DATA CALLS FROM DATABASE
//TODO:: 04/05/22 #EP|| Make GraphQL Connections here
const DB_User =              require('../assets/json/user.json');
const DB_Business =          require('../assets/json/business.json');
const DB_Appointment =       require('../assets/json/appointment.json');
const DB_Appointment_Type =  require('../assets/json/appointment_type.json');


//-- Business Page to load for users that are logged in, otherwise redirect.
export default function Business() {
  
  //-- Onboarding connections to take data to verify integrity
  //TODO:: 04/05/22 #EP|| Make GraphQL Connections here
  const [businesses, setBusinesses] = useState(DB_Business);
  const [users, setUsers] = useState(DB_User);
  const [appointments, setAppointments] = useState(DB_Appointment);
  const [appointment_Types, setAppointment_Types] = useState(DB_Appointment_Type);


  /*  1. VERIFY IF LOGGED IN    */
  
  //TODO:: 04/05/22 #EP || Add auth, for now assuming logged in
  const authCheck = true;
  
  
  /*  2. IF LOGGED IN GET AUTH TOKEN THAT CONTAINS BUSINESS ID AND USER ID  */
  
  if(!authCheck){ 
    console.log("Reload page placeholder");
  }


  //TODO:: 04/05/22 #EP || Add pull from JWT
  const business_id = '0000-AAAA';
  const user_id     = '0000-0000';


  /*  3. LOAD PROPER BUSINESS NAME ACCORDINGLY    */

  //TODO:: 04/05/22 #EP || Testing basic integrity. Need to build out what these should actually do.
  
  //-- extract business from database based on JWT id
  const business = businesses[business_id];
  //-- extract schedule from extracted business
  const schedule = business.configuration.schedule;
  //-- extract all users from business //TODO:: 04/05/2022 #EP || Make this the logged in
  const user     = users[user_id];
  
  //TODO:: 04/05/22 #EP || Onboard Appointments
  const appointment = appointments;
  //TODO:: 04/05/22 #EP || Onboard Appointment_Types
  const appointment_Type = appointment_Types;


  //-- RETURN FUNCTION
  return (
    <section>
      
      {/* Side Navigational Bar */}
      <aside>
        <section>
          <h3>

          </h3>
        </section>
      </aside>

      {/* Main content within Business Page */}
      <main>
        
        {/* Main Header Section on Business Page */}
        <header>
          <h2>{business.name}</h2>
          <p>Welcome, {user.name_first}. </p>
        </header>
        

        {/* Setup Section */}
        <section>
          <h3>It looks like your account needs to be setup!</h3>
          <div>
            <p>Please confirm the times and days you are available.</p>
            {Object.keys(schedule).map( (dayOfWeek, index) => (
              <div>
                
                <div class='configure_DayOfWeek'>
                <h4>{dayOfWeek}</h4>
                  {/* Go through each day of week, present days with times and if verified */}
                  {Object.keys(schedule[dayOfWeek]).map((value, index) => ( 
                    <span>
                      {(() => {
                        switch (value) {
                            case 'start'    :   return  <input type='time' id={(`${dayOfWeek}_sart`)} defaultValue={schedule[dayOfWeek][value]}></input>;
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
                
              </div>
            ))}
            
          </div>

        </section>

      </main>

    </section>
  )
}
