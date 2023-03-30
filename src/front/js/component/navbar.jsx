import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'

export const Navibar = () => {
	return (
		<nav className="navbar navbar-light bg-DarkBlue px-5" style={{borderBottom: "3px solid #D74390"}}>
			<div className="container-fluid align-items-center">
				<div className="col-3 justify-content-start py-0">	
					<Nav.Link href="/"><h1>Aleatorium</h1></Nav.Link>
				</div>

				<div className="d-flex col-3 justify-content-center">
					<Nav.Link className="navv" href="/">Home</Nav.Link>
					<Nav.Link className="navv" href="/favourites">Favourites</Nav.Link>	
				</div>
						
				<nav className="d-flex col-3 justify-content-end align-items-center">
					<Nav.Link href="/login">Login in</Nav.Link>
					<h1>/</h1>
					<Nav.Link href="/signup">Sign Up</Nav.Link>
				</nav>
			</div>
		</nav>
	);
};
