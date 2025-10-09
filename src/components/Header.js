import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const Header = () => {
  const {user} = useContext(AuthContext);
  console.log(user);
  
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
       <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/login">Sign in</a>
        </li>
       
      </ul>
      <form className="d-flex" role="search">
       
        <a href="/addBlog"className="btn btn-outline-light" type="submit">Write</a>
      </form>
    </div>
  </div>
</nav>
 
    </>
  )
}