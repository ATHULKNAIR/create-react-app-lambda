import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom'

import { getMyOrderHistory } from '../services/buyerService';
import { buyerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';

const BuyerOrderHistory = () => {
    const dispatch = useDispatch()
    const [history, setHistory] = useState("");
    useEffect(() => {
        getMyOrderHistory().then(
            (response) => {
                const history = response.data
                setHistory(history);
                console.log(history[0])
            },
            (error) => {
                const _history =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setHistory(_history);
            }
        );
    }, []);
    const BLogOut = () => {
        dispatch(buyerLogout());
    }

    return (
        <div className="container">
          <Header route={'/buyer/login'} LogOut={BLogOut} routeHome={'/buyer/home'} routeProfile={'/buyer/profile'}
             routeOrder={'/buyer/order'} routeNotif={'/buyer/notification'} routeHistory={'/buyer/history'} />
            <div>

                <strong>History:</strong>
                <ul>

                    {history.length>0 &&
                        history?.map((orders, index) =>
                            <li key={index}>
                                <div>
                <img src={orders.boughtBy.photo} alt="Profile Pic"
                     className="profile-img-card"/>
                     
            </div>
                                <br />Sold To : {orders.boughtBy.name}
                                <br />Contact No :{orders.boughtBy.phoneNo}
                                <br />Created At :{orders.postedDate}
                                <br />Product :{orders.product}
                                <br />Quantity in Kg :{orders.quantity}
                                <br />Amount / Kg :{orders.baseRate}
                                <br />Location :{orders.boughtBy.location}
                                <br />Agreed Date :{orders.agreedDate}
                                <br /><br />

                            </li>)}
                </ul>

            </div>
        </div >
    );
}

export default BuyerOrderHistory;