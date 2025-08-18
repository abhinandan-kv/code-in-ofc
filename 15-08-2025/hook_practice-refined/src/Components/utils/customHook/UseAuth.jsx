import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TOKEN_ENDPOINT = "http://localhost:9000/user/verify";
const BEARER_TOKEN = localStorage.getItem("token");

// //expired token for verification
// const BEARER_TOKEN =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6InVzZXIxIiwiZW1haWwiOiJhQGdtYWlsLmNvbSIsImlhdCI6MTc1NTE2NjM1NywiZXhwIjoxNzU1MTg3OTU3fQ.dkg2Ov8jbM00KBuy0IEfBbIC9AnryK7zhgOK7D5Bwm0";

export default function useAuth() {
  const navigate = useNavigate();
  const [logged, setLogged] = useState(false);

  try {
    axios
      .get(TOKEN_ENDPOINT, { headers: { Authorization: `Bearer ${BEARER_TOKEN}` } })
      .then((data) => {
        console.log(data);
        setLogged(true);
        navigate("/");
      })
      .catch((err) => {
        console.error("ERROR:- ", err.response.data);
        setLogged(false);
      });
  } catch (err) {
    console.error(err);
  }
  return logged
}
