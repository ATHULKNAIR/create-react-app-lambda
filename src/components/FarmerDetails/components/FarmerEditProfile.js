import React, { useState, useRef,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Card} from 'react-bootstrap'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { editFarmerProfile,getFarmerProfile } from '../services/farmerService';
import {farmerLogout} from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';


const FarmerEditProfile = (props) => {
  const dispatch = useDispatch()

  const form = useRef();
  const checkBtn = useRef();

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);

  const onChangePhoto = (e) => {
    const photo = e.target.value;
    setPhoto(photo)
  }
  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name)
  }
  const onChangePhoneNo = (e) => {
    const phoneNo = e.target.value;
    setPhoneNo(phoneNo)
  }
  const onChangeLocation = (e) => {
    const location = e.target.value;
    setLocation(location)
  }
  const onChangeProduct = (e) => {
    const product = e.target.value;
    setProduct(product)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (checkBtn.current.context._errors.length === 0) {
      editFarmerProfile(photo,name, phoneNo, location, product)
        .then(() => {
          setSuccessful(true);
          props.history.push('/farmer/profile');
          window.location.href.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (successful) {
      return <Redirect to="farmer/profile" />
    }

  }

  const [farmer, setFarmer] = useState("");
  useEffect(() => {
    getFarmerProfile().then(
      (response) => {
        const farmer = response.data
        setFarmer(farmer);
        console.log(farmer)
      },
      (error) => {
        const _farmer =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setFarmer(_farmer);
      }
    );
  }, []);
  const FLogOut = () => {
    dispatch(farmerLogout());
  }

  return (
    <div >
      
      <Header  LogOut={FLogOut} route={'/farmer'} user={farmer.name} photo={farmer.photo} Seen={farmer.isSeen}/>
      
            <Card style={{width:'40rem',borderRadius:'30px',opacity:1,backgroundColor:"rgb(212,212,212"}}>
            <Form onSubmit={handleSubmit}  ref={form}>
        {!successful && (
          <div>

            {/* <div className="form-group">
              <label htmlFor="photo">Change Photo</label>
              <Input type="text" className="form-control" name="photo" value={photo}
                onChange={onChangePhoto} style={{marginLeft:'45px',marginTop:'5px',width:'259px'}}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="name">Change Name</label>
              <Input type="text" className="form-control" name="name" value={name}
                onChange={onChangeName} style={{marginLeft:'60px',marginTop:'5px',width:'260px'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNo"> Change PhoneNo</label>
              <Input type="text" className="form-control" name="phoneNo" value={phoneNo}
                onChange={onChangePhoneNo} style={{marginLeft:'35px',marginTop:'5px',width:'260px'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Chnage Location</label>
              <Input type="text" className="form-control" name="location"
                value={location} onChange={onChangeLocation} style={{marginLeft:'39px',marginTop:'5px',width:'260px'}}

              />
            </div>
            <div className="form-group">
              <label htmlFor="product"> Change Product</label>
              <Input type="text" className="form-control" name="product"
                value={product} onChange={onChangeProduct} style={{marginLeft:'45px',marginTop:'5px',width:'260px'}}

              />
            </div>

            <div className="form-group">
              <button className="btn btn-secondary btn-block"  style={{width:'16vw',marginLeft:'130px'}}>Save Changes</button>
            </div>
          </div>
        )}

        {message && (
          <div className="form-group">
            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
              {message}
            </div>
          </div>
        )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      </Card>
    </div>
  )
}

export default FarmerEditProfile;