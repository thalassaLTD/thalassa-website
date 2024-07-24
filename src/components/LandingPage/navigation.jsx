import React from "react";
import { Link, useNavigate } from 'react-router-dom';


export const Navigation = (props) => {
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
            {/* <li>
              <a href="#features" className="page-scroll">
                Features
              </a>
            </li> */}
            <li>
              <a href="/#about" className="page-scroll">
                About Us
              </a>
            </li>
            <li>
              <a href="/#services" className="page-scroll">
                What we do
              </a>
            </li>
            <li>
              <a href="/insights" className="page-scroll">
                Insights
              </a>
            </li>
            <li>
              <a href="/case-studies" className="page-scroll">
                Case Studies
              </a>
            </li>
            {/* <li>
              <a href="#testimonials" className="page-scroll">
                Testimonials
              </a>
            </li> */}
            {/* <li>
              <a href="#team" className="page-scroll">
                Team
              </a>
            </li> */}
            <li>
              <a href="/#contact" className="page-scroll">
                Contact Us
              </a>
            </li>
            {/* <li>
              <a href="https://business.joinuplyft.com/" style={{color:'orange'}}>
                Go to Business
              </a>
            </li>
            <li>
              <Link to="/signin" className='hide-text'>

                <a className="page-scroll">
                  Sign in
              </a>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};
