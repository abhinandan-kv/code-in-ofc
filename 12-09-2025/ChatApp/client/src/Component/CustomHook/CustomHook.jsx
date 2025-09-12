import axios from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_baseurl;

export async function useAuth() {
  const [token, setToken] = useState(() => {
    const result = localStorage.getItem("token");
    return result ? result : null;
  });
  const [path, setPath] = useState(null);

  console.log("token from useAuth= ", token);

  useEffect(() => {
    async function verify() {
      try {
        const result = await axios.get(`${BASE_URL}/user/verify`, { withCredentials: true });

        if (result.status === 200) {
          setPath(() => "/chat");
        } else {
          setPath(() => "/login");
        }
      } catch (err) {
        console.error(err);
      }
    }

    verify();
  }, [token]);

  console.log("path", path);

  return path;
}
