
import React, { useState,useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Rating from '../../Rating/Rating'


import {buyerLogout} from '../actions/auth'
import {getBuyerProfile,editBuyerProfile} from '../services/buyerService';
import Header from '../../Header/Header';
import '../../Header/Header.css';
import './Buyer.css';

const BuyerProfile = (props)=>{
  const dispatch = useDispatch()
  const form = useRef();
  const checkBtn = useRef();

  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [location, setLocation] = useState("");
  const [product, setProduct] = useState("");
  const [successful, setSuccessful] = useState(false);

    const [buyer,setBuyer] = useState("");
    useEffect(() => {
       loadProfile()
      }, []);

    const  loadProfile=()=>{
        getBuyerProfile().then(
          (response) => {
            const buyer = response.data 
            setBuyer(buyer); 
            console.log(buyer)   
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
      }

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
    
        
          editBuyerProfile(photo, name,email, phoneNo, location, product)
            .then(() => {
              setSuccessful(true);
              loadProfile()
              setShow(false)
          setName("")
          setLocation("")
          setPhoneNo("")
          setProduct("")
              props.history.push('/buyer/profile');
              window.location.href.reload();
            })
            .catch(() => {
              setSuccessful(false);
            });
    
        if (successful) {
          window.location.href.reload();
        }
    
      }

      const BLogOut = () => {
        dispatch(buyerLogout());
      }

      const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
      return (
        <div >
           <Header  LogOut={BLogOut} route={'/buyer'} user={buyer.name} photo={buyer.photo} Seen={buyer.isSeen} Bid={buyer.isBid}/>

             
             <div >
          <img src={buyer.photo} alt="Profile Pic"
            style={{  height: '45vh', marginLeft: '10vw', marginTop: '8vh',borderRadius:'400px' }} />
        </div>
        <div style={{ fontSize: '40px', marginTop: '15px', marginLeft: '15vw' }}>
          <strong>{buyer.name} </strong>
        </div>
        

        
        {/* <div style={{ fontSize: '30px', marginLeft: '9vw' }}>
          <strong>( {buyer.role} ) </strong>
        </div> */}
        <div style={{ marginTop: '-53vh', marginLeft: "50vw", fontSize: '30px' }}>
          <strong>Phone Number : </strong>{buyer.phoneNo}
          <br /><strong>Email : </strong>{buyer.email}
          <br /><strong>Gender : </strong>{buyer.gender}
          <br /><strong>Location : </strong>{buyer.location}
          <br /><strong>Product : </strong>{buyer.product}
          <br /><strong>Order Count : </strong>{buyer.orderCount}
          <br /><strong>Your Rating : </strong>
          <div style={{marginLeft:'13vw',marginTop:'-7.9vh'}}>
          <Rating/>
        </div>
          {/* <br /><strong>Notified : </strong>{JSON.stringify(buyer.isSeen)}
          <br /><strong>Bid : </strong>{JSON.stringify(buyer.isBid)} */}
        </div>
            
        <div >
        
          <button style={{marginLeft:'50vw',marginTop:"8vh", padding:'10px',
                          width:'10vw',fontSize:'20px',border:'solid green 5px'}}
                          onClick={handleShow}>
            <strong>Edit Profile</strong>
          </button>

         
          <Modal show={show} onHide={handleClose} style={{marginLeft:'-4vw',marginTop:'21vh'}} >
       
       <Modal.Header style={{ opacity: 1, backgroundColor: "#0a421b", color: "white" ,width:'40vw',position:'sticky',marginTop:'0vh'}}>
         <Modal.Title style={{marginLeft:'15vw'}}>Edit Profile</Modal.Title>
          <Button variant="light" onClick={handleClose} style={{marginTop:'-2vh',fontSize:"12px"}}>
           <strong>X</strong> </Button>
       </Modal.Header>
       <Modal.Body style={{ backgroundColor: 'rgb(212, 245, 212)',border:'solid rgb(192, 245 , 192) 5px',width:'40vw',height:'62vh' }}>
         
           <Form.Group controlId="formFile" className="mb-0">
             <Form.Label style={{fontSize:'20px'}}><strong>Change Name</strong></Form.Label>
             <input type="text" style={{ marginLeft: '5.8vw', marginTop: '5px', width: '260px',border:'solid green 2px' ,paddingLeft:'20px'}}
               name="name" value={name} onChange={onChangeName} />
           </Form.Group>

           <Form.Group controlId="formFileMultiple" className="mb-0" style={{marginTop:'-2vh'}}>
             <Form.Label style={{fontSize:'20px'}}><strong>Change PhoneNo</strong></Form.Label>
             <input type="text" style={{ marginLeft: '60px', marginTop: '5px', 
                                width: '260px', padding: '0px 0px 0px 30px',border:'solid green 2px' ,paddingLeft:'20px'}}
               name="phoneNo" value={phoneNo} onChange={onChangePhoneNo} />
           </Form.Group>
           <Form.Group controlId="formFileMultiple" className="mb-0" style={{marginTop:'-2vh'}}>
             <Form.Label style={{fontSize:'20px'}}><strong>Change Email</strong></Form.Label>
             <input type="text" style={{ marginLeft: '6vw', marginTop: '5px', 
                                width: '260px', padding: '0px 0px 0px 30px',border:'solid green 2px' ,paddingLeft:'20px'}}
               name="email" value={email} onChange={onChangeEmail} />
           </Form.Group>

           <Form.Group controlId="formFileDisabled" className="mb-0" style={{marginTop:'-2vh'}}>
             <Form.Label style={{fontSize:'20px'}}><strong>Change Location</strong> </Form.Label>
             <input type="text" style={{ marginLeft: '63px', marginTop: '5px', width: '260px',border:'solid green 2px',paddingLeft:'20px' }}
               name="location" value={location} onChange={onChangeLocation} />
           </Form.Group>

           <Form.Group controlId="formFileSm" className="mb-0" style={{marginTop:'-2vh'}}>
             <Form.Label style={{fontSize:'20px'}}><strong>Change Product</strong></Form.Label>
             <input type="text" style={{ marginLeft: '70px', marginTop: '5px', width: '260px',border:'solid green 2px' ,paddingLeft:'20px'}}
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

export default BuyerProfile;