import axios from 'axios';
import buyerAuthHeader from './buyerAuthHeader';

const url = "http://nfe-app.herokuapp.com"

const getBuyerProfile = () =>{
    return axios.get(`${url}/buyer/profile`,{
        headers:buyerAuthHeader()
    });
}
const editBuyerProfile = (photo, name,email, phoneNo,location,product)=>{
    return axios.patch(`${url}/buyer/editprofile`,{
        photo, name, email,phoneNo,location,product
    },{headers:buyerAuthHeader()})
};
const getBuyerHome = ()=>{
    return axios.get(`${url}/buyer/home`,{
        headers : buyerAuthHeader()
    });
}
const createBuyerOrder = (product,quantity,baseRate,dueDate) =>{
    return axios.post(`${url}/buyer/order`,{
        product,quantity,baseRate,dueDate
    },{headers : buyerAuthHeader()});
}
const getBuyerOrder = () => {
    return axios.get(`${url}/buyer/order`, {
        headers: buyerAuthHeader()
    });
}
const updateBuyerOrder = (id,product, quantity, baseRate, dueDate) => {
    return axios.patch(`${url}/buyer/order/${id}`, {
        product, quantity, baseRate, dueDate
    }, { headers: buyerAuthHeader() });
}
const agreeFarmerOrder = (id) => {
    return axios.get(`${url}/buyer/order/${id}`, {
        headers: buyerAuthHeader()
    });
}
const getNotification = () => {
    return axios.get(`${url}/buyer/notification`, {
        headers: buyerAuthHeader()
    });
}
const getMyOrderHistory = () => {
    return axios.get(`${url}/buyer/myhistory`, {
        headers: buyerAuthHeader()
    });
}
const getFarmerOrderHistory = () => {
    return axios.get(`${url}/buyer/history`, {
        headers: buyerAuthHeader()
    });
}
const rejectFarmerBid =(id)=>{
    return axios.put(`${url}/buyer/order/${id}`,{},{
        headers:buyerAuthHeader()
    });
}
const acceptFarmerBid = (id)=>{
    return axios.post(`${url}/buyer/order/${id}`,{},{
        headers:buyerAuthHeader()
    });
}

export  {
    getBuyerProfile,
    editBuyerProfile,
    getBuyerHome,
    createBuyerOrder,
    getBuyerOrder,
    updateBuyerOrder,
    agreeFarmerOrder,
    rejectFarmerBid,
    acceptFarmerBid,
    getNotification,
    getMyOrderHistory,
    getFarmerOrderHistory

};