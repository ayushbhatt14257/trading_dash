import React from 'react'
import { NavLink } from 'react-router-dom'
import './home.css'

const Home = () => {
    return (
        <>
            <section className='container'>

                <div className="home_middle">
                    <p>Favour your fututre by</p>
                    <p>managing all your</p>
                    <p>investment in one place</p>
                </div>

                <div className="home_bottom">
                    <div className="bottom_lineOne">
                        <h1>Nurture</h1>
                        <NavLink to={'/stocks'}>
                            <button>Let's start</button>
                        </NavLink>
                    </div>
                    <h1>Your Savings</h1>
                </div>
            </section>
        </>
    )
}

export default Home