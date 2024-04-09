import React from "react";
import { NavLink } from "react-router-dom";
import "./Nabar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <NavLink className="navlink" to="/Now_Playing">
        Playing
      </NavLink>
      <NavLink className="navlink" to="/">
        Movie App
      </NavLink>
      <NavLink className="navlink" to="/popular">
        Popular
      </NavLink>
      <NavLink className="navlink" to="/blog">
        Blog
      </NavLink>
    </div>
  );
};

export default Navbar;
