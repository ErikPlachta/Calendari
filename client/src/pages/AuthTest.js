import React, { useEffect, useState } from 'react';

import {auth} from "../utils/authServices"

export default function AuthTest() {

    //-- the logged-in user
    const [user, setUser] = useState("");


    useEffect(() => {
        setUser( auth.getCurrentUser());
    }, []);


  return (
    <div>AuthTest</div>
  )
}
