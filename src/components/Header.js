import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const Header = () => {
  const {user} = useContext(AuthContext);
  
  return (
    <>
 
<nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Blog</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        {
          user ? <>
          <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/create">Write</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/logout">Logout</a>
        </li></>
          :
          <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="/login">Sign in</a>
          </li>
        }
       
        
       
      </ul>
    </div>
  </div>
</nav>
 
    </>
  )
}