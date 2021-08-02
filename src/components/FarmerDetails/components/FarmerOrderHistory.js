import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMyOrderHistory } from '../services/farmerService';
import { farmerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';
import './Farmer.css'

const FarmerOrderHistory = () => {
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
    const FLogOut = () => {
        dispatch(farmerLogout());
    }

    return (
        <div>
           <Header route={'/farmer/login'} LogOut={FLogOut} routeHome={'/farmer/home'} routeProfile={'/farmer/profile'}
             routeOrder={'/farmer/order'} routeNotif={'/farmer/notification'} routeHistory={'/farmer/history'} />
            <div className="myhistory">

                <header className="history-head"> History</header>
                <ul>

                    {history &&
                        history.map((orders, index) =>
                            <div bg="info" key={index}>
            <div>
                <img src={orders.boughtBy.photo} alt="Profile Pic"
                     className="profile-img-card"/>
                     
            </div>
            <div >
                <p>Sold To : {orders.boughtBy.name} </p>
                <p>Contact No :{orders.boughtBy.phoneNo}</p>
                <p>Created At :{orders.postedDate}</p>
                <p>Product :{orders.product}</p>
                <p>Quantity in Kg :{orders.quantity}</p>
                <p>Amount / Kg :{orders.baseRate}</p>
                <p>Location :{orders.boughtBy.location}</p>
                <p>Agreed Date :{orders.agreedDate}</p>
                
            </div >
                               
                            </div>)}
                </ul>

            </div>
        </div >
    );
}

export default FarmerOrderHistory;