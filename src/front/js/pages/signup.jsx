import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import { SignupRender } from "./signupRender.jsx";

export const Signup = () => {
  const { store } = useContext(Context);

  const [inputVal, setInputVal] = useState({});

  const navigate = useNavigate();

  // control the variables email and password
  const handleChange = (e) => {
    setInputVal({
        ...inputVal,
        [e.target.id]: e.target.value
    })
  }

  // submit the new 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const signupUrl = store.apiUrl + "/api/signup";

    const requestNewUser = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: inputVal.username,
        email: inputVal.email,
        password: inputVal.password,
      }),
    };

    const resp = await fetch(signupUrl, requestNewUser).catch(() => false);

    if (!resp) return window.alert("There's been a problem with the request");

    //window.alert("User created");
    navigate("/login")

  }

  return <SignupRender handleSubmit={handleSubmit} handleChange={handleChange} />;
}