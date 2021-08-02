import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from 'react-router-dom';


import { getFarmerProfile, editFarmerProfile } from '../services/farmerService';
import { farmerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';
// import './Farmer.css';

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Input from "react-validation/build/input";

const FarmerProfile = (props) => {

  const dispatch = useDispatch()
  const form = useRef();
  const checkBtn = useRef();

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("");
  const [successful, setSuccessful] = useState(false);

  const [farmer, setFarmer] = useState("");

  useEffect(() => {
   loadProfile();
  }, []);

  const loadProfile = ()=>{
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
  }
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

    
      editFarmerProfile(photo, name, phoneNo, location, product)
        .then(() => {
          setSuccessful(true);
          loadProfile();
          setShow(false)
          setName("")
          setLocation("")
          setPhoneNo("")
          setProduct("")
        

          props.history.push('/farmer/profile');
          window.location.href.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });

    if (successful) {
      window.location.href.reload();
    }

  }


  const FLogOut = () => {
    dispatch(farmerLogout());
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div >
     <Header  LogOut={FLogOut} route={'/farmer'} user={farmer.name} photo={farmer.photo} Seen={farmer.isSeen}/>
      <div>
        <div >
          <img src={farmer.photo} alt="Profile Pic"
            style={{  height: '45vh', borderRadius: '400px', marginLeft: '10vw', marginTop: '8vh' }} />
        </div>


        <div style={{ fontSize: '40px', marginTop: '15px', marginLeft: '12vw' }}>
          <strong>{farmer.name} </strong>
        </div>




        {/* <div style={{ fontSize: '30px', marginLeft: '220px' }}>
          <strong>( {farmer.role} ) </strong>
        </div> */}


        <div style={{ marginTop: '-53vh', marginLeft: "50vw", fontSize: '32px' }}>
          <strong>Phone Number : </strong>{farmer.phoneNo}
          <br /><strong>Gender : </strong>{farmer.gender}
          <br /><strong>Location : </strong>{farmer.location}
          <br /><strong>Product : </strong>{farmer.product}
          <br /><strong>Order Count : </strong>{farmer.orderCount}
          {/* <br /><strong>Notified : </strong>{JSON.stringify(farmer.isSeen)} */}


        </div>

      </div>
      <div >
        
        <button style={{
          marginLeft: '50vw', marginTop: "13vh", padding: '10px',
          width: '10vw', fontSize: '20px', border: 'solid green 5px'
        }}
          onClick={handleShow}>
          <strong>Edit Profile</strong>
        </button>
      

        <Modal show={show} onHide={handleClose} style={{marginLeft:'-4vw',marginTop:'18vh'}} >
       
          <Modal.Header style={{ opacity: 1, backgroundColor: "#0a421b", color: "white" ,width:'40vw'}}>
            <Modal.Title style={{marginLeft:'15vw'}}>Edit Profile</Modal.Title>
             <Button variant="light" onClick={handleClose} style={{marginTop:'-2vh',fontSize:"12px"}}>
              <strong>X</strong> </Button>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: 'rgb(212, 245, 212)',border:'solid rgb(192, 245 , 192) 5px',width:'40vw',height:'63vh' }}>
            
              <Form.Group controlId="formFile" className="mb-1">
                <Form.Label style={{fontSize:'20px'}}><strong>Change Name</strong></Form.Label>
                <input type="text" style={{ marginLeft: '5.8vw', marginTop: '5px', width: '260px',border:'solid green 2px',paddingLeft:'20px' }}
                  name="name" value={name} onChange={onChangeName} />
              </Form.Group>

              <Form.Group controlId="formFileMultiple" className="mb-1">
                <Form.Label style={{fontSize:'20px'}}><strong>Change PhoneNo</strong></Form.Label>
                <input type="text" style={{ marginLeft: '60px', marginTop: '5px', 
                                   width: '260px', padding: '0px 0px 0px 30px',border:'solid green 2px',paddingLeft:'20px' }}
                  name="phoneNo" value={phoneNo} onChange={onChangePhoneNo} />
              </Form.Group>

              <Form.Group controlId="formFileDisabled" className="mb-1">
                <Form.Label style={{fontSize:'20px'}}><strong>Change Location</strong> </Form.Label>
                <input type="text" style={{ marginLeft: '63px', marginTop: '5px', width: '260px',border:'solid green 2px',paddingLeft:'20px' }}
                  name="location" value={location} onChange={onChangeLocation} />
              </Form.Group>

              <Form.Group controlId="formFileSm" className="mb-1">
                <Form.Label style={{fontSize:'20px'}}><strong>Change Product</strong></Form.Label>
                <input type="text" style={{ marginLeft: '70px', marginTop: '5px', width: '260px',border:'solid green 2px',paddingLeft:'20px' }}
                  name="product" value={product} onChange={onChangeProduct} />
              </Form.Group>
            
              <Button variant='secondary '  onClick={handleSubmit} style={{marginLeft:'11vw',marginTop:'4vh',width:'13vw',height:'6vh',backgroundColor:'#0a421b'}}>
              Save Changes
          </Button>
         
            </Modal.Body>
        
        </Modal>
      </div>
    </div>
  );
}

export default FarmerProfile;