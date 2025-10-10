import { useContext, useState } from "react";
import { useFetchApi } from "../hooks/UseFetchApi";
import { AuthContext } from "../components/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import './LoginPage.css';
import { NavLink } from "react-bootstrap";


export function LoginPage() {

    const {login} = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { data: users, loading: usersLoading, error: usersError } = useFetchApi("http://localhost:8000/users");
          
    if (usersLoading ) return <p>Loading...</p>;
    if (usersError) return <p>Error: {usersError}</p>;

   
    const handleLogin = (e) =>{
        e.preventDefault();
        const foundUser = users.find(
            u => u.email === email && u.password === password
        );
        if (foundUser) {
            login(foundUser);
            navigate("/"); 
        } else {
            alert("Invalid email or password");
        }
    };
      
    return (
<>
  <div className="login-container">
    <div className="login-left">
      <div className="login-card">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleLogin}>
          <label>Email: </label>
          <input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password: </label>
          <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? 
        <Link to="/register" >Register here</Link></p>
      </div>
    </div>
  </div>
  </>
);
}