/* eslint-disable react/prop-types */

function Delete({employeeId,fetchData}) {

  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend to delete the employee
      await fetch(`http://localhost:3000/api/employee/${employeeId}`, {
        method: "DELETE",
      });
      // Refetch the data after successful deletion
      fetchData();
    } catch (error) {
      console.error("Failed to delete employee:", error);
    }
  };
  return (
    <div>
      <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
      >Delete</button>
      
    </div>
  )
}

export default Delete
