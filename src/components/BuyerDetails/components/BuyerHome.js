import React, { useState, useEffect } from "react";

import { getBuyerHome,getBuyerProfile } from '../services/buyerService';
import { useDispatch } from "react-redux";

import { buyerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';
import { Link } from "react-router-dom";

const BuyerHome = () => {
    const dispatch = useDispatch()

    const [farmerOrder, setFarmerOrder] = useState("");
    useEffect(() => {
        getBuyerHome().then(
            (response) => {
                const farmerOrder = response.data
                setFarmerOrder(farmerOrder);
                // console.log(farmerOrder[0].createdBy.photo)
            },
            (error) => {
                const _order =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setFarmerOrder(_order);
            }
        );
    }, []);

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

            <ul>

                {farmerOrder &&
                    farmerOrder?.map((orders, index) =>
                        <div style={{
                            backgroundColor: 'rgb(212, 245, 212)', height: '15rem',
                            margin: '10px 30px', borderRadius: '20px', padding: '20px', border: 'solid 2px lightgreen'
                        }} >
                            <img src={orders.createdBy.photo} className="profile-img-card" style={{ marginLeft: '10px' }} />

                            <div style={{ marginLeft: '150px', fontSize: '27px', marginTop: '-120px' }}>  <br /><strong>{orders.createdBy.name}</strong></div>
                            <div style={{ marginLeft: '150px', fontSize: '20px' }}>({orders.createdBy.location})</div>
                            <div style={{ fontSize: '20px', marginLeft: '3vw', marginTop: '3vh' }}>
                                <br />Posted On : <strong>{orders.postedDate}</strong>

                            </div >
                            <div style={{ marginLeft: '40vw', marginTop: '-25vh', fontSize: '22px' }}>
                                <br />Product : <strong>{orders.product}</strong>
                                <br /> Quantity : <strong>{orders.quantity} Kg</strong>
                                <br /> Base Price : <strong>{orders.baseRate} Rs/Kg</strong>
                                <br />Due Date : <strong>{orders.dueDate}</strong>
                            </div>

                            <div style={{ marginLeft: '65vw', marginTop: '-8vh' }}>
                                <Link to={`/buyer/agreeorder/${orders._id}`}>
                                    <button style={{ backgroundColor: 'lightgreen', width: '8rem', height: '2rem', borderRadius: '20px' }}><strong>Accept Order</strong></button>
                                </Link>
                            </div>
                        
                        </div>
                        
                    )}
            </ul>
        </div >
    );
}

export default BuyerHome;