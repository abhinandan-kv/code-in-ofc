import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const BASEURL = import.meta.env.VITE_BACKEND_URL;

function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get(`${BASEURL}/api/v1/auth/verify`, { withCredentials: true });
        // console.log(res);
        if (res.status === 200) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

    checkAuth();
  }, []);

  // console.log("isAuthenticated", isAuthenticated);

  return isAuthenticated;
}

export { useAuth };
