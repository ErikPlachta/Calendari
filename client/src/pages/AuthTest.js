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
    const [formData, setFormData] = useState({
        email: "eriks@email.com",
        password: "password"
    });

    //TODO:: 04/11/22 #EP || Add to login
    const handleFormSubmit = async (event) => {
        //TODO:: 04/11/22 #EP || uncomment this
        // event.preventDefault();
        try {
          const { data } = await login({
            variables: { ...formData },
          });
          Auth.login(data.login.token,"test");
        }
        
        catch (e) {
            //TODO:: 04/11/22 #EP || Add UI msg here instead
            console.log(`Error: ${e}`);
            console.error(`${e}`);
        }
    
      };

    useEffect(() => {
        
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
