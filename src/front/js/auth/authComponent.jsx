import React from "react";
import { useUserIsAuth } from "./useUserAuth";

// wrapper component that hides the child component if hide=True
const Hidden = ({ hide, children }) => {
  if (hide) return null;

  return <>{children}</>;
};

// wrapper component that hides the child component when the user is not authenticated
export const AuthComponent = ({ children }) => {
  const isAuth = useUserIsAuth();

  return <Hidden hide={!isAuth}>{children}</Hidden>;
}