import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar/Navbar'
import Popular from './components/Popular/Popular'
import Details from './components/Popular/Details'
import HomeDetails from './components/Home_details'
import Now_Playing from './components/Now_Playing/Now_Playing'
import Now_Playing_Details from './components/Now_Playing/Now_Playing_Details'


const App:React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/upcoming_movie/:id" element={<HomeDetails />} />
        <Route path="/Now_Playing" element={<Now_Playing />} />
        <Route path="/Now_Playing_Movies/:id" element={<Now_Playing_Details />} />
      </Routes>
    </div>
  )
}

export default App