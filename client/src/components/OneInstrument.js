import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "./Header";
import Button from "react-bootstrap/esm/Button";

const OneInstrument = (props) => {
    const [instrument, setInstrument] = useState({});
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/Instruments/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                setInstrument(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteInstrument = () => {
        axios
            .delete(`http://localhost:8000/api/instruments/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                navigate("/home");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            {" "}
            <header>
                <section class="section-intro bg-primary padding-y-lg">
                    <div class="container">
                        <h1>GearShare</h1>
                        <h4>Lend & borrow your favorite gear.</h4>
                    </div>
                </section>

                <Link to={"/home"} class="btn btn-info">
                    Home
                </Link>
            </header>
            <br></br>
            <h2>{instrument.title}</h2>
            <p>Borrow for ${instrument.price}/day</p>
            <p>{instrument.description}</p>
            <img src={instrument.image}></img>
            <div>
                <br></br>

                <Button>
                    <button>
                        <Link to={`/instruments/edit/${instrument._id}`}>
                            Edit
                        </Link>
                    </button>
                </Button>
                <br></br>
                <br></br>
                <Button>
                    <button onClick={deleteInstrument}>
                        Delete {instrument.title}
                    </button>
                </Button>
                <p>
            
                                    <Link
                                        to={`/user/profile/${instrument.createdBy?.username}`}
                                    >
                                        {instrument.createdBy?.username}'s Listings
                                    </Link>
                                </p>
                <br></br>
            </div>
        </div>
    );
};
export default OneInstrument;
