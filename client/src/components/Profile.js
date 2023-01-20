import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import {Button} from "react-bootstrap";

const Profile = (props) => {
    const { username } = useParams();
    const [userInstrumentList, setInstrumentUserList] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/instrumentsbyuser/${username}`, {
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                setInstrumentUserList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <div style={{ textAlign: "center", margin:"10px"}}>

<section class="section-intro bg-primary padding-y-lg">
                    <div class="container">
                        <h1>GearShare</h1>
                        <h6>Lend & borrow your favorite gear.</h6>
                    </div>
                </section>
            <h1 style={{color: "black"}}>{username}'s Listings</h1>
            {userInstrumentList.map((instrument, index) => (
                <div key={index}>
                    <img src={instrument.image}></img>
                    <div>
                        <Link style = {{color:"white", fontSize:"large"}}to={`/instruments/${instrument._id}`}>
                            {instrument.title}
                        </Link>
                    </div>
                    <p style={{color:"white"}}>{instrument.description}</p>
                    <p style={{color:"white"}}>Borrow for ${instrument.price}/day</p>
                </div>
            ))}

                    <Link to ={"/home"}>
                    
                    <Button variant = "primary">Home</Button>
    
                    </Link>
        </div>
    );
};

export default Profile;
