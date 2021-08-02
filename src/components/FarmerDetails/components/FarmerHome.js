import React, { useState, useEffect } from "react";

import { getFarmerHome,getFarmerProfile } from '../services/farmerService';
import { useDispatch } from "react-redux";

import { farmerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap';

const FarmerHome = () => {
    const dispatch = useDispatch()
  
    const [buyerOrder, setBuyerOrder] = useState([]);
    useEffect(() => {
        getFarmerHome().then(
            (response) => {
                const buyerOrder = response.data
                setBuyerOrder(buyerOrder);
                // console.log(buyerOrder[0].createdBy.photo)
            },
            (error) => {
                const _order =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setBuyerOrder(_order);
            }
        );
    }, []);

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
        <div>
           <Header  LogOut={FLogOut} route={'/farmer'} user={farmer.name} photo={farmer.photo} Seen={farmer.isSeen}/>
     
            <ul>

                {buyerOrder?.length > 0 &&
                    buyerOrder?.map((orders, index) =>
                        <div key={index}>
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
                                    <Link to={`/farmer/agreeorder/${orders._id}`}>
                                        <button style={{ backgroundColor: 'lightgreen', width: '8rem', height: '2rem', borderRadius: '20px' }}><strong>Accept Order</strong></button>
                                    </Link>
                                </div>
                                <div style={{ marginLeft: '65vw', marginTop: '-12vh' }}>
                                    <Link to={`/farmer/bidorder/${orders._id}`}>
                                        <button style={{ backgroundColor: 'lightgreen', width: '8rem', height: '2rem', borderRadius: '20px' }}><strong>  Bid Order</strong></button>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    )}
            </ul>
        </div>
    );
}

export default FarmerHome;