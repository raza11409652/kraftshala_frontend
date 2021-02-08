import React, { useState , useContext } from "react";
import { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "../container/login/login";
import {auth } from '../service/auth.service'
import AuthContext from '../context/auth.context'
export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
    const token = localStorage.getItem('_token');
    const [error , setError]=useState(null)
    const {user, setUser} = useContext(AuthContext)
    useEffect(()=>{
        auth({token:token}).then(data=>{
            console.log(data);
            if(data.error===false){
                setError(false)
                setUser(data.user)
            }else{
                setError(true)
                setUser(null)
            }
        }).catch(er=>{
            setError(true)
            console.log(er);
        })

    },[token]);
  return (
    <Route
      {...rest}
      render={props => {
         if(error===null){
             //do nothing. ...
         }
         else if(error===true){
          return  <Login></Login>
         }else if(error===false){
             return  <Component {...props}></Component>
         }
          
      }}
    />
  );
};
