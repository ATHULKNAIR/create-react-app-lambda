import React,{useState,useRef} from 'react';
import {Redirect} from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';

import {useDispatch,useSelector} from 'react-redux';
import {farmerLogin} from '../actions/auth';
import {Navbar,Nav} from 'react-bootstrap';


import '../../Header/Header.css';
import './Farmer.css';
import f1 from '../../images/f1.jpg';

import  {FaPhoneSquareAlt} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';


const required = (value)=>{
    if(!value){
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required..!
            </div>
        )
    }
};

const FarmerLogin=(props)=>{
    const form = useRef();
    const checkBtn = useRef();
    
    const [phoneNo ,setPhoneNo] = useState('');
    const [password ,setPassword] = useState('');
    const [loading ,setLoading] = useState(false);

    const {isLoggedIn} = useSelector(state=>state.auth);
    const {message} = useSelector(state=>state.message);

    const dispatch = useDispatch();

    const onChangePhoneNo = (e)=>{
        const phoneNo = e.target.value;
        setPhoneNo(phoneNo)
    };
    const onChangePassword = (e)=>{
        const password = e.target.value;
        setPassword(password);
    };
    const handleLogin=(e)=>{
        e.preventDefault();
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            dispatch(farmerLogin(phoneNo,password))
              .then(()=>{
                  props.history.push('/farmer/profile');
                  window.location.href.reload();
              })
              .catch(()=>{
                  setLoading(false);
              });
        }else{
            setLoading(false);
        }
    };
    if(isLoggedIn){
        return <Redirect to="/farmer/profile" />;
    }

    return (
       <div className="login-page">
          <div className="top">
            {/* <img src={f1} className="symbol" alt="farm" /> */}
            
                <h1 className="NFE"><strong>      National Farmer's Exchange      </strong></h1>
           
                {/* <img src={f1} className="symbol-1" alt="farm" /> */}
            

        
            <Navbar bg="rgba(255,255,255,.5)"  >
                <Nav className="mr-auto">
                <Nav.Link href='/'style={{color:"##040404" }} ><strong>Home</strong></Nav.Link>
                <Nav.Link href='/about' style={{color:"##040404"}}><strong>About Us</strong></Nav.Link>
                {/* <Nav.Link href='/product' style={{color:"##040404"}}><strong></strong><</Nav.Link> */}
                <Nav.Link href='/coming' style={{color:"##040404"}}><strong>Coming Soon...</strong></Nav.Link>
               
                
                </Nav>
            </Navbar>  
            </div>  
            <div className="row">
            <div className='col-md-12'>
            <div className='card card-container'>
                <img src="https://res.cloudinary.com/mycartdb/image/upload/v1621404771/frmr_vrycol.jpg"
                     alt="profile-image"
                     className="profile-img-card" />
                <Form onSubmit={handleLogin} ref={form}>
                    <div className="form-group">
                        <label htmlFor="phoneNo"><FaPhoneSquareAlt/></label>
                        <Input type="text" className="form-control" name="phoneNo" value={phoneNo} placeholder="Enter Phone No."
                               onChange={onChangePhoneNo} validations={[required]} style={{width:'16vw',marginLeft:'-3vw'}} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password"><RiLockPasswordFill/></label>
                        <Input type="password" className="form-control" name="password" placeholder="Enter Password"
                               value={password} onChange={onChangePassword} validations={[required]} style={{width:'16vw',marginLeft:'-3vw'}} />
                    </div>
                
                        <button className="btn btn-primary btn-block" style={{width:'9vw',marginTop:'2vh'}} disabled={loading}> 
                            {loading && (<span className="spinner-border spinner-border-sm"></span>)}
                            <span>Login</span>
                        </button>

  
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                               {message}
                            </div>
                        </div>
                    )}
                    <div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </div>
                    <div style={{marginTop:'5vh', color:'#e5e5e5' , fontSize:'20px'}}><p>New Customer? <a href="/farmer/register"  style={{ color:'#1FF1D0' }}>Register</a></p></div>
                </Form>
                <br/>
                
            </div>
            
        </div>
       </div>
       </div>
    )
}

export default FarmerLogin