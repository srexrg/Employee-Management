import {Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from "react-hot-toast";
import Login from './components/Login'
import { useAuthContext } from './context/AuthContext';
import Home from './components/Home';
import EmployeeList from './components/Employees';
import Create from './components/Create';
// import { Navbar } from './components/Navbar';



function App() {
  const { authUser } = useAuthContext();

  return (
    <>
    
    
    <Routes>
      <Route 
      path='/login'
      element={authUser ? <Navigate to={"/"} /> : <Login/>}
      />
      <Route 
      path='/'
      element={authUser ? <Home /> : <Navigate to={"/login"} />}
      />
      <Route 
      path='/employees'
      element={authUser ? <EmployeeList /> : <Navigate to={"/login"} />}
      />
      <Route 
      path='/create'
      element={authUser ? <Create /> : <Navigate to={"/login"} />}
      />
      <Route/>
    </Routes>
    <Toaster />
    </>
  )
}

export default App
