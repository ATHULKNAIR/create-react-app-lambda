import React, { useState, useRef,useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Card} from 'react-bootstrap'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import {updateBuyerOrder,getBuyerProfile } from '../services/buyerService';
import {buyerLogout} from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';


const UpdateBuyerOrder = ({match,history}) => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if (checkBtn.current.context._errors.length === 0) {
     updateBuyerOrder(id,product, quantity, baseRate, dueDate)
        .then(() => {
          setSuccessful(true);
          history.push('/buyer/order');
          window.location.href.reload();
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
    if (successful) {
      return <Redirect to="/buyer/order" />
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

            <div className="form-group">
              <label htmlFor="product">Change Product</label>
              <Input type="text" className="form-control" name="product" value={product}
                onChange={onChangeProduct} style={{marginLeft:'50px',marginTop:'5px'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity"> Change Quantity</label>
              <Input type="text" className="form-control" name="quantity" value={quantity}
                onChange={onChangeQuantity} style={{marginLeft:'45px',marginTop:'5px',width:'259px'}}
              />
            </div>

            <div className="form-group">
              <label htmlFor="baseRate">Change Base Rate</label>
              <Input type="text" className="form-control" name="baseRate"
                value={baseRate} onChange={onChangeBaseRate} style={{marginLeft:'32px',marginTop:'5px',width:'260px'}}

              />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate"> Change DueDate</label>
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
      </Card>
    </div>
  )
}

export default UpdateBuyerOrder;