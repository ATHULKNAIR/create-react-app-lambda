import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from 'react-router-dom'

import { createFarmerOrder, getFarmerOrder, getFarmerProfile } from '../services/farmerService';
import { farmerLogout } from '../actions/auth'
import Header from '../../Header/Header';
import '../../Header/Header.css';

import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const FarmerOrder = (props) => {
    const dispatch = useDispatch()
    const [farmer, setFarmer] = useState("");
    const [order, setOrder] = useState("");
    useEffect(() => {
       loadOrder();
    }, []);

    const loadOrder=()=>{
        getFarmerOrder().then(
            (response) => {
                const order = response.data
                setOrder(order);
                console.log(order)
            },
            (error) => {
                const order =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setOrder(order);
            }
        );
    }
    useEffect(() => {
        getFarmerProfile().then(
            (response) => {
                const farmer = response.data
                setFarmer(farmer);
                console.log(farmer)
            },
            (error) => {
                const _farmer =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setFarmer(_farmer);
            }
        );
    }, []);

    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState("");
    const [baseRate, setBaseRate] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [successful, setSuccessful] = useState(false);

    const onChangeProduct = (e) => {
        const product = e.target.value;
        setProduct(product)
    }
    const onChangeQuantity = (e) => {
        const quantity = e.target.value;
        setQuantity(quantity)
    }
    const onChangeBaseRate = (e) => {
        const baseRate = e.target.value;
        setBaseRate(baseRate)
    }
    const onChangeDueDate = (e) => {
        const dueDate = e.target.value;
        setDueDate(dueDate)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSuccessful(false);

        createFarmerOrder(product, quantity, baseRate, dueDate)
            .then(() => {
                setSuccessful(true);
                setShow(false);
                loadOrder();
                setProduct("")
                setQuantity("")
                setBaseRate("")
                setDueDate("")
                props.history.push('/farmer/order');
                window.location.href.reload();

            })
            .catch(() => {
                setSuccessful(false);
            });

        if (successful) {
            return <Redirect to="/farmer/order" />
        }

    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const FLogOut = () => {
        dispatch(farmerLogout());
    }

    return (
        <div >
            <Header LogOut={FLogOut} route={'/farmer'} user={farmer.name} photo={farmer.photo} Seen={farmer.isSeen} />

            <br />
            <div >
                
                    <button style={{
                        width: '300px', marginLeft: '65px', height: '40px',
                        backgroundColor: 'lightblue', fontSize: '20px', borderRadius: '20px'
                    }} onClick={handleShow}><strong>Create Order</strong></button>
            </div>
            <div>
                <ul>
                    {order &&
                        order?.map((orders, index) =>
                            <div key={index}>

                                {orders?.isActive === true &&
                                    <div style={{
                                        backgroundColor: 'rgb(212, 245, 212)', height: '20rem',
                                        margin: '10px 30px', borderRadius: '20px', padding: '20px', border: 'solid 2px lightgreen'
                                    }} >
                                        <Card.Header style={{ color: "white", background: "darkcyan", padding: '3px' }}
                                            Align='center'
                                        >ID : {orders._id}</Card.Header>

                                        <Card.Body style={{ fontSize: "20px" ,color:"black"}}>
                                            <div style={{ marginTop: '-5vh', marginLeft: '5vw' }}>
                                                <br />Posted On : <strong>{orders.postedDate}</strong>
                                            </div>

                                            <div style={{ marginLeft: '10vw' }}>
                                                <br />Product : <strong>{orders.product}</strong>
                                                <br /> quantity : <strong>{orders.quantity}</strong> Kg
                                                <br /> Base Price : <strong>{orders.baseRate}</strong> Rs/Kg
                                                <br />Due Date : <strong>{orders.dueDate}</strong>

                                                <br /><br />
                                            </div>


                                            <div style={{ marginLeft: '80vw', marginTop: '-30vh' }}>
                                                {orders.isActive === true &&
                                                    <a href={`/farmer/updateorder/${orders._id}`}>
                                                        <button className="btn btn-primary"
                                                        >Edit Order</button>
                                                    </a>
                                                }</div>

                                        </Card.Body>
                                    </div>}
                                {orders?.isActive === false &&
                                    <div style={{
                                        backgroundColor: '#EBA49F', height: '15rem',
                                        margin: '10px 30px', borderRadius: '20px', padding: '20px'
                                    }} >
                                        <Card.Header style={{ color: "white", background: "brown", padding: '3px' }}
                                            Align='center'
                                        >ID : {orders._id}</Card.Header>

                                        <Card.Body style={{ fontSize: "20px",color:'black' }}>

                                            {orders.isActive === false &&
                                                <div style={{ marginLeft: '10vw' }}>

                                                    Sold To : <strong>{orders.boughtBy.name}</strong>
                                                    <br /> Contact : <strong>{orders.boughtBy.phoneNo}</strong>
                                                    <br />Location : <strong>{orders.boughtBy.location}</strong>
                                                    <br />

                                                </div>
                                            }
                                            <div style={{ marginTop: '-17vh', marginLeft: '33vw' }}>
                                                <br />Posted On : <strong>{orders.postedDate}</strong>
                                                <br />Due Date : <strong>{orders.dueDate}</strong>
                                                <br /> Agreed On : <strong>{orders.agreedDate}</strong>

                                            </div>
                                            <div style={{ marginLeft: '60vw', marginTop: '-8vw' }}>
                                                <br />Product : <strong>{orders.product}</strong>
                                                <br /> Quantity : <strong>{orders.quantity} Kg</strong>
                                                <br /> Base Price : <strong>{orders.baseRate} Rs/Kg</strong>


                                            </div>


                                            {/* <br />isActive :{JSON.stringify(orders.isActive)} */}

                                        </Card.Body>
                                    </div>}

                            </div>)}

                </ul>
                <Modal show={show} onHide={handleClose} style={{ marginLeft: '-4vw', marginTop: '21vh' }} >

                    <Modal.Header style={{ opacity: 1, backgroundColor: "#0a421b", color: "white", width: '40vw', position: 'sticky', marginTop: '0vh' }}>
                        <Modal.Title style={{ marginLeft: '15vw' }}>Create Order</Modal.Title>
                        <Button variant="light" onClick={handleClose} style={{ marginTop: '-2vh', fontSize: "12px" }}>
                            <strong>X</strong> </Button>
                    </Modal.Header>
                    <Modal.Body style={{ backgroundColor: 'rgb(212, 245, 212)', border: 'solid rgb(192, 245 , 192) 5px', width: '40vw', height: '62vh' }}>

                        <Form.Group controlId="formFile" className="mb-0">
                            <Form.Label style={{ fontSize: '20px' }}><strong>Product</strong></Form.Label>
                            <input type="text" style={{ marginLeft: '7.4vw', marginTop: '5px', width: '260px', border: 'solid green 2px' ,paddingLeft:'20px'}}
                                name="product" value={product} onChange={onChangeProduct} />
                        </Form.Group>

                        <Form.Group controlId="formFileMultiple" className="mb-0" style={{ marginTop: '-2vh' }}>
                            <Form.Label style={{ fontSize: '20px' }}><strong>Quantity in Kg</strong></Form.Label>
                            <input type="text" style={{
                                marginLeft: '60px', marginTop: '5px',
                                width: '260px', padding: '0px 0px 0px 30px', border: 'solid green 2px' ,paddingLeft:'20px'
                            }}
                                name="quantity" value={quantity} onChange={onChangeQuantity} />
                        </Form.Group>
                        <Form.Group controlId="formFileMultiple" className="mb-0" style={{ marginTop: '-2vh' }}>
                            <Form.Label style={{ fontSize: '20px' }}><strong>Base Rate</strong></Form.Label>
                            <input type="text" style={{
                                marginLeft: '6.2vw', marginTop: '5px',
                                width: '260px', padding: '0px 0px 0px 30px', border: 'solid green 2px' ,paddingLeft:'20px'
                            }}
                                name="baseRate" value={baseRate} onChange={onChangeBaseRate} />
                        </Form.Group>

                        <Form.Group controlId="formFileDisabled" className="mb-0" style={{ marginTop: '-2vh' }}>
                            <Form.Label style={{ fontSize: '20px' }}><strong>Due Date</strong> </Form.Label>
                            <input type="text" style={{ marginLeft: '6.8vw', marginTop: '5px', width: '260px', border: 'solid green 2px' ,paddingLeft:'20px'}}
                                name="dueDate" value={dueDate} onChange={onChangeDueDate} />
                        </Form.Group>



                        <Button variant='secondary ' onClick={handleSubmit} style={{ marginLeft: '11vw', marginTop: '4vh', width: '13vw', height: '6vh', backgroundColor: '#0a421b' }}>
                            Create Order
       </Button>

                    </Modal.Body>

                </Modal>

            </div>


        </div >
    );
}

export default FarmerOrder;