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
        {/* Default landing page for business */}
        <li>My Business</li>
        {/* A summary of the business details overall */}
        <li>Dashboard</li>
        {/* Details on upcoming appointments */}
        <li>Appointments</li>
        {/* <li>Reporting</li> */}
        {/* Used to configure options */}
        <li>Settings
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
        </li>
      </ul>
    </aside>
  )
}
