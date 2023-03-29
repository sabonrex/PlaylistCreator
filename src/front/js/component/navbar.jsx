import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'

export const Navibar = () => {
	return (
		<nav className="navbar navbar-light bg-DarkBlue">
			<div className="container">
				<h1>Aleatorium</h1>
				<Nav.Link to="/home">Home</Nav.Link>
				<Nav.Link to="/favorite">Favorite</Nav.Link>
				<div className="ml-auto">
				<Nav>
            <Nav.Link href="#login">Login in</Nav.Link>
			<h1>/</h1>
            <Nav.Link href="#signup">Sign Up</Nav.Link>
          </Nav>
					
				</div>
			</div>
		</nav>
	);
};
