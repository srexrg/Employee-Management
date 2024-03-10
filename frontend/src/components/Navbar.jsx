
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import useLogout from "../hooks/useLogout";


export const Navbar = () => {
  const { loading, logout } = useLogout();
  const { authUser } = useAuthContext();
  return (
    <div className="shadow h-14 flex justify-between items-center px-4">
      <div className="text-lg font-semibold">
        <Link to="/">
        Employee Management
        </Link>
        </div>
      <div className="flex items-center">
        <div className="mr-4">Hello, {authUser.username}</div>
        {!loading ? (
          <button
            onClick={logout}
            className="rounded bg-red-500  hover:bg-red-600 text-white px-4 py-2"
          >
            Logout
          </button>
        ) : (
          <span className="loading loading-spinner"></span>
        )}
      </div>
    </div>
  );
};
