import React from "react";
import { NavLink } from "react-router-dom"; 
import './styling/Menu.css';


export default function Menu() {
  
  return (
    <div className="sidebar">
      <h2 className="menu-title">EMS</h2>
      <nav className="menu-nav">
        <NavLink to="/add" className="menu-link">Add Employee</NavLink>
        <NavLink to="/delete" className="menu-link">Remove Employee</NavLink>
        <NavLink to="/modify" className="menu-link">Modify Employee</NavLink>
        <NavLink to="/find" className="menu-link">Find Employee</NavLink>
        <NavLink to="/findall" className="menu-link">Find All Employees</NavLink>
        
      </nav>
    </div>
  );
}

