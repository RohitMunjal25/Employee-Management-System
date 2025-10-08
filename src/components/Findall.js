import React, { useState, useEffect } from "react";
import api from "./Apicall";
import swal from 'sweetalert';
import './styling/FindAll.css';

export default function FindAll() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); 
  
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await api.get(`${process.env.REACT_APP_API_URL}/api/employees`);
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        swal("Error!", "Could not fetch employee data.", "error");
      } finally {
        setLoading(false); 
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return <div className="findall-container"><p className="loading-text">Loading...</p></div>;
  }

  return (
    <div className="findall-container">
      <h2>All Employees</h2>
      {employees.length === 0 ? (
        <p className="no-data-text">No employees found in the database.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Emp No</th>
                <th>Name</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.empNo}>
                  <td>{emp.empNo}</td>
                  <td>{emp.empName}</td>
                  <td>{emp.empSal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
