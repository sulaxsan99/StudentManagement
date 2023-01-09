import React, {Component,useState} from 'react'
import axios from "axios";
import { useForm } from "react-hook-form"; 
export default function SignUp() {
    const [inputs, setInputs] = useState([]);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }
    const onSubmit = (event) => {
            event.preventDefault();
        console.log(inputs);
    
        try {
            axios.post('http://localhost/StudentAPi/index', inputs).then(function(response){
                console.log(response.data);
            });
        } catch (error) {
            console.log(error)
        }
       
        
    }
        return (
         <form 
         onSubmit={onSubmit}
         >
            <h3>Sign Up</h3>

            <div className="mb-3">
                <label>First Name</label>
                <input type="text" className="form-control" name='firstname' placeholder="First name" onChange={handleChange}
           
                />
            </div>

            <div className="mb-3">
                <label>Last Name</label>
                <input type="text" className="form-control" name='lastname' placeholder="Last name"  onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label>Student ID (If Student)</label> 
                <input type="text" className="form-control" name='studentId' placeholder="Enter Student ID"  onChange={handleChange}
                 />
            </div>

            <div className="mb-3">
                <label>NIC</label>
                <input type="text" className="form-control" name='nic' placeholder="Enter NIC"   onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" name='email' placeholder="Enter Email"  onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label>Telephone Number</label>
                <input type="tel" className="form-control"  name='phonenumber' placeholder="Enter phone number"  onChange={handleChange}
                />
            </div>

            <div className="mb-3">
                <label>Job Role</label>
                <select name='jobRole' className="form-control" onChange={handleChange} required={true}
                >
                    <option >Select</option>
                    <option value="student" >Student</option>
                    <option value="teacher">Teacher</option>
                </select>
            </div>

            <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" name='password'  onChange={handleChange} placeholder="Enter password"
                />
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Sign Up
                </button>
            </div>
            <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>)
}

