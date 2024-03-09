import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";

import GenderCheckbox from "./GenderCheckbox";

const EditEmployee = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    f_Image: null,
  });

  useEffect(() => {
    fetchEmployee();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/employee/${employeeId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch employee");
      }
      const data = await res.json();
      setInputs(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch employee");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, f_gender: gender });
  };

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleImage = (e) => {
    setInputs({ ...inputs, f_Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("f_Name", inputs.f_Name);
    formData.append("f_Email", inputs.f_Email);
    formData.append("f_Mobile", inputs.f_Mobile);
    formData.append("f_Designation", inputs.f_Designation);
    formData.append("f_gender", inputs.f_gender);
    formData.append("f_Course", inputs.f_Course);
    formData.append("f_Image", inputs.f_Image); // Append file data

    try {
      const res = await fetch(
        `http://localhost:3000/api/employee/edit/${employeeId}`,
        {
          method: "PATCH",
          body: formData,
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Employee updated successfully");
        navigate("/employees");
      } else {
        throw new Error(data.message || "Failed to update employee");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update employee");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Edit Employee</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="f_Name"
            value={inputs.f_Name}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="f_Email"
            value={inputs.f_Email}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mobile No:</label>
          <input
            type="tel"
            name="f_Mobile"
            value={inputs.f_Mobile}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Designation:</label>
          <select
            name="f_Designation"
            value={inputs.f_Designation}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Gender:</label>
          <GenderCheckbox
            onCheckboxChange={handleCheckboxChange}
            selectedGender={inputs.f_gender}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Courses:</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="f_Course"
                value="MCA"
                checked={inputs.f_Course.includes("MCA")}
                onChange={handleCourseChange}
                className="mr-2"
              />
              MCA
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="f_Course"
                value="BCA"
                checked={inputs.f_Course.includes("BCA")}
                onChange={handleCourseChange}
                className="mr-2"
              />
              BCA
            </label>
            <label className="ml-4">
              <input
                type="checkbox"
                name="f_Course"
                value="BSC"
                checked={inputs.f_Course.includes("BSC")}
                onChange={handleCourseChange}
                className="mr-2"
              />
              BSC
            </label>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Profile Image:</label>
          <input
            type="file"
            name="f_Image"
            accept=".png, .jpeg, .jpg"
            onChange={handleImage}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
