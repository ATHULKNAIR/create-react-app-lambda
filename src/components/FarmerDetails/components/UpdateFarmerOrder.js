import React, { useState, useRef,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {updateFarmerOrder,getFarmerProfile } from '../services/farmerService';
import {farmerLogout} from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';

import './Farmer.css'

import {Card} from 'react-bootstrap';


const UpdateFarmerOrder = ({match,history}) => {
  const dispatch = useDispatch()

const id = match.params.id;
  const form = useRef();
  const checkBtn = useRef();

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [baseRate, setBaseRate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [successful, setSuccessful] = useState(false);

  const { message } = useSelector(state => state.message);

  const onChangeProduct = (e) => {
    const product = e.target.value;
    setProduct(product)
  }
  const onChangeQuantity = (e) => {
    const quantity = e.target.value;
    setQuantity(quantity)
  }
  const onChangeBaseRate = (e) => {
    const baseRate = e.target.value;
    setBaseRate(baseRate)
  }
  const onChangeDueDate = (e) => {
    const dueDate = e.target.value;
    setDueDate(dueDate)
  }
  
console.log(id)

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (checkBtn.current.context._errors.length === 0) {
     updateFarmerOrder(id,product, quantity, baseRate, dueDate)
        .then(() => {
          setSuccessful(true);
          history.push('/farmer/order');
          window.location.href.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (successful) {
      return <Redirect to="/farmer/order" />
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
          <div className='edit-order'>

            <div className="form-group" >
              <label htmlFor="product"><h4>Change Product : </h4></label>
              <Input type="text" className="form-control" name="product" value={product}
                onChange={onChangeProduct} style={{marginLeft:'50px',marginTop:'5px'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity"> <h4>Change Quantity : </h4></label>
              <Input type="text" className="form-control" name="quantity" value={quantity}
                onChange={onChangeQuantity} style={{marginLeft:'45px',marginTop:'5px',width:'259px'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="baseRate"><h4>Change BaseRate : </h4></label>
              <Input type="text" className="form-control" name="baseRate"
                value={baseRate} onChange={onChangeBaseRate} style={{marginLeft:'32px',marginTop:'5px',width:'260px'}}

              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate"> <h4>Change DueDate : </h4></label>
              <Input type="text" className="form-control" name="dueDate"
                value={dueDate} onChange={onChangeDueDate} style={{marginLeft:'42px',marginTop:'5px',width:'260px'}}

              />
            </div>

            <div className="form-group">
              <button className="btn btn-secondary btn-block" style={{width:'15rem',marginLeft:'130px'}}>Save Changes</button>
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
           </ Card>
    </div>
  )
}

export default UpdateFarmerOrder;