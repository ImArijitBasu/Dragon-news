import { Link } from "react-router-dom";
import userIcon from "../assets/user.png";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const Navbar = () => {
  const {user,logout} = useContext(AuthContext)
  return (
    <div className="flex justify-between items-center">
      <div className="font-bold text-blue-500">{user && user.displayName}</div>
      <div className="nav space-x-5">
        <Link to="/">Home</Link>
        <Link to="/career">Career</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="login flex gap-2 items-center">
        <div className="rounded-full ">

          <img className="w-12 h-12 object-cover rounded-full" src={user && user?.email ? user.photoURL : userIcon} alt="" />
        </div>
        {user && user?.email ? <button className="btn btn-neutral rounded-none" onClick={logout}>Logout</button> : (<Link to="/auth/login" className="btn btn-neutral rounded-none">Login</Link>)}
        
      </div>
    </div>
  );
};

export default Navbar;
