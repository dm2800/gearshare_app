import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import styled from "styled-components";

const AllInstruments = (props) => {
    const [instrumentList, setInstrumentList] = useState([]);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/instruments")
            .then((res) => {
                console.log(res);
                console.log("this is the res data", res.data);
                setInstrumentList(res.data);
                console.log("this is instrumentList:", instrumentList);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const deleteHandler = (idFromBelow) => {
        axios
            .delete(`http://localhost:8000/api/instruments/${idFromBelow}`)
            .then((res) => {
                console.log(res.data);
                setInstrumentList(
                    instrumentList.filter(
                        (instrument) => instrument._id !== idFromBelow
                    )
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/users", { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                setUser(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const logout = (e) => {
        axios
            .post(
                "http://localhost:8000/api/users/logout",
                {}, //As a post request we MUST send something with our request.
                //Because we're not adding anuything, we send an empty object.
                {
                    withCredentials: true,
                }
            )
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <main style={{margin: "20px"}}>
            <header>
                <section class="section-intro bg-primary padding-y-lg">
                    <div class="container">
                        <h1>GearShare</h1>
                        <h6>Lend & borrow your favorite gear.</h6>
                    </div>
                </section>

                <div className="d-flex justify-content-between">
                <Link to={"/new"}>
                    <Button variant="primary">List Your Gear</Button>
                </Link>
                <Button style={{color: "white"}}>
                    <Link 
                    style={{color:"white"}}to={`/user/profile/${user.username}`}>
                        {user.username}'s Profile
                    </Link>
                </Button>
                <Button onClick={logout}>Logout</Button>
                </div>
            </header>

            <Nav
                activeKey="/home"
                onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
            >
                <Nav.Item>
                    <Nav.Link eventKey="Guitars">Guitars</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Drums">Drums</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Bass">Bass</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Keyboards/Piano">
                        Keyboards/Piano
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Pro Audio">Pro Audio</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="DJ">DJ</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Recording Gear">
                        Recording Gear
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Woodwinds">Woodwinds</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Brass">Brass</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="Pedals & Amplifiers">
                        Pedals & Amplifiers
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <br></br>

            {/* <Header
            titleText = {"GearShare"}
            subText = {"Gear for sharing"}
            link = {"/"}
            linkText = {"Home"}
            /> */}

            <div class="row">
                {instrumentList.map((instrument, index) => (
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <figure class="card card-product-grid">
                            <div class="img-wrap">
                                <img src={instrument.image} />
                            </div>
                            <figcaption class="info-wrap border-top">
                                <Link to={`/instruments/${instrument._id}`}>
                                    {instrument.title}
                                </Link>
                                <div class="price-wrap">
                                    <p>Borrow for ${instrument.price}/day</p>
                                </div>
                                <p>{instrument.description}</p>
                                <p>
                                    Listed by:
                                    <Link
                                        to={`/user/profile/${instrument.createdBy?.username}`}
                                    >
                                        {instrument.createdBy?.username}
                                    </Link>
                                </p>
                            </figcaption>
                        </figure>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default AllInstruments;

const main = styled.div`
    background-color: aliceblue;
`;
