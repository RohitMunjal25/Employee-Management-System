import React, { useState } from "react";
import api from "./Apicall";
import Swal from "sweetalert2"; 
import "./styling/Delete.css"; 

export default function Delete() {
  const [id, setId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!id) {
      Swal.fire("Heads up!", "Please enter an Employee No.", "warning");
      return;
    }

    try {
      const empNo = Number(id);
      await api.delete(`/employees/${empNo}`);
      Swal.fire("Deleted!", `Employee ${empNo} has been removed.`, "success");
      setId("");
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        Swal.fire("Not Found!", "Employee with this ID does not exist.", "error");
      } else {
        Swal.fire("Error!", "Failed to delete employee. Please try again later.", "error");
      }
    }
  };

  return (
    <div className="delete-container"> 
      <h2>Remove Employee</h2>
      <form onSubmit={handleDelete}>
        <input
          type="number"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Employee No"
          required
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}
