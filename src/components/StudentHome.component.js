import React, { useContext, useEffect, useState } from 'react'
import { useNavigate,useParams ,useLocation} from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
const StudentHome = () => {
  const [cookies, setCookie] = useCookies(["cookieuser"]);

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
const {state}= useLocation();
const nic = state.inputs.nic;
  const loggedInCheck = async () => {
    const loginToken = localStorage.getItem('loginToken');
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginToken;
    if (loginToken) {
      console.log(nic)
      setCookie(nic);
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
  return (
    <div>
      <h1>vfgtr{console.log(state.inputs.nic)}
      </h1>
      student
      <button className="logout">Logout</button>
    </div>
  )
}

export default StudentHome