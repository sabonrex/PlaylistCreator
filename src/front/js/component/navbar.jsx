import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Navibar = () => {
	return (
		<>
		<Navbar sticky="top" collapseOnSelect expand="lg" bg="solid" variant="dark" 
		style={{backgroundColor: "#1D2343", borderBottom: "3px solid #D74390"}}>
			<Container>
				<Nav className="me-auto">
					<Nav.Link className="navv ms-auto" href="/">
						<h1>Aleatorium</h1>
					</Nav.Link>
				</Nav>

				<Navbar.Toggle className="navbar_toggle_button" aria-controls="responsive-navbar-nav">
					<FontAwesomeIcon icon={faBars} />
				</Navbar.Toggle>
				<Navbar.Collapse id="responsive-navbar-nav">

				<Nav className="text-end ms-auto">
					<Nav.Link className="navv mt-auto" href="/">Home</Nav.Link>
					<Nav.Link className="navv ms-4 mt-auto" href="/favourites">Favourites</Nav.Link>
				</Nav>

				<Nav>
					<div className="d-flex ms-3">
						<Nav.Link className="navv ms-auto" href="/signup">Sign Up</Nav.Link>
						<Nav.Item className="navv mx-2 mt-2"><h4>/</h4></Nav.Item>
						<Nav.Link className="navv" href="/login">Log In</Nav.Link>
					</div>	
				</Nav>

				</Navbar.Collapse>
			</Container>
		</Navbar>
		</>
	);
};
