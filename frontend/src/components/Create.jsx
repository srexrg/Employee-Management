import { useState } from "react";
import toast from "react-hot-toast";
import GenderCheckbox from "./GenderCheckbox";

const Create = () => {
  const [inputs, setInputs] = useState({
    f_Name: "",
    f_Email: "",
    f_Mobile: "",
    f_Designation: "",
    f_gender: "",
    f_Course: "",
    f_Image: null, // Change the initial value to null for the file input
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, f_gender: gender });
  };


  const handleImage = (e) =>{
    setInputs({...inputs,f_Image:e.target.files[0]})
    console.log(inputs.f_Image)
  }

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
      const res = await fetch("http://localhost:3000/api/employee/create", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success("Employee created successfully");
        // Clear form fields after successful submission if needed
        // setInputs({
        //   f_Name: "",
        //   f_Email: "",
        //   f_Mobile: "",
        //   f_Designation: "",
        //   f_gender: "",
        //   f_Course: "",
        //   f_Image: null, // Reset file input
        // });
      } else {
        throw new Error(data.message || "Failed to create employee");
      }
    } catch (error) {
      toast.error(error.message || "Failed to create employee");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl mb-4">Create Employee</h2>
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
          <input
            type="text"
            name="f_Designation"
            value={inputs.f_Designation}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
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
          <input
            type="text"
            name="f_Course"
            value={inputs.f_Course}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
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
          Create
        </button>
      </form>
    </div>
  );
};

export default Create;
