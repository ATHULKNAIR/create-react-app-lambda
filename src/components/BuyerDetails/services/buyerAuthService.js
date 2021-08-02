import axios from 'axios';

const url = "http://nfe-app.herokuapp.com"

class AuthService {

    login(phoneNo,password){
        return axios.post(`${url}/buyer/login`,{
            phoneNo,password
        })
        .then(res=>{
            if(res.data.accessToken){
                localStorage.setItem("buyer",JSON.stringify(res.data))
            }
            return res.data;
        });
    }

    logout(){
        localStorage.removeItem("buyer");
    }

    register(name,email,password,phoneNo,location,gender,product){
        return axios.post(`${url}/buyer/register`,{
            name,email,password,phoneNo,location,gender,product
        });
    }

    getCurrentUser(){
        return JSON.parse(localStorage.getItem("buyer"));
    }
}

export default new AuthService();