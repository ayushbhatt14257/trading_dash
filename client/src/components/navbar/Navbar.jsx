import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { UserContext } from "../../App"
import './navbar.css'


const Navbar = () => {
    const { mystate, dispatch } = useContext(UserContext);  
    if(mystate) {
        return (
            <>
                <section className='container'>
    
                    <div className="nav">
                        <div className="nav_left">
                            <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
                                <h3>Whirl Invest</h3>
                            </NavLink>
                        </div>
                        <div className="nav_middle">
                        <ul>
                            <li><Link to = '/stocks'  style={{ textDecoration: 'none', color: 'black' }}>Invest Now</Link></li>
                            <li>Partners</li>
                            <li>Blog</li>
                            <li>About us</li>
                        </ul>
                    </div>
                    <div className="nav_right">
                        {/* <NavLink to='/register'><button>Sign up</button></NavLink>
                        <NavLink to='/login'><button>Log in</button></NavLink> */}
                        <NavLink to='/logout'><button>logout</button></NavLink>
                        <NavLink to='/admin'><button className='admin_btn'>Admin Pannel</button></NavLink>
                    </div>
                    </div>
                </section>
            </>
        )
    } else {
        return (
            <>
                <section className='container'>
    
                    <div className="nav">
                        <div className="nav_left">
                            <NavLink to='/' style={{ textDecoration: 'none', color: 'black' }}>
                                <h3>Whirl Invest</h3>
                            </NavLink>
                        </div>
                        <div className="nav_middle">
                        <ul>
                            <li><Link to = '/stocks' style={{textDecoration: 'none', color: 'black'}}>Invest Now</Link></li>
                            <li>Partners</li>
                            <li>Blog</li>
                            <li>About us</li>
                        </ul>
                    </div>
                    <div className="nav_right">
                        <NavLink to='/register'><button>Sign up</button></NavLink>
                        <NavLink to='/login'><button>Log in</button></NavLink>
                        {/* <NavLink to='/admin'><button className='admin_btn'>Admin Pannel</button></NavLink> */}
                    </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Navbar