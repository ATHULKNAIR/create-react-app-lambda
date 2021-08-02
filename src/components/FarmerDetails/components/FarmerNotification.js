import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getNotification,getFarmerProfile } from '../services/farmerService';
import { farmerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';
import './Farmer.css'

import { Card } from 'react-bootstrap';

const FarmerNotification = () => {
    const dispatch = useDispatch()
    const [notification, setNotification] = useState("");

    useEffect(() => {
      loadNotification();
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

    const [farmer, setFarmer] = useState("");
  useEffect(() => {
    getFarmerProfile().then(
      (response) => {
        const farmer = response.data
        setFarmer(farmer);
        // console.log(farmer)
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
        <div>
            <Header  LogOut={FLogOut} route={'/farmer'} user={farmer.name} photo={farmer.photo} Seen={farmer.isSeen}/>
            <div>


                <ul>
                    {notification &&
                        notification.map((orders, index) =>

                            <div key={index}>
                                <div style={{ 
                                    backgroundColor:'rgb(212, 245, 212)', border:'solid 1px lightgreen', 
                                               margin: '10px 10px ', borderRadius: '10px',padding:'10px' , height:'143px', display:'flex-wrap' }}>
                                    <Card.Header  style={{ color: "white", background: "darkcyan",  margin:'10px 10px 10px 10px' , width:'13.2rem', height:'30px' }} 
                                                  as="h6" text='primary' > {orders.Date}{orders.time}
                                                  
                                                  </Card.Header>
                                                  
                                    
                                    <Card.Body style={{ marginLeft:'1vw', marginTop:'-2vh',color:'black'}}>
                                        
                                           <h5>{orders.message}</h5> 
                                       
                                    </Card.Body>
                                </div>
                            </div>)}

                </ul>

            </div>
        </div >
    );
}

export default FarmerNotification;