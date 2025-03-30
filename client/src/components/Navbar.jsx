import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-4 flex justify-between shadow-lg">
      <h1 className="text-2xl font-bold">Movie Booking System</h1>
      <div className="flex gap-6">
        <Link to="/home" className="text-lg font-medium hover:underline">
          Home
        </Link>
        <Link to="/login" className="text-lg font-medium hover:underline">
          Login
        </Link>
        <Link to="/signup" className="text-lg font-medium hover:underline">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;