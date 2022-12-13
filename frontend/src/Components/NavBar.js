import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {

  return( <nav>

   <NavLink to={'/'} className={isActive =>
    (!isActive ? " unselected" : "active")}>
    <button>Signup</button>
    </NavLink>    
   <NavLink to={'/login'} className={isActive =>
    (!isActive ? " unselected" : "active")}><button>Login</button></NavLink>
  
  </nav>
  )
}

export default NavBar;