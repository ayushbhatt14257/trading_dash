import React,{useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import { UserContext } from '../../App';

function Sigin() {

  const {mystate, dispatch} = useContext(UserContext);

    const navigate = useNavigate();
    const [user, setUser] = useState({
         email: '', password: ""
    });

    let name, value
    
    const handleInput = (e) => {
        name = e.target.name 
        value = e.target.value 

        setUser({...user, [name]:value})
    }


    const loginUser = async(e) => {
        e.preventDefault();

        const { email, password} = user;
    
        const res = await fetch('/login', {
          method: "POST",
          credentials: 'include',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            email,password
          })
    
        });
        const data = await res.json();
    
        if (res.status === 400 || !data) {
          window.alert("Invalid  Details");
    
        }else {
          dispatch({type:'USER', payload:true})
          window.alert("Login Successfull");
          navigate('/stocks')
        }
      }

  return (
    <>
    <header className='container'>
        <div className='form_container'>
            <div className="main_container">
                <div className="main_form">

                    <h1>Sign-In</h1>
                    <form action="POST">

                        <div className="input_fild">
                            <input type="text" name='email' id='email' value={user.email} onChange = {handleInput} placeholder='Email'/>
                        </div>

                        <div className="input_fild">
                            <input type="password" name='password' id='password' value={user.password} onChange = {handleInput}  placeholder='Password'/>
                        </div>

                        <button type='submit' onClick={loginUser} className='registration_btn'>Login</button>
                    </form>
                </div>
            </div>
        </div>
    </header>
</>
  )
}

export default Sigin