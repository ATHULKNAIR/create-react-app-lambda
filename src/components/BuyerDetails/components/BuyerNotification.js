import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getNotification,getBuyerProfile } from '../services/buyerService';
import { buyerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';

import { Card } from 'react-bootstrap';


const BuyerNotification = () => {
    const dispatch = useDispatch()
    
    const [notification, setNotification] = useState("");
    useEffect(() => {
       loadNotification()
    }, []);

    const loadNotification=()=>{
      getNotification().then(
        (response) => {
            const notification = response.data
            setNotification(notification);
            // console.log(notification[2])
        },
        (error) => {
            const _notification =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            setNotification(_notification);
        }
    );
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
        <div  style={{backgroundColor: "rgb(241, 244, 245)"}}>
             <Header  LogOut={BLogOut} route={'/buyer'} user={buyer.name} photo={buyer.photo} Seen={buyer.isSeen} Bid={buyer.isBid}/>
            <div>

                
                <ul>

                    {notification &&
                        notification.map((orders, index) =>
                            <div key={index}>
                                  <div style={{ backgroundColor:'rgb(212, 245, 212)', 
                                               margin: '10px 30px', borderRadius: '10px',padding:'10px' , height:'143px', display:'flex-wrap'  }}>
                                    <Card.Header  style={{ color: "white", background: "darkcyan",margin:'10px 10px 10px 10px' , width:'14rem', height:'30px'  }} 
                                                  as="h6" text='primary'>{orders.Date}{orders.time}</Card.Header>
                                   
                                    <Card.Body style={{ marginLeft:'1vw', marginTop:'-2vh',color:'black' }}>
                               <h5>{orders.message}</h5> 
                                
                                <br /><br />
                                </Card.Body>
                                </div>
                            </div>)}
                </ul>

            </div>
        </div >
    );
}

export default BuyerNotification;