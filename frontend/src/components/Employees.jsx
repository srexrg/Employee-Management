import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import Delete from "./Delete";

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

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center">Employee List</h1>
      <Link
        to="/create"
        className="bg-red-500 hover:bg-red-700 text-white mx-10 font-bold py-2 px-4 rounded"
      >
        Add Employee
      </Link>
      <table className="w-full mt-5">
        <thead>
          <tr>
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">Image</th>
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
            <tr key={employee._id}>
              <td className="border px-4 py-2">{employee._id}</td>
              <td className="border px-4 py-2">
                <img
                  src={`http://localhost:3000/assets/${employee.f_Image}`}
                  alt="Employee Image"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </td>
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
                <Link
                  to={`/edit/${employee._id}`}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Edit
                </Link>
                <Delete employeeId={employee._id} fetchData={fetchData} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;
