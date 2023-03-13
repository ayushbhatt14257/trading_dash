import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './signup.css'

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name:'', email: '', phone: "", password: "", cpassword: ""
    });

    let name, value
    
    const handleInput = (e) => {
        name = e.target.name 
        value = e.target.value 

        setUser({...user, [name]:value})
    }

    const postData = async (e) => {
        e.preventDefault();
    
        const {name, email, phone, password, cpassword} = user;
    
        const res = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            name, email, phone, password, cpassword
          })
          
        });
        const data = await res.json();
    
        if (res.status === 422 || !data) {
          alert('Invalid Registration');
          console.log("Invalid Registration")
    
        } else {
          alert("Registration Successfull");
          console.log("SuccessFul Registraion");
          navigate('/login');
        }
      }

    return (
        <>
            <header className='container'>
                <div className='form_container'>
                    <div className="main_container">
                        <div className="main_form">

                            <h1>Sign-Up</h1>
                            <form action="POST">
                                <div className="input_fild">
                                    <input type="text" name='name' id='name' value={user.name} onChange = {handleInput} placeholder='Name'/>
                                </div>

                                <div className="input_fild">
                                    <input type="text" name="email" id='email' value={user.email} onChange = {handleInput} placeholder='Email'/>
                                </div>

                                <div className="input_fild">
                                    <input type="text" name='phone' id='phone' value={user.phone} onChange = {handleInput} placeholder='Mobile'/>
                                </div>

                                <div className="input_fild">
                                    <input type="password" name='password' id='password' value={user.password} onChange = {handleInput} placeholder='Password'/>
                                </div>

                                <div className="input_fild">
                                    <input type="password" name='cpassword' id = 'cpassword' value={user.cpassword} onChange = {handleInput} placeholder='Password Again'/>
                                </div>

                                <button type='submit' onClick={postData} className='registration_btn'>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Signup