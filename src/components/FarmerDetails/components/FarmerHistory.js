import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { getBuyerOrderHistory,getFarmerProfile } from '../services/farmerService';
import { farmerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';
import Rating from '../../Rating/Rating'


const FarmerHistory = () => {
    const dispatch = useDispatch()
    const [history, setHistory] = useState("");
    useEffect(() => {
        getBuyerOrderHistory().then(
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
            <div>


                <ul>

                    {history &&
                        history.map((orders, index) =>
                            <div key={index} style={{width:'600px'}}>
                                <div  style={{margin:'10px 10px 10px 10px',width:'92vw ',height:'40vh',
                                            borderRadius:'10px',backgroundColor:'rgb(212, 245, 212)',border: 'solid 2px lightgreen'}}>

                                    <div>
                                        <img src={orders.createdBy.photo} alt="Profile Pic"
                                            style={{ height: '20vh',width:'10vw', marginLeft: '5vw',marginTop:'10vh' }} />

                                    </div>
                                    <div  style={{marginLeft:'6.6vw'}}>
                                       <Rating/>

                                    </div>
                                    <div style={{marginTop:'-25vh',marginLeft:'30vw',fontSize:'24px'}}>
                                        <br />Order For :<strong> {orders.createdBy.name}</strong>
                                        <br />Contact No : <strong>{orders.createdBy.phoneNo}</strong>
                                        <br />Location : <strong>{orders.createdBy.location}</strong>
                                        <br />Created At : <strong>{orders.postedDate}</strong>
                                    </div>
                                   <div style={{marginLeft:'65vw',marginTop:'-30vh' ,fontSize:'25px',width:'25vw'}}>
                                   
                                    <br />Product : <strong>{orders.product}</strong>
                                    <br />Quantity in Kg : <strong>{orders.quantity}</strong>
                                    <br />Amount /Kg : <strong>{orders.baseRate}</strong>
                                    <br />Agreed Date : <strong>{orders.agreedDate}</strong>
                                    <br />Due Date : <strong>{orders.dueDate}</strong>
                                    <br /><br />
                                   </div>
                                </div>

                            </div>)}
                </ul>

            </div>
        </div >
    );
}

export default FarmerHistory;