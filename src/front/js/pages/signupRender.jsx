import React from "react";
import { Link } from "react-router-dom";

import "../../styles/index.css";

export const SignupRender = ({ handleChange, handleSubmit }) => {
  return (
    <div className="container py-3 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-xl-8">
          <div className="text-black">
            <div className="row g-0">
              <div className="col-lg-10 mx-auto">
                <div className="card-body p-md-5 mx-md-4">
                  <div className="text-center">
                    <h2 className="mt-1 mb-5 pb-1">
                      Create an account
                    </h2>
                  </div>

                  <form className="form-background" name="signup" onSubmit={handleSubmit}>
                    
                    <div className="form-outline mb-4">
                      <label className="form-label form-input-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        id="username"
                        className="form-control form-input-field"
                        placeholder="Insert new username"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label form-input-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control form-input-field"
                        placeholder="Insert new email"
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label form-input-label" htmlFor="password">
                        Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control form-input-field"
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
                        <span className="btn btn-outline-success btn-lg gradient-custom-2 m-2">
                          Login
                        </span>
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
  );
};
