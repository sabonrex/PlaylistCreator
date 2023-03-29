import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'

export const Navibar = () => {
	return (
		<navv className="navbar navbar-light bg-DarkBlue">
			<div className="container">
				<h1>Aleatorium</h1>
				 
				<Link to="/home">
					<span className="navbar-brand mb-0 h1">Home</span>
				</Link>
				<Link to="/favorite">
					<span className="navbar-brand mb-0 h1">Favorite</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					
				</div>
			</div>
		</navv>
	);
};
