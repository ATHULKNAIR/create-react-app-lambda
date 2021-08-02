import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {farmerRegister} from '../actions/auth';
import './Farmer.css';
import '../../Header/Header.css'
import {Navbar,Nav} from 'react-bootstrap';


import {FaUserAlt} from "react-icons/fa";
import {FaPhoneSquareAlt } from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import {IoLocation} from 'react-icons/io5';
import {FaGenderless} from 'react-icons/fa';
import {FaProductHunt} from 'react-icons/fa'
import f1 from '../../images/f1.jpg';


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const validPhoneNo = (value) => {
    if (value.length !== 10 ) {
      return (
        <div className="alert alert-danger" role="alert">
          Phone Number should be 10 digits..!
        </div>
      );
    }
  };const validPassword = (value) => {
    if (value.length < 6 ) {
      return (
        <div className="alert alert-danger" role="alert">
          The password too short.
        </div>
      );
    }
  };

  const FarmerRegsiter = () =>{

    const form = useRef();
    const checkBtn = useRef();
    const [name, setName] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [gender, setGender] = useState("");
    const [product, setProduct] = useState("");
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const onChangeName = (e)=>{
        const name = e.target.value;
        setName(name);
    };

    const onChangePhoneNo = (e)=>{
        const phoneNo = e.target.value;
        setPhoneNo(phoneNo);
    };
    const onChangePassword = (e)=>{
        const password = e.target.value;
        setPassword(password);
    };
    const onChangeLocation = (e)=>{
        const location = e.target.value;
        setLocation(location);
    };
    const onChangeGender = (e)=>{
        const gender = e.target.value;
        setGender(gender);
    };
    const onChangeProduct = (e)=>{
        const product = e.target.value;
        setProduct(product);
    };

    const handleRegister=(e)=>{
        e.preventDefault();
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(farmerRegister(name, phoneNo, password,location,gender,product))
              .then(() => {
                setSuccessful(true);
              })
              .catch(() => {
                setSuccessful(false);
              });
        }
    };

    return(
       <div  className="login-page">
          <div className="top">
            {/* <img src={f1} className="symbol" alt="farm" /> */}
            
                <h1 className="NFE"><strong>      National Farmer's Exchange      </strong></h1>
           
                {/* <img src={f1} className="symbol-1" alt="farm" /> */}
            

          
           <Navbar bg="rgba(255,255,255,.5)"  >
                <Nav className="mr-auto">
                <Nav.Link href='/'style={{color:"##040404" }} ><strong>Home</strong></Nav.Link>
                <Nav.Link href='/about' style={{color:"##040404"}}><strong>About Us</strong></Nav.Link>
                {/* <Nav.Link href='/product' style={{color:"##040404"}}><strong></strong><</Nav.Link> */}
                <Nav.Link href='/coming' style={{color:"##040404"}}><strong>Coming Soon...</strong></Nav.Link>
               
                
                </Nav>
            </Navbar>   
              </div> 
          <div className="row">
          <div className="col-md-12">
            <div className="card card-container register" >
                <img src="https://res.cloudinary.com/mycartdb/image/upload/v1621404771/frmr_vrycol.jpg"
                     alt="profile-image" className="profile-img-card" 
                />
                <Form onSubmit={handleRegister} ref={form}>
                  {!successful && (
                    <div>
                      <div className="form-group" style={{marginTop:'-2vh'}}>
                        <label htmlFor="name"><FaUserAlt/></label>
                        <Input type="text" className="form-control" name="name" value={name}
                               onChange={onChangeName} validations={[required]} placeholder="User Name"
                               style={{width:'15vw',marginLeft:'1vw'}}
                        />
                      </div>

                      <div className="form-group" style={{marginTop:'-2vh'}}>
                        <label htmlFor="phoneNo"><FaPhoneSquareAlt/></label>
                        <Input type="text" className="form-control" name="phoneNo" value={phoneNo}
                               onChange={onChangePhoneNo} validations={[required, validPhoneNo]} placeholder="Mobile Number"
                               style={{width:'15vw',marginLeft:'1vw'}}
                        />
                      </div>

                      <div className="form-group" style={{marginTop:'-2vh'}}>
                        <label htmlFor="password"><RiLockPasswordFill/></label>
                        <Input type="password" className="form-control" name="password"
                               value={password} onChange={onChangePassword} 
                               validations={[required, validPassword]} placeholder="Password"
                               style={{width:'15vw',marginLeft:'1vw'}}
                        />
                      </div>
                      <div className="form-group" style={{marginTop:'-2vh'}}>
                        <label htmlFor="location"><IoLocation/></label>
                        <Input type="location" className="form-control" name="location"
                               value={location} onChange={onChangeLocation} placeholder="Location"
                               style={{width:'15vw',marginLeft:'1vw'}}
                               
                        />
                      </div>
                      <div className="form-group" style={{marginTop:'-2vh'}}>
                        <label htmlFor="gender"><FaGenderless/></label>
                        <Input type="gender" className="form-control" name="gender"
                               value={gender} onChange={onChangeGender} placeholder="Gender"
                               style={{width:'15vw',marginLeft:'1vw'}}
                               
                        />
                      </div>
                      <div className="form-group" style={{marginTop:'-2vh'}}>
                        <label htmlFor="product" ><FaProductHunt/></label>
                        <Input type="product" className="form-control" name="product"
                               value={product} onChange={onChangeProduct} placeholder="Product"
                               style={{width:'15vw',marginLeft:'1vw'}}
                               
                        />
                      </div>

                      
                        <button className="btn btn-primary btn-block" style={{width:'9vw',marginTop:'2vh'}} >Sign Up</button>
                      
                    </div>
                  )}

                  {message && (
                    <div className="form-group">
                    <div className={ successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                        {message}
                    </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={checkBtn} />
                <div style={{marginTop:'5vh',color:'#e5e5e5' , fontSize:'20px'}}> <p>Already an account? <a href="/farmer/login" style={{ color:'#1FF1D0' }}>Login</a></p></div>
                </Form>
               
            </div>
            
        </div>
       </div>
       </div>
    )
  }

  

 
  export default FarmerRegsiter