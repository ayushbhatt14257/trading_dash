import React, { useEffect, useState } from 'react'
import './stock.css'
import { useNavigate } from 'react-router-dom'
// import IMG from '../../assests/stock.png'
// import { NavLink } from "react-router-dom";



const Stock = () => {
    const navigate = useNavigate();
    const [listItems, setListItems] = useState([]);

    const getItemList = async () => {
        try {
            const res = await fetch('/stocks', {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    "Content-Type": 'application/json'
                },
                credentials: 'include'
            });

            const data = await res.json();
            setListItems(data);

            if(!res.status === 200) {
                const error = new Error(res.error);
                throw error;
              }

        } catch (error) {
            console.log(error);
            navigate('/login');
        }
    }

    useEffect(() => {
        getItemList();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            
            <div className="container">
                <div className="stock_container">
                    <p>Stock Dashboard</p>
                    {
                        listItems.map(products => (
                                <div className="stock_cart">
                                    <div className="left_img">
                                        <img src={products.img} alt="img" />
                                    </div>

                                    <div className="stock_name">
                                        <h2>{products.title}</h2>
                                    </div>

                                    <div className="stock_price">
                                        <div className="stock_price_one">
                                            <h3>{products.oneYear}</h3>
                                            <h4>1Y</h4>
                                        </div>

                                        <div className="stoc_price_two">
                                            <h3>{products.threeYear}</h3>
                                            <h4>3Y</h4>
                                        </div>

                                        <div className="stock_price_three">
                                            <h3>{products.fiveYear}</h3>
                                            <h4>5Y</h4>
                                        </div>
                                    </div>
                                </div>
                        ))
                    }
                </div>
            </div>

        </>
    )
}

export default Stock