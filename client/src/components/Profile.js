import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

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
        <div style={{ textAlign: "center" }}>
            <h1 style={{color: "black"}}>{username}'s Listings</h1>
            {userInstrumentList.map((instrument, index) => (
                <div key={index}>
                    <img src={instrument.image}></img>
                    <div>
                        <Link to={`/instruments/${instrument._id}`}>
                            {instrument.title}
                        </Link>
                    </div>
                    <p>{instrument.description}</p>
                    <p>Borrow for ${instrument.price}/day</p>
                </div>
            ))}
        </div>
    );
};

export default Profile;
