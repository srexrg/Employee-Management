import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-blue-200 rounded-lg p-20 mb-8">
          <h1 className="text-5xl">Welcome to Dashboard</h1>
        </div>
        <div className="flex">
          <Link
            to="/employees"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
          >
            Employee List
          </Link>
          <Link
            to="/create"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Create an Employee
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
