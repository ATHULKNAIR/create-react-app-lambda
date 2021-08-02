import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import farm from "../images/f-logo.jpg";
import business from "../images/i-logo.jpg";
import f1 from "../images/f1.jpg";
import { Navbar, Nav } from "react-bootstrap";

function Home() {
  return (
    <div className="landing-page">
      <div className="top">
        {/* <img src={f1} className="symbol" alt="farm" /> */}

        <h1 className="NFE">
          <strong> National Farmer's Exchange </strong>
        </h1>

        {/* <img src={f1} className="symbol-1" alt="farm" /> */}

        <Navbar bg="rgba(255,255,255,.5)">
          <Nav className="mr-auto">
            <Nav.Link href="/" style={{ color: "##040404" }}>
              <strong>Home</strong>
            </Nav.Link>
            <Nav.Link href="/about" style={{ color: "##040404" }}>
              <strong>About Us</strong>
            </Nav.Link>
            {/* <Nav.Link href='/product' style={{color:"##040404"}}><strong></strong><</Nav.Link> */}
            <Nav.Link href="/coming" style={{ color: "##040404" }}>
              <strong>Coming Soon...</strong>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>
      <div className="row">
        <div className="col-md">
          <div className="card text-center">
            <div className="overflow">
              <img src={farm} alt="farmer" className="card-img-top" />
            </div>
            <div className="card-body text">
              <h4 className="card-title">Farmer Login</h4>
              <p className="card-text text">
                Please click below button to login or create a profile
              </p>
            </div>
            <Link to="/farmer/login">
              <button type="button" className="btn btn-primary">
                Farmer Login
              </button>
            </Link>
          </div>
        </div>
        <div className="col-md">
          <div className="card text-center">
            <div className="overflow">
              <img src={business} alt="buyer" className="card-img-top" />
            </div>
            <div className="card-body text">
              <h4 className="card-title">Business Login</h4>
              <p className="card-text text">
                Please click below button to login or create a Buyer profile
              </p>
            </div>
            <Link to="/buyer/login">
              <a className="btn btn-primary">Buyer Login</a>
            </Link>
          </div>
        </div>
      </div>
      <div class="container-footer text-center">
        <div className="services">
          <h2>SERVICES</h2>
          <h4>What we offer</h4>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <span class="glyphicon glyphicon-off"></span>
            <h4>Simplicity</h4>
            <p>
              Our Application was made simple keeping in mind that it can be
              used by a 12 year old kid.
            </p>
          </div>
          <div class="col-sm-4">
            <span class="glyphicon glyphicon-heart"></span>
            <h4>Platform</h4>
            <p>
              A simple platform that helps businesses grow in this new era of
              internet
            </p>
          </div>
          <div class="col-sm-4">
            <span class="glyphicon glyphicon-lock"></span>
            <h4>What we have achieved</h4>
            <p>
              We have our ordering facility for the farmers as well as the
              buyers, We also keep them notified for each steps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
