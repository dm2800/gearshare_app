import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';

const AllInstruments = (props) => {
    const [instrumentList, setInstrumentList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get("http://localhost:8000/api/instruments")
        .then((res)=> {
            console.log(res);
            console.log("this is the res data", res.data);
            setInstrumentList(res.data)
            console.log("this is instrumentList:", instrumentList);
        })
        .catch((err)=> {
            console.log(err);
        })
    }, [])

    const deleteHandler = (idFromBelow) => {
        axios.delete(`http://localhost:8000/api/instruments/${idFromBelow}`)
            .then((res)=> {
                console.log(res.data);
                setInstrumentList(instrumentList.filter((instrument)=> instrument._id !== idFromBelow))
            })
            .catch((err)=>{
                console.log(err);
            })
    }

    return (
        <div>

            <header>
                <h1>GearShare</h1>
                <Link to ={"/new"}>List Your Gear</Link>
            </header>
            <br></br>

            {/* <Header
            titleText = {"GearShare"}
            subText = {"Gear for sharing"}
            link = {"/"}
            linkText = {"Home"}
            /> */}

            {
                instrumentList.map((instrument, index)=> (
                    <div>
                    <Link to = {`/instruments/${instrument._id}`}>{instrument.title}</Link>
                    <p>${instrument.price}/day</p>
                    <p>{instrument.description}</p>
                    <img src = {instrument.image}/>
                    </div>
                ))
            }

        </div>
    )

}

export default AllInstruments;