/* eslint-disable no-unused-vars */
import { useState } from "react";
import toast from "react-hot-toast";

const useCreate = () => {
  const [loading, setLoading] = useState(false);

  const create = async ({
    name,
    email,
    designation,
    mobile,
    gender,
    course,
    image,
  }) => {
    const success = handleInput({
      name,
      email,
      designation,
      mobile,
      gender,
      course,
    });

    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/employee/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          f_Name: name,
          f_Email: email,
          f_Designation: designation,
          f_Mobile: mobile,
          f_gender: gender,
          f_Course: course,
          // f_Image: image,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      console.log(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, create };
};

export default useCreate;

function handleInput({ name, email, designation, mobile, gender, course }) {
  if (!name || !email || !designation || !mobile || !gender || !course) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
}
