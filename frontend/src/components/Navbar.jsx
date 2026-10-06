import React from "react"; 
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="Navbar">
        <div className="navbar-brand">
            <Link to="/">
            <img src='' alt="ShopNest Logo" className="navbar-logo" />
            ShopNest</Link>
        </div>
        <ul className="navbar-links">
            <li><Link to="/shop">shop</Link></li>
            <li><Link to="/cart">cart</Link></li>
            <li><Link to="/profile">profile</Link></li>   
        </ul>
    </nav>
  )
}

export default Navbar