import { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";
import Delete from "./Delete";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("all");
  const [sortCriteria, setSortCriteria] = useState("name");

  useEffect(() => {
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

  const filteredEmployees = employees.filter((employee) => {
    const nameMatch = employee.f_Name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const filterMatch =
      filterCriteria === "all" ||
      employee.f_gender === filterCriteria ||
      employee.f_Course === filterCriteria ||
      employee.f_Designation === filterCriteria;
    return nameMatch && filterMatch;
  });

  const sortedEmployees = filteredEmployees.sort((a, b) => {
    if (sortCriteria === "name") {
      return a.f_Name.localeCompare(b.f_Name);
    } else if (sortCriteria === "createDate") {
      return new Date(a.f_Createdate) - new Date(b.f_Createdate);
    } else if (sortCriteria === "designation") {
      // Added sorting by designation
      return a.f_Designation.localeCompare(b.f_Designation);
    }
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCriteria(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl font-bold mb-4 text-center">Employee List</h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-4 py-2"
        />
        <select
          value={filterCriteria}
          onChange={handleFilterChange}
          className="ml-2 border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="all">All</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <select
          value={sortCriteria}
          onChange={handleSortChange}
          className="ml-2 border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="name">Name</option>
          <option value="createDate">Create Date</option>
          <option value="designation">Designation</option>
        </select>
      </div>
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
          {sortedEmployees.map((employee) => (
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
