import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Updatestock = () => {

    const navigate = useNavigate();
    const { id } = useParams('');

    const [user, setUser] = useState({ title: "", oneYear: "", threeYear: '', fiveYear: '', img: '' });
    //   console.log(inddata);

    const getinddata = async () => {
        const res = await fetch(`/stocks/${id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const data = await res.json();
        setUser({ ...user, title: data.title, oneYear: data.oneYear, threeYear: data.threeYear, fiveYear: data.fiveYear, img: data.img })
        if (res.status !== 201) {
            console.log('no data available')
        } else {
            setUser(data)
            console.log('getdata');
        }
    };

    useEffect(() => {
        getinddata();
    }, [id])

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) => {
        e.preventDefault();

        const { title, oneYear, threeYear, fiveYear, img } = user;

        const res = await fetch(`/update_stocks/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title, oneYear, threeYear, fiveYear, img
            })
        });

        const data = await res.json();

        if (!data) {
            console.log('Update Failed');
        } else {
            alert("Updated Sucessfully");
            setUser({ ...user, title: "", oneYear: "", threeYear: "", fiveYear: "", img: "" })
            navigate('/admin')
        }
    }

    return (
        <>
            <div className="container">
                <div className='form_container'>
                    <div className="main_container">
                        <div className="main_form">

                            <h1>Edit Stock</h1>
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

                                <button type='submit' onClick={PostData} className='registration_btn'>Edit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Updatestock