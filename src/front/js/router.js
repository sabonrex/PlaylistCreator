import React, { useContext } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Home } from "./pages/home";
import { MainView } from "./pages/mainView.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import { Login } from "./pages/login.jsx";
import { Signup } from "./pages/signup.jsx";
import injectContext, { Context }  from "./store/appContext";

import { Navibar } from "./component/navbar.jsx";
import { CarouselFooter } from "./component/carouselFooter.jsx";

import { playlist } from "../js/component/testDataAlbuns";

const Layout = () => {
  const { store } = useContext(Context);
  return (
    <>
      <Navibar />
      <div className="h-100 w-100" style={{ backgroundColor: "#1D2343" }}>
        <Outlet />
      </div>
      <CarouselFooter tracks={store.randomPlaylist} />
    </>
  );
};

//create your first component
const Router = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route element={<Layout />} path="">
              <Route element={<MainView />} path="/" />
              <Route element={<Demo />} path="/demo" />
              <Route element={<Signup />} path="/signup" />
              <Route element={<Login />} path="/login" />
              <Route element={<Single />} path="/single/:theid" />
              <Route element={<h1>Not found!</h1>} path="*" />
            </Route>
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Router);
