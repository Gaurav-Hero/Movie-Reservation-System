import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    // Optionally decode token or fetch user profile from API
    setUser({ name: "Gaurav", role: "user" }); // placeholder
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Movie Booking System 🎬</h1>
      <p className="mt-2">Enjoy browsing movies and book your favorite seats!</p>
    </div>
  );
}
