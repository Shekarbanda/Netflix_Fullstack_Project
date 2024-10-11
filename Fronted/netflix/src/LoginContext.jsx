import React, { createContext, useState } from 'react'


export const LoginContext = createContext(null);

export const LoginProvider=(props)=>{
    const [email,setemail] = useState("");
    const [loading,setloading] = useState(false);
    const [user,setuser] = useState("");
  return (
    <LoginContext.Provider value={{email,setemail,loading,setloading,user,setuser}}>
        {props.children}
    </LoginContext.Provider>

  )
}
