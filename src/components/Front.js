import React from "react";
import { Link } from "react-router-dom";
import './styling/Front.css'; 

export default function Front() {
  
  return (
    <div className="front-container">
      <h1>Welcome to Employee Management System</h1>
      <h2>What do you want to do first:</h2>
      <div className="button-container">
        <Link to="/add">Add Employee</Link>
        <Link to="/delete">Delete Employee</Link>
        <Link to="/modify">Modify Employee</Link>
        <Link to="/find">Find Employee</Link>
        <Link to="/findall">Find All Employees</Link>
      </div>
    </div>
  );
}
