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
      <div className="search-container">
        <form>
          <input type="text" placeholder="Search...." className="input" />
          <button className="search_button" type="submit">
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
