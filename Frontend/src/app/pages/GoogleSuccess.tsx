import { useEffect } from "react";
import { useNavigate } from "react-router";

export function GoogleSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    }
  }, []);

  return <h2>Logging you in...</h2>;
}