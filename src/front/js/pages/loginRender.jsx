import React from "react";
import { Link } from "react-router-dom";

import "../../styles/index.css";

export const LoginRender = ({handleSubmit, handleChange}) => {

  return (
    <section className="h-100 gradient-form">
        <div className="container py-3 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-8">
                    <div className="text-black">
                        <div className="row g-0">
                            <div className="col-lg-10 mx-auto">
                                <div className="card-body p-md-5 mx-md-4">

                                    <div className="text-center">
                                        <img src="https://imgs.search.brave.com/UfC6-MLkfsyxAgc4DSVbUYt4tkHJZwJ7MSVhaJXY-zY/rs:fit:512:512:1/g:ce/aHR0cHM6Ly93d3cu/aWNvbnNkYi5jb20v/aWNvbnMvZG93bmxv/YWQvZ3VhY2Ftb2xl/LWdyZWVuL211c2lj/LXJlY29yZC01MTIu/cG5n"
                                            style={{"width": "100px"}} alt="logo"/>
                                        <h2 className="mt-1 mb-5 pb-1">Welcome Back</h2>
                                    </div>

                                    <form className="form-background" name="login" onSubmit={handleSubmit}>
                                        <div className="form-outline">
                                            <label className="form-label form-input-label" htmlFor="username">Username</label>
                                            <input 
                                                type="text" 
                                                id="username" 
                                                className="form-control form-input-field" 
                                                placeholder="Insert your username"
                                                onChange={handleChange} />
                                        </div>

                                        <div className="form-outline">
                                            <label className="form-label form-input-label" htmlFor="password">Password</label>
                                            <input 
                                                type="password" 
                                                id="password" 
                                                className="form-control form-input-field" 
                                                placeholder="Insert your password" 
                                                onChange={handleChange} />
                                        </div>

                                        <div className="text-center pt-1 mb-5 p-1">
                                            <button className="btn btn-success btn-lg gradient-custom-2 m-3" type="submit">Login</button>
                                            <a className="text-muted m-3" href="#!">Forgot password?</a>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-center pb-4">
                                            <p className="mb-0 me-2">Don't have an account?</p>
                                            <Link to={'/signup'}><span className="btn btn-outline-success">Create new</span></Link>
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