import React from "react";
import { useNavigate } from "react-router-dom";

import { AuthPage } from "../auth/authPage.jsx";
import { Home } from "./home.js";

const logout = () => {
  window.localStorage.removeItem("token");
};

export const DemoAuth = () => {
	const navigate = useNavigate();

	const logoutUser = () => {
		logout(() => navigate("/login"));
	};

	return (
		<AuthPage>
			<Home />
		</AuthPage>
	);
};