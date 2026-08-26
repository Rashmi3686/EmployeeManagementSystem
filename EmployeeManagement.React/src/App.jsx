import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://localhost:7030/api/Employee";

const departments = [
  { id: 1, name: "HR" },
  { id: 2, name: "IT" },
  { id: 3, name: "Finance" },
  { id: 4, name: "Sales" },
  { id: 5, name: "Marketing" },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    salary: "",
    joiningDate: "",
    isActive: true,
    departmentId: "",
  });

  // ================================
  // GET EMPLOYEES
  // ================================

  const loadEmployees = () => {
    setLoading(true);

    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }

        return response.json();
      })
      .then((data) => {
        setEmployees(data);
        setError("");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employees:", error);
        setError("Unable to load employees.");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadEmployees();
  }, []);


 // ================================
// SEARCH & FILTER
// ================================

const filteredEmployees = employees.filter((employee) => {
  const matchesSearch =
    employee.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    employee.email
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesDepartment =
    selectedDepartment === "" ||
    employee.departmentName === selectedDepartment;

  return matchesSearch && matchesDepartment;
});

const clearFilters = () => {
  setSearchTerm("");
  setSelectedDepartment("");
};
  // ================================
  // HANDLE INPUT
  // ================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================================
  // OPEN ADD FORM
  // ================================

  const handleAddClick = () => {
    setEditingId(null);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      salary: "",
      joiningDate: "",
      isActive: true,
      departmentId: "",
    });

    setShowForm(true);
  };

  // ================================
  // EDIT EMPLOYEE
  // ================================

  const handleEdit = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error("Unable to get employee");
      }

      const employee = await response.json();

      setEditingId(id);

      setFormData({
        firstName: employee.firstName || "",
        lastName: employee.lastName || "",
        email: employee.email || "",
        phoneNumber: employee.phoneNumber || "",
        salary: employee.salary || "",
        joiningDate: employee.joiningDate
          ? employee.joiningDate.substring(0, 10)
          : "",
        isActive: employee.isActive ?? true,
        departmentId: employee.departmentId || "",
      });

      setShowForm(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
      alert("Unable to load employee.");
    }
  };

  // ================================
  // DELETE EMPLOYEE
  // ================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete employee");
      }

      alert("Employee deleted successfully.");

      loadEmployees();
    } catch (error) {
      console.error(error);
      alert("Unable to delete employee.");
    }
  };

  // ================================
  // SAVE / UPDATE EMPLOYEE
  // ================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.departmentId) {
      alert("Please select a department.");
      return;
    }

    const employeeData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      salary: Number(formData.salary),
      joiningDate: formData.joiningDate,
      isActive: formData.isActive,
      departmentId: Number(formData.departmentId),
    };

    try {
      let response;

      if (editingId) {
        // UPDATE
        response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        });
      } else {
        // ADD
        response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employeeData),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();

        console.error("API Error:", errorText);

        throw new Error("Unable to save employee");
      }

      alert(
        editingId
          ? "Employee updated successfully."
          : "Employee added successfully."
      );

      setShowForm(false);
      setEditingId(null);

      loadEmployees();
    } catch (error) {
      console.error("Error saving employee:", error);

      alert(
        editingId
          ? "Unable to update employee."
          : "Unable to add employee."
      );
    }
  };

  // ================================
  // CANCEL FORM
  // ================================

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="app-container">

      {/* HEADER */}

      <header className="page-header">
        <div>
          <h1>Employee Management System</h1>
          <p>Manage your employees efficiently</p>
        </div>
      </header>

      {/* MAIN */}

      <main className="content">

        {/* SECTION HEADER */}

        <div className="section-header">

          <div>
            <h2>Employees</h2>

            <p className="subtitle">
              View and manage employee information
            </p>
          </div>

          <button
            className="add-button"
            onClick={handleAddClick}
          >
            + Add Employee
          </button>

        </div>
{/* SEARCH & FILTER */}

<div className="filter-container">

  <input
    type="text"
    className="search-input"
    placeholder="Search by name or email..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

  <select
    className="department-filter"
    value={selectedDepartment}
    onChange={(e) => setSelectedDepartment(e.target.value)}
  >
    <option value="">All Departments</option>

    {departments.map((department) => (
      <option key={department.id} value={department.name}>
        {department.name}
      </option>
    ))}
  </select>

  <button
    type="button"
    className="clear-filter-button"
    onClick={clearFilters}
  >
    Clear
  </button>

</div>
        {/* FORM */}

        {showForm && (
          <div className="employee-form">

            <h2>
              {editingId ? "Edit Employee" : "Add Employee"}
            </h2>

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />

              <input
                type="number"
                name="salary"
                placeholder="Salary"
                value={formData.salary}
                onChange={handleChange}
                required
              />

              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                required
              />

              {/* DEPARTMENT */}

              <select
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              >
                <option value="">
                  Select Department
                </option>

                {departments.map((department) => (
                  <option
                    key={department.id}
                    value={department.id}
                  >
                    {department.name}
                  </option>
                ))}
              </select>

              {/* ACTIVE */}

              <label className="active-checkbox">

                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />

                Active Employee

              </label>

              {/* BUTTONS */}

              <div className="form-buttons">

                <button
                  type="submit"
                  className="save-button"
                >
                  {editingId
                    ? "Update Employee"
                    : "Save Employee"}
                </button>

                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

              </div>

            </form>

          </div>
        )}

        {/* LOADING */}

        {loading && (
          <div className="message">
            Loading employees...
          </div>
        )}

        {/* ERROR */}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
<div className="employee-count">
  Showing <strong>{filteredEmployees.length}</strong> of{" "}
  <strong>{employees.length}</strong> employees
</div>
        {/* TABLE */}

        {!loading && !error && (
          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Department</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {filteredEmployees.map((employee) => (

                  <tr key={employee.id}>

                    <td>{employee.id}</td>

                    <td>
                      {employee.fullName}
                    </td>

                    <td>
                      {employee.email}
                    </td>

                    <td>
                      {employee.departmentName}
                    </td>

                    <td>
                      ₹
                      {employee.salary?.toLocaleString(
                        "en-IN"
                      )}
                    </td>

                    <td className="actions">
  <button
    type="button"
    className="edit-button"
    onClick={() => handleEdit(employee.id)}
  >
    Edit
  </button>

  <button
    type="button"
    className="delete-button"
    onClick={() => handleDelete(employee.id)}
  >
    Delete
  </button>
</td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </main>

    </div>
  );
}

export default App;