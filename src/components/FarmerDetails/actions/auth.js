import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SET_MESSAGE,
  } from "./types";

  import AuthService from '../services/farmerAuthService';

  export const farmerRegister = (name,phoneNo,password,location,gender,product)=>(dispatch)=>{
      return AuthService.register(name,phoneNo,password,location,gender,product)
        .then((response)=>{
            dispatch({
                type: REGISTER_SUCCESS
            })
            dispatch({
                type:SET_MESSAGE,
                payload:response.data.message
            });
            return Promise.resolve();
        },
        (error)=>{
            const message = (error.response && error.response.data &&
                            error.response.data.message) ||
                            error.message || error.toString();
                dispatch({
                    type : REGISTER_FAIL
                });
                dispatch({
                    type : SET_MESSAGE,
                    payload : message
                });
                return Promise.reject();
        })
  };

  export const farmerLogin = (phoneNo,password)=>(dispatch)=>{
      
    return AuthService.login(phoneNo,password)
      .then((data)=>{
          dispatch({
              type: LOGIN_SUCCESS,
              payload : {user: data}
          });
          return Promise.resolve();
      },
      (error)=>{
        const message = (error.response && error.response.data &&
                         error.response.data.message) ||
                         error.message || error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
      });
  };

  export const farmerLogout =()=>(dispatch)=>{
      window.localStorage.removeItem("farmer");
      AuthService.logout();

      dispatch({
          type:LOGOUT
      });
  };