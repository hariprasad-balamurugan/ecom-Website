// src/components/Navbar.jsx
import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar as BSNavbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap'; // Renamed to avoid conflict

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <BSNavbar style={{backgroundColor: 'rgba(132, 100, 61, 1)'}} variant="dark" expand="lg" >
      <Container className='container-fluid' style={{
        backgroundColor: 'rgba(132, 100, 61, 1)', // Darker, rich brown/gold tone for classic feel
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',   // Subtle shadow for depth
        padding: '0.8rem 1rem'  ,
        width:"100%"                 // Slightly more vertical padding
      }}>
        <BSNavbar.Brand as={Link} to="/" style={{fontFamily:"georgia",letterSpacing:"1.4px",fontSize:"25px"}}>E-Shop</BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BSNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            {user && <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>}
            {user && <Nav.Link as={Link} to="/cart">My Cart</Nav.Link>}
            {/* You can add more public links here if needed */}
          </Nav>
          
          <Nav>
            {user ? (
              <NavDropdown title={`Welcome, ${user.displayName || user.email}`} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/dashboard">My Dashboard</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  );
};

export default Navbar;