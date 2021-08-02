import axios from 'axios';
import farmerAuthHeader from './farmerAuthHeader';

const url = "http://nfe-app.herokuapp.com"

const getFarmerProfile = () => {
    return axios.get(`${url}/farmer/profile`, {
        headers: farmerAuthHeader()
    });
}
const editFarmerProfile = ( photo,name, phoneNo,location,product)=>{
    return axios.patch(`${url}/farmer/editprofile`,{
        photo, name, phoneNo,location,product
    },{headers:farmerAuthHeader()})
};

const getFarmerHome = () => {
    return axios.get(`${url}/farmer/home`, {
        headers: farmerAuthHeader()
    });
}
const createFarmerOrder = (product, quantity, baseRate, dueDate) => {
    return axios.post(`${url}/farmer/order`, {
        product, quantity, baseRate, dueDate
    }, { headers: farmerAuthHeader() });
}
const getFarmerOrder = () => {
    return axios.get(`${url}/farmer/order`, {
        headers: farmerAuthHeader()
    });
}
const updateFarmerOrder = (id,product, quantity, baseRate, dueDate) => {
    return axios.patch(`${url}/farmer/order/${id}`, {
        product, quantity, baseRate, dueDate
    }, { headers: farmerAuthHeader() });
}
const agreeBuyerOrder = (id) => {
    return axios.put(`${url}/farmer/order/${id}`,{}, {
        headers: farmerAuthHeader()
    });
    
}
const bidBuyerOrder = (id) => {
    return axios.post(`${url}/farmer/order/${id}`,{}, {
        headers: farmerAuthHeader()
    });
}
const getNotification = () => {
    return axios.get(`${url}/farmer/notification`, {
        headers: farmerAuthHeader()
    });
}
const getMyOrderHistory = () => {
    return axios.get(`${url}/farmer/myhistory`, {
        headers: farmerAuthHeader()
    });
}
const getBuyerOrderHistory = () => {
    return axios.get(`${url}/farmer/history`, {
        headers: farmerAuthHeader()
    });
}


export {
     getFarmerProfile, 
     getFarmerHome, 
     createFarmerOrder, 
     getFarmerOrder,
     getBuyerOrderHistory,
     getMyOrderHistory,
     getNotification,
     bidBuyerOrder,
     agreeBuyerOrder,
     updateFarmerOrder,
     editFarmerProfile
    };