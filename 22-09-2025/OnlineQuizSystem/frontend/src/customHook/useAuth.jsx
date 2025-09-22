import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    function checkAuth() {
      try {
        const res = axios.get(`${BASEURL}/api/v1/auth/verify`, { withCredentials: true });

        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    return checkAuth();
  }, []);

  console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated;
}

export { useAuth };
