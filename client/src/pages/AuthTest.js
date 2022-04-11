import React, { useEffect, useState } from 'react';

//-- for business page
import Auth from "../utils/authServices"


//-- for login page
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';


export default function AuthTest() {

    //-- the logged-in user
    const [user, setUser] = useState("");
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleFormSubmit = async (event) => {
        // event.preventDefault();

        const userPayload = {
            username: "erikplachta", 
            email: "erik@noemail.com"
            
        };
    
        try {
          const { data } = await login({
            variables: { ...userPayload },
          });
    
          console.log(data)
          Auth.login(data.login.token);
        }
        
        catch (e) {
            
            console.log(`Error: ${e}`);
        }
    
      };

    useEffect(() => {
       
        handleFormSubmit()
        
        // console.log(userPayload)
        // setUser( auth.login());
        // console.log(Auth.AuthService.getToken())
        console.log(Auth.isLoggedIn())
    }, []);


    if(!Auth.isLoggedIn()){
        return (
            <div>
                <h2>AuthTest</h2>
                User NOT logged in.
            </div>
        )
    }
    


  return (
    <div>
        <h2>AuthTest</h2>
        {user}

    </div>
  )
}
