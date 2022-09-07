import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import Header from './Header';



const OneInstrument = (props) => {

    const [instrument, setInstrument] = useState({});

    const{id} = useParams();

    const navigate = useNavigate();



    useEffect(()=> {
        axios.get(`http://localhost:8000/api/Instruments/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                setInstrument(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [id])

    const deleteInstrument = ()=> {
        axios.delete(`http://localhost:8000/api/instruments/${id}`)
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err)=> console.log(err))
    }

    return(
        <div>

            <Header
            titleText = {instrument.title}
            link = {"/new"}
            linkText = {"Add New Instrument"}
            />

        <Link to = {'/'}>Home</Link>

            <p>Rent for ${instrument.price}/day</p>
            <p>{instrument.description}</p>
            <img src = {instrument.image}></img>
            <div>
            <button onClick={deleteInstrument}>
                Delete {instrument.title}
            </button>
            <Link to= {`/instruments/edit/${instrument._id}`}>Edit</Link>
            </div>
        </div>
    )
}
export default OneInstrument;