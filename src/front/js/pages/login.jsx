import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";
import { LoginRender } from "./loginRender.jsx";

export const Login = () => {
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

  // login into the app
  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginUrl = store.apiUrl + "login"

    const requestUser = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: inputVal.email,
          password: inputVal.password,
        }),
    };

    const resp = await fetch(loginUrl, requestUser).catch(() => false);
    if (!resp) return window.alert("There's been a problem with the request");

    const jsonResp = await resp.json()
    if ([400, 401, 402, 403].includes(resp.status)) return window.alert(jsonResp.msg);
    
    console.log("response: ", jsonResp)

    if (resp.status == 201) {
        window.sessionStorage.setItem("token", jsonResp.token);
        navigate("/private");
    }

  }

  return <LoginRender handleSubmit={handleSubmit} handleChange={handleChange} />;
};