import React, { useState, useRef ,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Card} from 'react-bootstrap'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import { createFarmerOrder,getFarmerProfile } from '../services/farmerService';
import {farmerLogout} from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';


const FarmerCreateOrder = (props) => {
  const dispatch = useDispatch()

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (checkBtn.current.context._errors.length === 0) {
      createFarmerOrder(product, quantity, baseRate, dueDate)
        .then(() => {
          setSuccessful(true);
          props.history.push('/farmer/order');
          window.location.href.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (successful) {
      return <Redirect to="farmer/order" />
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
            <Form onSubmit={handleSubmit} ref={form}>
        {!successful && (
          <div>

            <div className="form-group">
              <label htmlFor="product"><strong>Product</strong></label>
              <Input type="text" className="form-control" name="product" value={product}
                onChange={onChangeProduct} style={{marginLeft:'80px',marginTop:'5px',width:'18.8vw'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity"><strong>Quantity in Kg</strong></label>
              <Input type="text" className="form-control" name="quantity" value={quantity}
                onChange={onChangeQuantity} style={{marginLeft:'37px',marginTop:'5px',width:'18.7vw'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="baseRate"><strong>Base Price / Kg</strong></label>
              <Input type="text" className="form-control" name="baseRate"
                value={baseRate} onChange={onChangeBaseRate} style={{marginLeft:'28px',marginTop:'5px' ,width:"18.8vw"}}

              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate"><strong>Due Date</strong></label>
              <Input type="text" className="form-control" name="dueDate"
                value={dueDate} onChange={onChangeDueDate} style={{marginLeft:'72px',marginTop:'5px',width:'18.8vw'}}

              />
            </div>

            <div className="form-group">
              <button className="btn btn-primary btn-block" style={{width:'16vw',marginLeft:'130px'}}>Publish</button>
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
      </Card >
    </div>
  )
}

export default FarmerCreateOrder;