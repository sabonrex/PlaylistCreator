import React from "react";
import { Link } from "react-router-dom";

import "../../styles/index.css";

export const LoginRender = ({handleSubmit, handleChange}) => {

  return (
    <section className="h-100 gradient-form" style={{"backgroundColor": "#eee"}}>
        <div className="container py-3 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-8">
                    <div className="card rounded-3 text-black">
                        <div className="row g-0">
                            <div className="col-lg-10 mx-auto">
                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                            style={{"width": "185px"}} alt="logo"/>
                                        <h4 className="mt-1 mb-5 pb-1">The Lotus Team</h4>
                                    </div>

                                    <form name="login" onSubmit={handleSubmit}>
                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="email">Username</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                className="form-control" 
                                                placeholder="Insert your email"
                                                onChange={handleChange} />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <input 
                                                type="password" 
                                                id="password" 
                                                className="form-control" 
                                                placeholder="Insert your password" 
                                                onChange={handleChange} />
                                        </div>

                                        <div className="text-center pt-1 mb-5 pb-1">
                                            <button className="btn btn-primary btn-lg gradient-custom-2 m-3" type="submit">Login</button>
                                            <a className="text-muted m-3" href="#!">Forgot password?</a>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-center pb-4">
                                            <p className="mb-0 me-2">Don't have an account?</p>
                                            <Link to={'/signup'}><span className="btn btn-outline-danger">Create new</span></Link>
                                        </div>
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};