import React, { useEffect, useState } from 'react';

import Auth from "../utils/authServices"


export default function AuthTest() {

    //-- the logged-in user
    const [user, setUser] = useState("");


    useEffect(() => {
        const userPayload = ["erikplachta", "erik@noemail.com", "fakeid123"]
        
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
