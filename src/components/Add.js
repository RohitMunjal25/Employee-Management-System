import React, { useState } from 'react';

import swal from 'sweetalert'; 
import './styling/Add.css'; 
import api from './Apicall';

export default function Add() {
  const [empNo, setEmpNo] = useState("");
  const [empName, setEmpName] = useState("");
  const [empSal, setEmpSal] = useState("");




  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!empNo || !empName || !empSal) {
      swal("Error!", "Please fill all the fields.", "error");
      return;
    }

    try {
      const res = await api.post("/employees", {
        empNo,
        empName,
        empSal,
      });
      swal("Success!", "Employee added successfully!", "success");
      console.log(res.data);
      setEmpNo(""); 
      setEmpName(""); 
      setEmpSal("");
    } catch (err) {
      console.error(err);
      swal("Error!", "Error adding employee. Please try again.", "error");
    }
  };

  return (
    <div className="add-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Employee No" 
          value={empNo} 
          onChange={(e) => setEmpNo(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Employee Name" 
          value={empName} 
          onChange={(e) => setEmpName(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Employee Salary" 
          value={empSal} 
          onChange={(e) => setEmpSal(e.target.value)} 
        />
        <button type="submit">Add Record</button>
      </form>
    </div>
  );
}

