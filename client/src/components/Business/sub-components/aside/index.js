import React, { useEffect, useState } from 'react';

export default function Aside({businessName, userName}) {

  return (
      <aside className='sidebar'>
        {/* Side Navigational Bar */}
                        
      <header className="business">  
        <h2>{businessName}</h2>
        <p>
          Welcome, {userName ?userName :"NO_USER_NAME"}! 
        </p>
      </header>
      
      {/* Business Menu */}
      <ul>
        
        <li>My Business</li> {/* Default landing page for business */}
        <li>Dashboard</li> {/* A summary of the business details overall */}
        <li>Appointments</li>  {/* Details on upcoming appointments */}
        <li>Settings</li> {/* Used to configure options */}

          {/* nav choices -hidden for now */}
          {/* <ul>
            <li>My Account</li>
            <li>My Business
              <ul>
                <li>Calendar</li>
                <li>Appointment Types</li>
                <li>Users</li>
              </ul>
            </li>
          </ul> */}
          {/* <li>Reporting</li> */}
      </ul>
    </aside>
  )
}
