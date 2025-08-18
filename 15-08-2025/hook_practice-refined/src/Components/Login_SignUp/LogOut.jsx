import { useNavigate } from "react-router-dom";

export default function LogOut() {
  const navigate = useNavigate();

  localStorage.clear();
  navigate("/");
}
