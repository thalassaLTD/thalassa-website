import React from "react";
import { Link } from 'react-router-dom';


export const NavigationUser = (props) => {
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <Link to="/" className='hide-text'>
            <a className="navbar-brand page-scroll" href="#page-top">
              THALASSA
            </a>{" "}
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/dashboard" className='hide-text'>

                <a className="page-scroll">
                  Dashboard
                </a>
              </Link>
            </li>
            <li>
              <Link to="/resume-builder" className='hide-text'>

                <a className="page-scroll">
                  Resume Builder
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
