import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_baseurl;

export default function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function auth() {
      try {
        const result = await axios.get(`${BASE_URL}/user/verify`, { withCredentials: true });

        // console.log(result);
        if (result.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error(err);
      }
    }

    auth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-950 text-indigo-400">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
