import React from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Signup from './components/signup_sigin/Signup'
import Sigin from './components/signup_sigin/Sigin'
import Stock from './components/stock/Stock'
import Admin from './components/admin/Admin'
import Addstock from './components/addStock/Addstock'
import Updatestock from './components/updateStock/Updatestock'
import Logout from './components/logout/Logout'
import { Route, Routes } from 'react-router-dom'
import { createContext, useReducer } from 'react';

import { initialState, reducer } from '../src/reducer/UseReducer'

export const UserContext = createContext();

const App = () => {
  const [mystate, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      <UserContext.Provider value={{ mystate, dispatch }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Signup />} />
          <Route path='/login' element={<Sigin />} />
          <Route path='/stocks' element={<Stock />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/add_stock' element={<Addstock />} />
          <Route path='/stocks/:id' element={<Updatestock />} />
          <Route path='/logout' element={<Logout/>} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App