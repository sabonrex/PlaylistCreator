import React, { useEffect, useState } from "react";
import { getToken } from "./getToken";

const API_URL = process.env.BACKEND_URL;
const API_URL_CHECK = API_URL + "/api/auth/check";

// fetch request to check if the user is correctly authenticated and if the token is valid
const checkUser = async (token) => {
  const checkResponse = await fetch(API_URL_CHECK, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(() => false);

  if (!checkResponse || !checkResponse.ok) return false;

  return true;
};

// customized useState hook to get the User Authentication State
export const useUserAuth = (token) => {
  const [state, setState] = useState(() => ({
    user: null,
    loading: true,
  }));

  const checkUserAuth = async () => {
    const isUserLoggedIn = await checkUser(token);

    if (!isUserLoggedIn)
      return setState((prev) => ({ ...prev, loading: false }));

    setState((prev) => ({
      ...prev,
      user: true,
      loading: false,
    }));
  };

  useEffect(() => {
    checkUserAuth();
  }, [token]);

  return state;
};

// customized hook that returns True if the user is authenticated and False otherwise
export const useUserIsAuth = () => {
  const token = getToken();
  const { user, loading } = useUserAuth(token);

  return !loading && user;
};
