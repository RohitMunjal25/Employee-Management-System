import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; 
import './styling/Menu.css';


export default function Menu() {
  
const navigate=useNavigate();

const handleLogout=e=>{
  e.preventDefault();
  localStorage.removeItem('token');
  navigate('/');
}
  return (
    <div className="sidebar">
      <h2 className="menu-title">EMS</h2>
      <nav className="menu-nav">
        <NavLink to="/add" className="menu-link">Add Employee</NavLink>
        <NavLink to="/delete" className="menu-link">Remove Employee</NavLink>
        <NavLink to="/modify" className="menu-link">Modify Employee</NavLink>
        <NavLink to="/find" className="menu-link">Find Employee</NavLink>
        <NavLink to="/findall" className="menu-link">Find All Employees</NavLink>
        <a href="/" className="Logout" onClick={handleLogout}>Logout</a>
        
      </nav>
    </div>
  );
}

