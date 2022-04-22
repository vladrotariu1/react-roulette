import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

export function Navbar() {
    return(
        <nav className='navbar'>
            <Link className='navbar-link home' to={'/'}>Home</Link>
            <Link className='navbar-link' to={'/register'}>Register</Link>
            <Link className='navbar-link' to={'/login'}>Login</Link>
        </nav>
    );
}