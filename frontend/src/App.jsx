
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus, Users } from "lucide-react";
import "./App.css";

const API = "http://localhost:5000/api/employee";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
    designation: ""
  });

  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(`${API}/gt`);
      setEmployees(res.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
      alert("Unable to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API}/update/${editId}`, form);
        alert("Employee updated successfully");
      } else {
        await axios.post(`${API}/create`, form);
        alert("Employee added successfully");
      }

      setForm({
        name: "",
        email: "",
        department: "",
        salary: "",
        designation: ""
      });

      setEditId(null);
      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    }
  };

  const handleEdit = (employee) => {
    setForm({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: employee.salary,
      designation: employee.designation
    });

    setEditId(employee._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await axios.delete(`${API}/delete/${id}`);
      alert("Employee deleted successfully");
      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Employee Management</h1>
          <p>Manage your employees in one place</p>
        </div>
        <Users size={38} />
      </header>

      <div className="stats">
        <div className="stat-card">
          <Users size={30} />
          <div>
            <h2>{employees.length}</h2>
            <p>Total Employees</p>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="form-section">
          <h2>{editId ? "Update Employee" : "Add Employee"}</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Employee Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />

            <input
              name="salary"
              type="number"
              placeholder="Salary"
              value={form.salary}
              onChange={handleChange}
              required
            />

            <input
              name="designation"
              placeholder="Designation"
              value={form.designation}
              onChange={handleChange}
              required
            />

            <button type="submit">
              <Plus size={18} />
              {editId ? "Update Employee" : "Add Employee"}
            </button>

            {editId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setEditId(null);
                  setForm({
                    name: "",
                    email: "",
                    department: "",
                    salary: "",
                    designation: ""
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </section>

        <section className="table-section">
          <h2>Employee List</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.department}</td>
                    <td>₹{employee.salary}</td>
                    <td>{employee.designation}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(employee)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(employee._id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}

                {employees.length === 0 && (
                  <tr>
                    <td colSpan="6">No employees found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
