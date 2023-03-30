import React from "react";
import { Link } from "react-router-dom";

import "../../styles/index.css";

export const SignupRender = ({ handleChange, handleSubmit }) => {
  return (
    <section className="h-100 gradient-form" >
    <div className="container py-3 bg h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-8">
          <div>
            <div className="row g-0">
              <div className="col-lg-10 mx-auto">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h1 className="mt-1 mb-5 pb-1">
                      Sign Up
                    </h1>
                  </div>
                  <form name="signup" onSubmit={handleSubmit}>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Insert new email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Insert new password"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="text-center pt-1 mb-5 pb-1">
                      <button
                        className="btn btn-success btn-lg gradient-custom-2 m-2"
                        type="submit"
                      >
                        Register
                      </button>
                      <Link to={"/login"}>
                        <button1 className="btn btn-lg" >
                          Login
                        </button1>
                      </Link>
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
