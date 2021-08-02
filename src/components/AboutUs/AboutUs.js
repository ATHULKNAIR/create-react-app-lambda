import React from "react";
import { Navbar, Nav } from "react-bootstrap";
// import Modal from 'bootstrap';
import f1 from "../images/f1.jpg";
import "./about.css";

function AboutUs() {
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
      {/* <h1>About Us</h1>
        <div class="jumbotron">
          <h1>Our Application</h1>
          <p>
            We provide service to the Farmers of India and connect them to the
            Business
          </p>
          <button class="btn btn-info btn-lg">Get in Touch</button>

          <div class="container">
            <button type="button" class="btn btn-info btn-md" id="myBtn">
              How to Use Application
            </button>
            <div class="modal fade" id="myModal" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">
                      &times;
                    </button>
                    <h4 class="modal-title">Modal with Dark Overlay</h4>
                  </div>
                  <div class="modal-body">
                    <p>This modal has a dark overlay.</p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-default"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

      <div class="container-fluid ">
        <h2>Our Values</h2>
        <h4>
          <strong>MISSION:</strong> Our mission is to eradicate the Middleman
          culture in the farmer society
        </h4>
        <p>
          <strong>VISION:</strong> Our vision is to create a strong community of
          farmers throughout India
        </p>
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

        {/* <div class="row">
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-leaf"></span>
      <h4></h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-certificate"></span>
      <h4>CERTIFIED</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div>
    <div class="col-sm-4">
      <span class="glyphicon glyphicon-wrench"></span>
      <h4>HARD WORK</h4>
      <p>Lorem ipsum dolor sit amet..</p>
    </div> */}
      </div>
    </div>
    //{" "}
  );
}

export default AboutUs;
