import React from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import f1 from '../images/f1.jpg';


function Future() {
    return (
       
              <div className="landing-page">
            
            <div className="head">
            <img src={f1} className="symbol" alt="farm" />
            
                <h1 className="NFE"><strong>      National Farmer's Exchange      </strong></h1>
           
                <img src={f1} className="symbol-1" alt="farm" />
            

            </div>
            <Navbar bg="white">
                <Nav className="mr-auto">
                <Nav.Link href='/' >Home</Nav.Link>
                <Nav.Link href='/about'>About Us</Nav.Link>
                <Nav.Link href='/product'>Our Products</Nav.Link>
                <Nav.Link href='/coming'>Coming Soon.!</Nav.Link>
               
                
                </Nav>
            </Navbar>  


 <li>
            <h1>PriceBoard</h1>
            <h1>Contract Farming</h1>
</li>           
        </div>
    )
}

export default Future