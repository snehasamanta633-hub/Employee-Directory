import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://employee-directory-hquh.onrender.com/api/employees";

function App() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [status, setStatus] = useState("Active");
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        // UPDATE
        const response = await axios.put(
          `${API_URL}/${editId}`,
          {
            name,
            department,
            designation,
            email,
            contact,
            status,
          }
        );

        console.log(response.data);
        alert("Employee updated successfully!");
      } else {
        // ADD
        const response = await axios.post(API_URL, {
          name,
          department,
          designation,
          email,
          contact,
          status,
        });

        console.log(response.data);
        alert("Employee added successfully!");
      }

      // Clear form
      setName("");
      setDepartment("");
      setDesignation("");
      setEmail("");
      setContact("");
      setStatus("Active");
      setEditId(null);

      // Refresh employee list
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.log(error);

      if (editId) {
        alert("Failed to update employee");
      } else {
        alert("Failed to add employee");
      }
    }
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setEditId(employee._id);
    setName(employee.name);
    setDepartment(employee.department);
    setDesignation(employee.designation);
    setEmail(employee.email);
    setContact(employee.contact);
    setStatus(employee.status);
  };

  // Delete Employee
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);

      alert("Employee deleted successfully!");

      // Refresh employee list
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to delete employee");
    }
  };

  // Fetch all employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(API_URL);
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="container">
      <h1>Employee Directory</h1>

      {/* Employee Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="text"
          placeholder="Designation"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Left">Left</option>
        </select>

        <button type="submit">
          {editId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      {/* Employee List */}
      <h2>Employee List</h2>

      <div>
        {employees.map((employee) => (
          <div className="employee-card" key={employee._id}>
            <h3>{employee.name}</h3>

            <p>Department: {employee.department}</p>

            <p>Designation: {employee.designation}</p>

            <p>Email: {employee.email}</p>

            <button onClick={() => handleEdit(employee)}>
              Edit
            </button>

            <button onClick={() => handleDelete(employee._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;