import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams, useNavigate} from "react-router-dom";
import Header from './Header';
import Form from './Form';


//axios, useEffect, useState, Link

const NewInstrument = (props) => {

    // const [title, setTitle] = useState("");
    // const [price, setPrice] = useState();
    // const [description, setDescription] = useState("");
    // const [image, setImage] = useState("");


    const [errors, setErrors] = useState({});

    const [newInstrument, setNewInstrument] = useState({
        title: "",
        price: "",
        description: "",
        image: ""
    })

    const navigate = useNavigate();

    const newSubmitHandler = (e)=> {
        e.preventDefault();
        axios.post("http://localhost:8000/api/instruments", 
        newInstrument
        )
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                navigate("/");
            })
            .catch((err)=>{
                console.log(err);
                console.log("err.response:", err.response);
                console.log("err.response.data", err.response.data);
                console.log("err.response.data.errors", err.response.data.errors);
                setErrors(err.response.data.errors);
            })
        }
    
    const onChangeHandler = (e) => {

        // Making a copy of the new Instrument object by using a spread operator.
        const newStateObject = {...newInstrument};
        newStateObject[e.target.name] = e.target.value;

        // title = e.target.value

        if(e.target.name === "checkedField"){
            newStateObject[e.target.name] = e.target.checked;
            console.log("e.target.name = ", e.target.name)
            console.log("e.target.checked = ", e.target.checked)
            setNewInstrument(newStateObject);

        }
        else{
            newStateObject[e.target.name] = e.target.value;
            console.log("e.target.name = ", e.target.name)
            console.log("e.target.value = ", e.target.value)
            //using our setter to set the new copied object equal to our newInstrument object... our Single State Object. 
            setNewInstrument(newStateObject);
        }
    }

    return(
        <div>
{/* new Header component */}
            <Header
            titleText = {"GearShare"}
            subText = {"Gear for sharing"}
            link = {"/"}
            linkText = {"Home"}
            />

{/* new Form component  */}
            <Form
            submitHandler= {newSubmitHandler}
            instrument={newInstrument}
            errors={errors}
            buttonText = {"Add Instrument"}
            onChangeHandler={onChangeHandler}
            />
        </div>
    )
}

export default NewInstrument;