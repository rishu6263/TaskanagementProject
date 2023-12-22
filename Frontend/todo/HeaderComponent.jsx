import {Link } from "react-router-dom"
import { useAuth } from "./security/AuthContext";
function HeaderComponent(){
    const authContext=useAuth();
    const isAuthenticated=authContext.isAuthenticated;
   
    function logout(){
        authContext.logout();
    }
    return(
        <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <a className="navbar-brand ms-2 fs-2 fw-bold text-black" >Your Task Manager</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-20 btn">
                                    {isAuthenticated && <Link className="btn btn-warning" to="/welcome">Home  </Link>}
                                </li>
                                <li className="nav-item fs-25 btn ">
                                {isAuthenticated && <Link className="btn btn-success" to="/todos-list">Todos</Link>}  
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                                <li className="nav-item fs-14 btn ">
                                {!isAuthenticated && <Link className=" btn btn-success" to="/login">Login</Link>}
                                </li>
                                <li className="nav-item fs-15 btn">
                                {isAuthenticated && <Link className=" btn btn-warning" to="/logout" onClick={logout}>Logout</Link>}     
                                </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}
export default HeaderComponent