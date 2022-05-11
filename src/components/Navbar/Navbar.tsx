import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../../state/stateContext";
import "./Navbar.css"

export function Navbar() {
    const { state }  = useAppState();

    return(
        <nav className='navbar'>
            <Link className='navbar-link home' to={'/'}>Home</Link>
            { 
                !state?.userLoggedIn ? 
                <>
                    <Link className='navbar-link' to={'/register'}>Register</Link>
                    <Link className='navbar-link' to={'/login'}>Login</Link>
                </> :
                <Link className='navbar-link' to={'/login'}>{ state?.userDetails?.email }</Link>
            }
        </nav>
    );
}