import React from 'react'
import { Outlet } from 'react-router-dom';
import Unautorised from './unautorised';

const AuthHanler = () => {

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if(!userId) {
        return <Unautorised/>
    }

  return (
    <Outlet/>
  )
}

export default AuthHanler;