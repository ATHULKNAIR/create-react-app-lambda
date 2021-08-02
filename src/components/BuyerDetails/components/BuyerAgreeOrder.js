import React, { useState, useRef ,useEffect} from "react";
import { useDispatch } from "react-redux";
import { Link,Redirect } from 'react-router-dom'

import Form from "react-validation/build/form";
import {Card} from 'react-bootstrap'


import { agreeFarmerOrder,getBuyerProfile } from '../services/buyerService';
import { buyerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';

const BuyerAgreeOrder = ({match,history}) => {
    const dispatch = useDispatch()
    const id = match.params.id;

    
  const form = useRef();

    const [successful, setSuccessful] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setSuccessful(false);
            agreeFarmerOrder(id)
                .then(() => {
                    setSuccessful(true);
                    history.push('/buyer/notification');
                    window.location.href.reload();

                })
                .catch(() => {
                    setSuccessful(false);
                });
        
        if (successful) {
            return <Redirect to="/buyer/notification" />
        }else {
            return <Redirect to="/farmer/home" />
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
            <Card style={{width:'40rem',height:'15rem',borderRadius:'30px',opacity:1,backgroundColor:"rgb(212,212,212",marginTop:"15vh"}}>
                <Form onSubmit={handleSubmit} ref={form}>
                <Card.Body>
                        <div style={{textAlign:'center',fontSize:'20px',color:"black",marginTop:'6vh'}}>
                        <strong>Are you sure, You want to make a Accept the Order ?</strong>  
                        </div>
                    </Card.Body>
                
                    <div style={{marginLeft:'9vw',marginTop:'3vh'}}>
                        <button className="btn btn-primary btn-block" style={{borderRadius:'50px',width:'150px',height:'39px'}}>Accept Order</button>
                    </div>
                    <div style={{marginLeft:'20vw',marginTop:'-5.3vh'}}>
                    <Link to={`/buyer/home`}>
                        <button className="btn btn-danger btn-block" style={{borderRadius:'50px'}}>Go Back</button>
                    </Link>
                    </div>
                </Form>
            </Card>

        </div >
    );
}

export default BuyerAgreeOrder;