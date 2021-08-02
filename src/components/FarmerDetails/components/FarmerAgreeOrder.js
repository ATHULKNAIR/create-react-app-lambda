import React, { useState, useRef,useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom'
import {Card} from 'react-bootstrap'

import Form from "react-validation/build/form";


import { agreeBuyerOrder,getFarmerProfile } from '../services/farmerService';
import { farmerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';

const FarmerAgreeOrder = ({ match, history }) => {
    const dispatch = useDispatch()

    const id = match.params.id;

    const form = useRef();

    const [successful, setSuccessful] = useState(false);
    console.log(id)
    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);
        
            agreeBuyerOrder(id)
                .then(() => {
                    setSuccessful(true);
                    history.push('/farmer/notification');
                    window.location.href.reload();

                })
                .catch(() => {
                    setSuccessful(false);
                    
                });
        
        if (successful) {
            return <Redirect to="/farmer/notification" />
        } else {
            return <Redirect to="/farmer/home" />
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
            
           <Card style={{width:'40rem',height:'15rem',borderRadius:'30px',opacity:1,backgroundColor:"rgb(212,212,212",marginTop:"15vh"}}>
                <Form onSubmit={handleSubmit} ref={form}>
                    <Card.Body>
                        <div style={{textAlign:'center',fontSize:'20px',color:'black',marginTop:'6vh'}}>
                        <strong>Are you sure, You want to accept the Order ?</strong>  
                        </div>
                    </Card.Body>
                
                    <div style={{marginLeft:'10vw',marginTop:'3vh'}}>
                        <button className="btn btn-primary btn-block" style={{borderRadius:'50px',width:'110px',height:'39px'}}>Accept Order</button>
                    </div>
                    <div style={{marginLeft:'20vw',marginTop:'-5.4vh'}}>
                    <Link to={`/farmer/home`}>
                        <button className="btn btn-danger btn-block" style={{borderRadius:'50px'}}>Go Back</button>
                    </Link>
                </div>
                
                </Form>
            </Card>
               
        

        </div >
    );
}

export default FarmerAgreeOrder;