
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {BrowserRouter as Router ,Switch ,Route} from 'react-router-dom';
import './App.css';

import {history} from './components/helpers/history';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Contract from './components/ContractFarm/Contract';
import Product from './components/Products/Product';
import PriceBoard from './components/PriceBoard/PriceBoard';
import Future from './components/Future/Future';

import FarmerRegsiter from './components/FarmerDetails/components/FarmerRegister';
import BuyerRegsiter from './components/BuyerDetails/components/BuyerRegister';

import FarmerLogin from './components/FarmerDetails/components/FarmerLogin';
import BuyerLogin from './components/BuyerDetails/components/BuyerLogin';

import BuyerProfile from './components/BuyerDetails/components/BuyerProfile';
import FarmerProfile from './components/FarmerDetails/components/FarmerProfile';

import FarmerHome from './components/FarmerDetails/components/FarmerHome';
import BuyerHome from './components/BuyerDetails/components/BuyerHome';

import FarmerCreateOrder from './components/FarmerDetails/components/FarmerCreateOrder';
import BuyerCreateOrder from './components/BuyerDetails/components/BuyerCreateOrder';

// import FarmerEditProfile from './components/FarmerDetails/components/FarmerEditProfile';
// import BuyerEditProfile from './components/BuyerDetails/components/BuyerEditProfile';

import FarmerOrder from './components/FarmerDetails/components/FarmerOrder';
import BuyerOrder from './components/BuyerDetails/components/BuyerOrder';

import UpdateFarmerOrder from './components/FarmerDetails/components/UpdateFarmerOrder';
import UpdateBuyerOrder from './components/BuyerDetails/components/UpdateBuyerOrder';

import FarmerAgreeOrder from './components/FarmerDetails/components/FarmerAgreeOrder';
import BuyerAgreeOrder from './components/BuyerDetails/components/BuyerAgreeOrder';

import FarmerHistory from './components/FarmerDetails/components/FarmerHistory';
import BuyerHistory from './components/BuyerDetails/components/BuyerHistory';

import FarmerOrderHistory from './components/FarmerDetails/components/FarmerOrderHistory';
import BuyerOrderHistory from './components/BuyerDetails/components/BuyerOrderHistory';

import FarmerNotification from "./components/FarmerDetails/components/FarmerNotification";
import BuyerNotification from "./components/BuyerDetails/components/BuyerNotification";

import FarmerBidOrder from "./components/FarmerDetails/components/FarmerBidOrder";
import BuyerAcceptBid from "./components/BuyerDetails/components/BuyerAcceptBid";
import BuyerRejectBid from "./components/BuyerDetails/components/BuyerRejectBid";

import {clearMessage} from './components/BuyerDetails/actions/messages';
import Header from './components/Header/Header'


function App() {

  const { user: currentUser } = useSelector(state => state.auth)

  const dispatch = useDispatch()

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });
  }, [dispatch])

  // const BLogOut = () => {
  //   dispatch(buyerLogout());
  // }
  // const FLogOut = () => {
  //   dispatch(farmerLogout());
  // }

  return (
    <div className="App">
          <Router history={history}>
        
        
        
          {/* {currentUser?.role == "Buyer" && (
            <Header currentUser={currentUser} LogOut={BLogOut} route={"/buyer/login"} />
            
          )}

          {currentUser?.role == "Farmer" && (
            <Header  currentUser={currentUser} LogOut={FLogOut} route={"/farmer/login"} />

          )}

          {currentUser?.role == "BuyerAdmin" && (
             <Header  currentUser={currentUser} LogOut={BLogOut} route={"/buyer/login"} />
          )}
          {currentUser?.role == "FarmerAdmin" && (
             <Header  urrentUser={currentUser} LogOut={FLogOut} route={"/farmer/login"} />
          )} */}

         
            
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/farmer/login' component={FarmerLogin}/>
            <Route exact path='/buyer/login' component={BuyerLogin}/>

            <Route exact path='/farmer/register' component={FarmerRegsiter}/>
            <Route exact path='/buyer/register' component={BuyerRegsiter}/>

            <Route  path='/buyer/profile' component={BuyerProfile}/>
            <Route  exact path='/farmer/profile' component={FarmerProfile}/>

            {/* <Route  path='/farmer/editprofile' component={FarmerEditProfile}/>
            <Route  path='/buyer/editprofile' component={BuyerEditProfile}/> */}

            <Route  path='/buyer/home' component={BuyerHome}/>
            <Route  path='/farmer/home' component={FarmerHome}/>

            <Route  path='/farmer/order' component={FarmerOrder}/>
            <Route  path='/buyer/order' component={BuyerOrder}/>

            <Route  path='/farmer/createorder' component={FarmerCreateOrder}/>
            <Route  path='/buyer/createorder' component={BuyerCreateOrder}/>

            <Route  path='/farmer/updateorder/:id' component={UpdateFarmerOrder}/>
            <Route  path='/buyer/updateorder/:id' component={UpdateBuyerOrder}/>
            
            <Route  path='/farmer/agreeorder/:id' component={FarmerAgreeOrder}/>
            <Route  path='/buyer/agreeorder/:id' component={BuyerAgreeOrder}/>

            <Route  path='/farmer/bidorder/:id' component={FarmerBidOrder}/>
            <Route  path='/buyer/acceptbid/:id' component={BuyerAcceptBid}/>
            <Route  path='/buyer/rejectbid/:id' component={BuyerRejectBid}/>
            
            <Route  path='/farmer/notification' component={FarmerNotification}/>
            <Route  path='/buyer/notification' component={BuyerNotification}/>
           
            <Route  path='/farmer/history' component={FarmerHistory}/>
            <Route  path='/buyer/history' component={BuyerHistory}/>
            
            <Route  path='/farmer/myhistory' component={FarmerOrderHistory}/>
            <Route  path='/buyer/myhistory' component={BuyerOrderHistory}/>



            <Route  path='/about' component={AboutUs}/>
            <Route  path='/contracts' component={Contract}/>
            <Route  path='/priceboard' component={PriceBoard}/>
            <Route  path='/product' component={Product}/>
            <Route  path='/coming' component={Future}/>
            
          </Switch>
        
      </Router>
      </div>

    
  );
}

export default App;
