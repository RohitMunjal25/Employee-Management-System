import React, { useState } from "react";
import axios from "axios";
import swal from 'sweetalert';
import './styling/Modify.css';

export default function Modify() {
  const [empNo, setEmpNo] = useState("");
  const [empName, setEmpName] = useState("");
  const [empSal, setEmpSal] = useState("");
  const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

  const handleModify = async (e) => {
    e.preventDefault();
    if (!empNo || !empName || !empSal) {
      swal("Error!", "Please fill all the fields.", "error");
      return;
    }

    try {
      await api.put(`/api/employees/${empNo}`, {
        empName,
        empSal,
      });
      swal("Success!", "Employee modified successfully!", "success");
      setEmpNo(""); 
      setEmpName(""); 
      setEmpSal("");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        swal("Not Found!", "Employee with this ID does not exist.", "error");
      } else {
        swal("Error!", "Error modifying employee. Please try again.", "error");
      }
    }
  };

  return (
    <div className="modify-container">
      <h2>Modify Employee</h2>
      <form onSubmit={handleModify}>
        <input
          type="text"
          placeholder="Employee No to Modify"
          value={empNo}
          onChange={(e) => setEmpNo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter New Employee Name"
          value={empName}
          onChange={(e) => setEmpName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Updated Employee Salary"
          value={empSal}
          onChange={(e) => setEmpSal(e.target.value)}
        />
        <button type="submit">Modify Record</button>
      </form>
    </div>

  );
}
