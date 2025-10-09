import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();

    const {logout} = useContext(AuthContext);
    logout();
    navigate("/");
}