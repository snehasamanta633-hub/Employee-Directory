import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [email, setEmail] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editId, setEditId] = useState(null);

  // Add or Update Employee
  const handleSubmit = async (e) => {
    e.preventDefault();

    // UPDATE EMPLOYEE
    if (editId) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/employees/${editId}`,
          {
            name,
            department,
            designation,
            email
          }
        );

        console.log(response.data);

        alert("Employee updated successfully!");

        // Clear form
        setName("");
        setDepartment("");
        setDesignation("");
        setEmail("");
        setEditId(null);

        // Refresh employee list
        const updatedResponse = await axios.get(
          "http://localhost:5000/api/employees"
        );

        setEmployees(updatedResponse.data);
      } catch (error) {
        console.log(error);
        alert("Failed to update employee");
      }

      return;
    }

    // ADD NEW EMPLOYEE
    try {
      const response = await axios.post(
        "http://localhost:5000/api/employees",
        {
          name,
          department,
          designation,
          email
        }
      );

      console.log(response.data);

      alert("Employee added successfully!");

      // Clear form
      setName("");
      setDepartment("");
      setDesignation("");
      setEmail("");

      // Refresh employee list
      const updatedResponse = await axios.get(
        "http://localhost:5000/api/employees"
      );

      setEmployees(updatedResponse.data);
    } catch (error) {
      console.log(error);
      alert("Failed to add employee");
    }
  };

  // Edit Employee
  const handleEdit = (employee) => {
    setEditId(employee._id);
    setName(employee.name);
    setDepartment(employee.department);
    setDesignation(employee.designation);
    setEmail(employee.email);
  };

  // Delete Employee
  const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/employees/${id}`
    );

    alert("Employee deleted successfully!");

    // Refresh employee list
    const response = await axios.get(
      "http://localhost:5000/api/employees"
    );

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
        const response = await axios.get(
          "http://localhost:5000/api/employees"
        );

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