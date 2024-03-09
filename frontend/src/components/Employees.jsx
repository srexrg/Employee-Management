import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch data from backend when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/employee");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    setEmployees(data);
  };

  const handleEdit = (id) => {
    // Handle edit action
    console.log("Edit employee with id:", id);
  };

  const handleDelete = (id) => {
    // Handle delete action
    console.log("Delete employee with id:", id);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center">Employee List</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Course</th>
            <th className="border px-4 py-2">Designation</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Create Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="border px-4 py-2">{employee._id}</td>
              <td className="border px-4 py-2">{employee.f_Name}</td>
              <td className="border px-4 py-2">{employee.f_gender}</td>
              <td className="border px-4 py-2">{employee.f_Course}</td>
              <td className="border px-4 py-2">{employee.f_Designation}</td>
              <td className="border px-4 py-2">{employee.f_Mobile}</td>
              <td className="border px-4 py-2">{employee.f_Email}</td>
              <td className="border px-4 py-2">
                {employee.f_Createdate.split("T")[0]}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(employee.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
