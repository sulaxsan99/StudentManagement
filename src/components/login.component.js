import React, { Component, useState, useContext } from 'react'

import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { UserContext } from './ContexProvider';

const login = () => {
  const [inputs, setInputs] = useState({
    nic: '',
    password: '',
    jobRole: ''
  });
  // const { loggedInCheck } = useContext(UserContext);
  const [wait, setWait] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const navigate = useNavigate();
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({ ...values, [name]: value }));
  }



  const loginUser = async ({ nic, password, jobRole }) => {
    setWait(true);
    try {
      const { data } = await axios.post('http://localhost/StudentAPi/login.php', { nic, password, jobRole });
      // console.log(data);
      if (data.success && data.token && data.jobRole == 'student') {
        localStorage.setItem('loginToken', data.token);
        setWait(false);
        navigate('/Student',{state:{
          inputs
        }})
     
        return { success: 1 };
      } else if (data.success && data.token && data.jobRole == 'teacher') {
        localStorage.setItem('loginToken', data.token);
        navigate('/Teacher',{state:{
          inputs
        }});
        setWait(false);
        return { success: 1 };
      }
      setWait(false);
      return { success: 0, message: data.message };
    }
    catch (err) {
      // setWait(false);
      console.log(err)
      return { success: 0, message: 'Server Error!' };

    }

  }


  const userlogin = async (e) => {
    e.preventDefault();
    const data = await loginUser(inputs);
    setErrMsg(data.message)
    console.log(data.message)
  }
  return (
    <form
      onSubmit={userlogin}
    >
      <h3>Sign In</h3>

      <div className="mb-3">
        <label>nic</label>
        <input
          name='nic'
          type="text"
          className="form-control"
          placeholder="Enter nic"
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label>Job Role</label>
        <select className="form-control" required={true} name='jobRole'
          onChange={handleChange}
        >
          <option>Select</option>
          <option value="student" >Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          name='password'
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      {/* <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            &nbsp; Remember Me
          </label>
        </div>
      </div> */}

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Sign In
        </button>
        {errMsg && <div className="err-msg">{errMsg}</div>}
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="/">password?</a>
      </p>
    </form>
  )
}

export default login
