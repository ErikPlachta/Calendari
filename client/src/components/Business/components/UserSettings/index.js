//------------------------------------------------------------------------------
//-- MODULES
import React, { useEffect, useState } from 'react';
import PageNotFound from '../../../../pages/PageNotFound';
import { useMutation } from '@apollo/client';

import { UPDATE_USER } from '../../../../utils/mutations';
//-- JWT Auth
import Auth from "../../../../utils/authServices";

//------------------------------------------------------------------------------
/* EXPORT FUNCTION - User
  //TODO:: 04/10/22 #EP || Update this
*/
export default function UserSettings(userData) {

  const [users, setUsers] = useState([]) //-- all users
  
  //TODO 04/10/22 #EP || Update with the logged in users data by grabbing ID from JWT and then build page with this
  const [user, setUser] = useState({ //-- the logged in user
    name_first    : '',
    name_last     : '',
    email         : '',
  })

  
  const validateParams = async () => {  //-- Determine which params are sent in and update state accordingly
    // console.log(appointmentData)
    
    //-- Grab ALL user data for business to store here
    if(userData){ 
      setUser({...userData.userData[0]})
      // console.log(user)
    };

    //TODO:: 04/10/22 #EP || Add the logged-in users data to update the user state.

    
  }


  //-- Runs to set variables
  useEffect( () => {
    validateParams()
  },[]);



  //-- checking to see if things were updated properly and in a place to run
  const state = () => {
    //TODO:: 04/10/22 #EP || Convert to an actual useState function
    // const [state, setState] = useState({

    let response = true

    //1. See if Local Storage Contains data

    //2. If it does, return to that state
    // setStep(localStorageNumber);

    //3. if does not, just return false
    if(!users){ 
      response = false; 
      console.log("//-- No UserData provided...")
    }

    //TODO:: 04/10/22 #EP || Enable this once pulling from JWT
    // if(!user._id){
    //   response = false; 
    //   console.log("//-- No specific user id verified...")
    // }
    
    return response;
  };


  //-- listen for changes in user values, auto-update state
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value,  });
  };

  // update user info
  const [updateUser] = useMutation(UPDATE_USER);
  const updateUserHandler = async (event) => {
    event.preventDefault();

    //retrieve business Id from logged in user info
    const userId = await Auth.getCurrentUser().data._id;

    console.log(userId);
    console.log(user);

    try {
      await updateUser({
        variables: { 
          id: userId,
          nameFirst: user.name_first,
          nameLast: user.name_last
        }
      });
      console.log("success!");
      window.location.reload();
    } catch (e) {
      console.error(e);
    }

  }

  return (
    <section className="businessUser">  
      {/* contains the step location, back arrow, and has awareness of if local storage or not */}
      
        {/* { state()
              ? <StatusBar step={step} state={state} maxSteps={maxSteps} formerStep={formerStep} /> 
              && schedulerPages[step]
              : <PageNotFound /> */}
              {(() => {
                switch(state()) {    
                  case true:  return (
                    <div className="businessContainerResults">
                      <h3>
                        {Auth.getCurrentUser().data._id 
                            ? `${Auth.getCurrentUser().data.username}'s ` 
                            : <span>Empty User Value: <code>name_first</code></span>
                        }
                        User Settings
                      </h3>
                      {/* TODO:: 04/10/22 #EP || Map logged in user, fille in data below */}

                      {/* <div className="businessUserStats">
                        <span>
                          Account Created:  { 
                                  //TODO:: 04/10/22 #EP || Add formatting w helpers
                                  user.date_created 
                                    ? user.date_created
                                    : <span>Empty User Value: <code>created_date</code> </span>
                          }
                        </span> */}
                        {/* Date of last login */}
                        {/* <span>
                          Last Login:  { 
                                  //TODO:: 04/10/22 #EP || Add formatting w helpers
                                  user.date_login
                                    ? user.date_login
                                    : <span>Empty User Value: <code>created_date</code> </span>
                          }
                        </span>
                      </div> */}
                      
                      {/* for user to update their settings */}
                      <form id="userSettingsForm" className="clientContactForm" onSubmit={updateUserHandler}>
                        {/* User First Name */}
                        <span className="form-element">
                          <label htmlFor="user-name_first">First Name</label>
                          <input
                            name='name_first'
                            id="user-name_first"
                            type='text'
                            placeholder="Enter your first name"
                            required
                            autoComplete='given-name'
                            onChange={handleChange}
                            value={user.name_first}
                          />
                        </span>

                        {/* User Last Name */}
                        <span className="form-element">
                          <label htmlFor="user-name_last">Last Name</label>
                          <input
                            name='name_last'
                            id="user-name_last"
                            type='text'
                            placeholder="Enter your last name"
                            required
                            autoComplete='family-name'
                            onChange={handleChange}
                            value={user.name_last}
                          />
                        </span>

                        {/* User Email */}
                        <span className="form-element">
                          <label htmlFor="user-email">Email</label>
                          <input
                            name='email'
                            id="user-email"
                            type='email'
                            placeholder="your@email.com"
                            required
                            autoComplete="email"
                            onChange={handleChange}
                            value={user.email}
                            readOnly
                          />
                        </span>
                        <span className="form-element">
                          <input
                            type="submit"
                            className="button"
                            id="contact-me-submit"
                            value="Submit"
                          />
                        </span>
                      </form>
                    </div>
                  )
                  case false: return <PageNotFound />;
                  //TODO::04/10/22 #EP | Add loading
                  default:    return <PageNotFound />;
                }
            })()}
    </section>
  )
}
