import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./useUserAuth";
import { getToken } from "./getToken";

// wrapper component 
export const AuthPage = ({ children }) => {
  const navigate = useNavigate();

  const token = useMemo(() => getToken(), []);
  const { user, loading } = useUserAuth(token);

  // if the user is null and the page is still loading (loading=true)
  if (!user && loading) return <h1>... loading</h1>;
  
  // if the user is still null after the page has loaded (loading=false)
  if (!user && !loading) navigate("/login");

  return children;
};
