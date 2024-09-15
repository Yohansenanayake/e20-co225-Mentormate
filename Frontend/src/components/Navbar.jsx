import React from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const navigate = useNavigate(); // Initialize the navigate function

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to);
        const isActive = useMatch({ path: resolvedPath.pathname, end: true });

        return (
            <li className={isActive ? "active" : ""}>
                <Link to={to} {...props}>{children}</Link>
            </li>
        );
    }

    return (
        <nav className='navbar'>
            <Link to='/' className='app-name'>MentorMate</Link>
            <ul>
                <CustomLink to='/explore'>Explore</CustomLink>
                <CustomLink to='/account'>Account</CustomLink>
                <li onClick={() => navigate('/login')} className="login-link">
                    Login
                </li>
                <CustomLink to='/signup'>Signup</CustomLink>
            </ul>
        </nav>
    );
}

export default Navbar;
