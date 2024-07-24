import React from "react";
import { Link, useNavigate } from 'react-router-dom';

export const Header = (props) => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  {props.data ? props.data.title : "Loading"}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : "Loading"}</p>
                {/* <Link to="/signup" className='hide-text'>
                  <span className="btn-custom rounded-pill page-scroll">
                    Sign up
                  </span>
                </Link>
                {" "}
                <Link to="/signin" className='hide-text'>
                  <span className="btn-custom rounded-pill page-scroll" >
                     Sign in
                  </span>
                </Link> */}
                {/* <a
                  href="#features"
                  className="btn btn-custom btn-lg page-scroll"
                >
                  Learn More
                </a>{" "} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
