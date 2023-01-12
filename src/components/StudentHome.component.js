import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { useCookies } from "react-cookie";
import './css/studentHome.css'
const StudentHome = () => {
  const [cookies, setCookie] = useCookies(["cookieuser"]);

  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const { state } = useLocation();
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

  const [inputs, setInputs] = useState([]);

  
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}));
}

const logout=()=>{
  console.log("kjndfkjvbf")
  localStorage.removeItem('loginToken');
  loggedInCheck()
}
  return (



    <div className='student'>
      <div className='SHome'>
        <div className='detail'>
          <h3>
            Student Detail

          </h3>
          <div>
            {nic}
          </div>
        </div>
        <div className='result'>
          <h3>
            Result
          </h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">subject </th>
                <th scope="col">Result</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>OOP</td>
                <td>DBMS</td>
                
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>pass</td>
                <td>fail</td>
      
              </tr>
          
            </tbody>
          </table>
        </div>

       

  </div>
  <button className="button-18" onClick={logout}>Logout</button> 
  </div>
  )
}

export default StudentHome