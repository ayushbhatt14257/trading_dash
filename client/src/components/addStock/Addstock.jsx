import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Addstock = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    title: '', oneYear: '', threeYear: "", fiveYear: "", img: ''
  });

  let name, value

  const handleInput = (e) => {
    name = e.target.name
    value = e.target.value

    setUser({ ...user, [name]: value })
  }

  const postData = async (e) => {
    e.preventDefault();

    const { title, oneYear, threeYear, fiveYear, img } = user;

    const res = await fetch("/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title, oneYear, threeYear, fiveYear, img
      })

    });
    const data = await res.json();

    if (res.status === 422 || !data) {
      alert('Invalid Registration');
      console.log("Invalid Registration")

    } else {
      alert("Stock Added");
      console.log("Stock Added");
      navigate('/admin');
    }
  }

  return (
    <>
      <div className="container">
        <div className='form_container'>
          <div className="main_container">
            <div className="main_form">

              <h1>Add Stock</h1>
              <form action="POST">
                <div className="input_fild">
                  <input type="text" name='title' id='title' value={user.title} onChange={handleInput} placeholder='Title' />
                </div>

                <div className="input_fild">
                  <input type="text" name="oneYear" id='oneYear' value={user.oneYear} onChange={handleInput} placeholder='1Y %' />
                </div>

                <div className="input_fild">
                  <input type="text" name='threeYear' id='threeYear' value={user.threeYear} onChange={handleInput} placeholder='3Y %' />
                </div>

                <div className="input_fild">
                  <input type="text" name='fiveYear' id='fiveYear' value={user.fiveYear} onChange={handleInput} placeholder='5Y %' />
                </div>

                <div className="input_fild">
                  <input type="text" name='img' id='img' value={user.img} onChange={handleInput} placeholder='Image URL' />
                </div>

                <button type='submit' onClick={postData} className='registration_btn'>Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Addstock