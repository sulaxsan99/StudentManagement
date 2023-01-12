
import axios from "axios";
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';

 const TeacherHome = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  const nic = state.inputs.nic;
 
  const loggedInCheck = async () => {
  const loginToken = localStorage.getItem('loginToken');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginToken;
    if (loginToken) {
      console.log(nic)
   
      axios.get(`http://localhost/StudentAPi/index/`).then(function (response) {
        console.log(response)
      })
    } else {
      navigate('/')
    }
  }
  useEffect(() => {
    async function asyncCall() {
      await loggedInCheck();
    }
    asyncCall();
  }, []);

//   const validToken = localStorage.getItem("token")
const logout=()=>{
  console.log("kjndfkjvbf")
  localStorage.removeItem('loginToken');
  loggedInCheck()
}
  return (
    <div>
      teacher
      <button className="button-18" onClick={logout}>Logout</button> 
    </div>
  )
}

export default TeacherHome