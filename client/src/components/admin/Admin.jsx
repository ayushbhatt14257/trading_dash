import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
// import IMG from '../../assests/stock.png'
import './admin.css'

const Admin = () => {
    const navigate = useNavigate();
    const [listItems, setListItems] = useState([]);

    const getItemList = async () => {
        try {
            const res = await fetch('/admin', {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            });

            const data = await res.json();
            setListItems(data);

            if (res.status === 401) {
                const error = new Error(res.error);
                alert('Only access to admin')
                throw error;
            }

        } catch (error) {
            console.log(error);
            navigate('/');
        }
    }

    useEffect(() => {
        getItemList();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    const deleteItem = async (id) => {
        try {
            const res = await fetch(`/delete_stocks/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                // credentials: 'include'
            });

            const data = await res.json();

            if (res.status !== 200 || !data) {
                alert(`Stock not deleted`)
            } else {
                alert(`Stock deleted check on invest now page`)
            }

        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     deleteItem();
    // }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>

            <div className="container">
                <div className="stock_container">
                    <div className="heading">
                        <p>Admin Pannel</p>
                        <Link to={'/add_stock'}>
                            <button>ADD STOCK+</button>
                        </Link>
                    </div>
                    {
                        listItems.map((products) => (
                            <div className="admin_stock_cart">
                                <div className="admin_left_img">
                                    <img src={products.img} alt="img" />
                                </div>

                                <div className="admin_stock_name">
                                    <h2>{products.title}</h2>
                                </div>

                                <div className="admin_stock_price">
                                    <div className="admin_stock_price_one">
                                        <h3>{products.oneYear}</h3>
                                        <h4>1Y</h4>
                                    </div>

                                    <div className="admin_stoc_price_two">
                                        <h3>{products.threeYear}</h3>
                                        <h4>3Y</h4>
                                    </div>

                                    <div className="admin_stock_price_three">
                                        <h3>{products.fiveYear}</h3>
                                        <h4>5Y</h4>
                                    </div>
                                </div>

                                <div className="btns">
                                    <NavLink to={`/stocks/${products._id}`}>
                                        <button className='edit'>Edit</button>
                                    </NavLink>
                                    <button className='delete' onClick={() => { deleteItem(products._id) }}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default Admin