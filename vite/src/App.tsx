import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar/Navbar';;
import Popular from './components/Popular/Popular'
import Details from './components/Popular/Details';
import HomeDetails from './components/Home_details';
import Now_Playing from './components/Now_Playing/Now_Playing'
import Now_Playing_Details from './components/Now_Playing/Now_Playing_Details';;
import Blog from './Sanity_Client/Blog/Blog'
import Blog_Slug from './Sanity_Client/Blog/Blog_Slug';


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
        <Route path="/Blog" element={<Blog />} />
        <Route path="/Blog_Slug/:slug" element={<Blog_Slug />} />
      </Routes>
    </div>
  )
}

export default App