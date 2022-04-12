import React, { useEffect, useState } from 'react';

export default function Aside({setPage, businessName, userName}) {

  return (
    <aside className='businessSidebar'>
        {/* Side Navigational Bar */}
                        
      <header className="business">  
        <h2>{businessName}</h2>
        <p>
          Welcome, {userName ?userName :"NO_USER_NAME"}! 
        </p>
      </header>
      
      {/* Business Menu */}
      <ul className='businessSidebarList'>
        
        <li id='aside-dashboard'  onClick={setPage}>Dashboard</li> {/* A summary of the business details overall */}
        <li id='aside-my-settings' onClick={setPage}>My Settings</li> {/* Used to configure options */}
        <li id='aside-my-business' onClick={setPage}>My Business</li> {/* Default landing page for business */}
        <li id='aside-my-appointments' onClick={setPage}>My Appointments</li>  {/* Details on upcoming appointments */}

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
