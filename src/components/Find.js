import React, { useState } from "react";
import swal from 'sweetalert';
import './styling/Find.css';
import api from "./Apicall";
export default function Find() {
  const [empNo, setEmpNo] = useState("");
  const [employee, setEmployee] = useState(null);

  const handleFind = async (e) => {
    e.preventDefault();
    if (!empNo) {
      swal("Error!", "Please enter an Employee No.", "error");
      return;
    }
    try {
      const res = await api.get(`/employees/${empNo}`);
      setEmployee(res.data);
    } catch (err) {
      console.error(err);
      setEmployee(null); 
      swal("Not Found!", "Employee with this ID does not exist.", "error");
    }
  };

  return (
    <div className="find-container">
      <h2>Find Employee</h2>
      <form onSubmit={handleFind}>
        <input
          type="number"
          placeholder="Enter Employee No to Find"
          value={empNo}
          onChange={(e) => setEmpNo(e.target.value)}
        />
        <button type="submit">Find Record</button>
      </form>

      {employee && (
        <div className="employee-details-card">
          <h3>Employee Details</h3>
          <div className="detail-item">
            <strong>Employee No:</strong>
            <span>{employee.empNo}</span>
          </div>
          <div className="detail-item">
            <strong>Name:</strong>
            <span>{employee.empName}</span>
          </div>
          <div className="detail-item">
            <strong>Salary:</strong>
            <span>{employee.empSal}</span>
          </div>
        </div>
      )}
    </div>
  );
}
