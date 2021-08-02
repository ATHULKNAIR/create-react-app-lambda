import React from 'react';
import "./Header.css";
import f1 from '../images/f1.jpg';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import Badge from '@material-ui/core/Badge/Badge'
// import { Badge } from 'antd';


function Header({ LogOut, route, user, photo, Seen,Bid }) {
    return (
        <div className="header">
            <div className="head" >
                <img src={f1} className="symbol" alt="farm" />
                <h1 className="NFE"><strong>      National Farmer's Exchange      </strong></h1>
                <img src={f1} className="symbol-1" alt="farm" />
            </div>

            <Navbar className="navbar" bg="white">
                <Nav className="mr-auto">
                    <Nav.Link className="link" href={`${route}/home`} >Home</Nav.Link>
                    <Nav.Link className="link" href={`${route}/profile`}>Profile</Nav.Link>
                    <Nav.Link className="link" href={`${route}/order`}>My Order</Nav.Link>
                    {/* {Bid === true ?
                        <Badge color="error" style={{ marginTop: '-2vh', fontSize: '20px' }} variant="dot"> </Badge>
                        : null
                    } */}


                    <Nav.Link className="link" href={`${route}/notification`}>Notification</Nav.Link>
                    {Seen === false ?
                        <Badge color="secondary" style={{ marginTop: '-2vh', fontSize: '20px' }} variant="dot"> </Badge>
                        : null
                    }


                    <Nav.Link className="link" href={`${route}/history`}>History</Nav.Link>
                </Nav>
                <Nav className='mr-auto-logout' style={{marginLeft:'35vw'}}>
                    <Nav.Link className="username" href={`${route}/profile`}><strong>{user}</strong></Nav.Link>
                    <NavDropdown title={<img className="profile-photo" src={photo} />} >

                        <NavDropdown.Item href={`${route}/createorder`}>Create Order</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href={`${route}/login`} onClick={LogOut}>LogOut</NavDropdown.Item>


                    </NavDropdown>
                </Nav>

            </Navbar>


        </div>
    )
}

export default Header
