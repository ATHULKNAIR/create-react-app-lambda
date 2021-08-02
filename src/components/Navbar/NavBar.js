// import React from 'react'
// import {Navbar, Nav} from 'react-bootstrap'
// import {LinkContainer} from 'react-router-bootstrap';
// import '../Navbar/NavBar.css';

// const NavBar = ({LogOut,route}) => {
//     return (
      
//         <Navbar  bg="primary"  variant="dark" >
//             <LinkContainer to="/">
//   <Navbar.Brand >NFE National Farmer's Exchange</Navbar.Brand>
//   </LinkContainer>
//   <Navbar.Toggle aria-controls="basic-navbar-nav" />
//   <Navbar.Collapse id="basic-navbar-nav">
//     <Nav className="mr-auto">
//       <LinkContainer to="/farmerhome">
//       <Nav.Link>Buyer ad's</Nav.Link>
//       </LinkContainer>
        
//       <LinkContainer to="/aboutus">
//       <Nav.Link>About Us</Nav.Link>
//       </LinkContainer>
//       <LinkContainer to="/bids">
//       <Nav.Link>Bid</Nav.Link>
//       </LinkContainer>
//       <LinkContainer to="/contracts">
//       <Nav.Link>Contracts</Nav.Link>
//       </LinkContainer>
//       <LinkContainer to="/priceboard">
//       <Nav.Link>Price Board</Nav.Link>
//       </LinkContainer>
//       <LinkContainer to="/products">
//       <Nav.Link>Products</Nav.Link>
//       </LinkContainer>
      
//     </Nav>
//   </Navbar.Collapse>
//   <div>
//             <a href={route} onClick={LogOut}  ><button className="btn btn-danger" >
//                     LogOut
//                 </button>

//                 </a>
//             </div>
//             </Navbar>
  
//     )
// }

// export default NavBar