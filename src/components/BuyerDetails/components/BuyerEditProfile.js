import React, { useState, useRef,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Card} from 'react-bootstrap'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { editBuyerProfile ,getBuyerProfile} from '../services/buyerService';
import {buyerLogout} from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';


const BuyerEditProfile = (props) => {
  const dispatch = useDispatch()

  const form = useRef();
  const checkBtn = useRef();

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [email, setEmail] = useState("");
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
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email)
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
      editBuyerProfile(photo,name,email, phoneNo, location, product)
        .then(() => {
          setSuccessful(true);
          props.history.push('/buyer/profile');
          window.location.href.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (successful) {
      return <Redirect to="buyer/profile" />
    }

  }

  const [buyer,setBuyer] = useState("");
  useEffect(() => {
      getBuyerProfile().then(
        (response) => {
          const buyer = response.data 
          setBuyer(buyer); 
          // console.log(buyer.order)   
        },
        (error) => {
          const _buyer =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
  
          setBuyer(_buyer);
        }
      );
    }, []);
   
  const BLogOut = () => {
    dispatch(buyerLogout());
  }

  return (
    <div >
      
      <Header  LogOut={BLogOut} route={'/buyer'} user={buyer.name} photo={buyer.photo} Seen={buyer.isSeen} Bid={buyer.isBid}/>
            <Card style={{width:'40rem',borderRadius:'30px',opacity:1,backgroundColor:"rgb(212,212,212"}}>
           
            <Form onSubmit={handleSubmit}  ref={form}>
        {!successful && (
          <div>

            {/* <div className="form-group">
              <label htmlFor="photo">Change Photo</label>
              <Input type="text" className="form-control" name="photo" value={photo}
                onChange={onChangePhoto}
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="name">Change Name</label>
              <Input type="text" className="form-control" name="name" value={name}
                 onChange={onChangeName} style={{marginLeft:'55px',marginTop:'5px',width:'260px'}}

              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Change Email</label>
              <Input type="text" className="form-control" name="email" value={email}
                onChange={onChangeEmail} style={{marginLeft:'60px',marginTop:'5px',width:'260px'}}
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
                value={location} onChange={onChangeLocation}  style={{marginLeft:'39px',marginTop:'5px',width:'260px'}}

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

export default BuyerEditProfile;