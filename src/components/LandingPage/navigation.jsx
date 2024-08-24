import React from "react";
import { Link } from 'react-router-dom';

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
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link to="/" className='hide-text'>
            <a className="navbar-brand page-scroll" href="#page-top">
              THALASSA
            </a>
          </Link>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {/* <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                What We Do <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="/service1">New vaccine impact on fish farm</a>
                </li>
                <li>
                  <Link to="/service2" className="page-scroll">Modelling depression in the pandemic</Link>
                </li>
                <li>
                  <Link to="/service3" className="page-scroll">Investigation of solar energy generation integration with retail distribution</Link>
                </li>
              </ul>
            </li> */}
            {/* <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Insights <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/insights/insight1" className="page-scroll">Insight 1</Link>
                </li>
                <li>
                  <Link to="/insights/insight2" className="page-scroll">Insight 2</Link>
                </li>
                <li>
                  <Link to="/insights/insight3" className="page-scroll">Insight 3</Link>
                </li>
              </ul>
            </li> */}
            <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                Case Studies <b className="caret"></b>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a href="/new-vaccine-impact-on-fish-farms">New vaccine impact on fish farm</a>
                </li>
                <li>
                  <Link to="/modelling-depression-in-pandemic" className="page-scroll">Modelling depression in the pandemic</Link>
                </li>
                <li>
                  <Link to="/service3" className="page-scroll">Investigation of solar energy generation integration with retail distribution</Link>
                </li>
                <li>
                  <Link to="/service4" className="page-scroll">Localisation of Epidemiological models of Covid-19</Link>
                </li>
              </ul>
            </li>
            {/* <li>
              <a href="/#contact" className="page-scroll">
                Contact Us
              </a>
            </li> */}
            <li>
              <Link to="/signin" className='hide-text'>
                <a className="page-scroll">
                  Sign in
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
