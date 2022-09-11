import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="home-bg">
      <div className="home-bg3 d-flex justify-content-center d-flex align-items-center">
        <div className="container text-center">
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 bg-white p-5 rounded-1">
              <h1 className="text-danger font-weight-bold">
                <strong>404</strong>
              </h1>
              <h4>Ooops.....</h4>
              <p>page not found</p>
              <Link
                className="btn btn-outline-success btn-sm px-5"
                type="buttom"
                to="/"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
