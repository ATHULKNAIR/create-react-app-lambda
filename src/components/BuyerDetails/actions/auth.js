import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";

  import AuthService from '../services/buyerAuthService';

  export const buyerRegister = (name,email,password,phoneNo,location,gender,product)=>(dispatch)=>{
      return AuthService.register(name,email,password,phoneNo,location,gender,product)
          .then((response)=>{
              dispatch({
                  type : REGISTER_SUCCESS
              })
              dispatch({
                  type : SET_MESSAGE,
                  payload : response.data.message
              });
              return Promise.resolve();
          },
          (error)=>{
              const message = (error.response && error.response.data &&
                               error.response.data.message) || error.message || error.toString();
        
              dispatch({
                  type : REGISTER_FAIL
              });
              dispatch({
                  type : SET_MESSAGE,
                  payload : message
              });
              return Promise.reject();
          });
  };

  export const buyerLogin = (phoneNo,password)=>(dispatch)=>{

    return AuthService.login(phoneNo,password)
      .then((data)=>{
          dispatch({
              type : LOGIN_SUCCESS,
              payload : {user : data}
          });

          return Promise.resolve();
      },(error)=>{
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
      })

  }

  export const buyerLogout = () =>(dispatch)=>{
      AuthService.logout();

      dispatch({
          type :LOGOUT
      });
  };