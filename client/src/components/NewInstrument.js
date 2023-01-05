import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams, useNavigate} from "react-router-dom";
import Header from './Header';
import Form from './Form1';
import Button from 'react-bootstrap/esm/Button';
import Form1 from './Form1';


//axios, useEffect, useState, Link

const NewInstrument = (props) => {


    const [errors, setErrors] = useState({
        title: {},
        price: {},
        description: {},
        image: {},
    });

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
        newInstrument, 
        {withCredentials: true}
        )
            .then((res)=>{
                console.log(res);
                console.log(res.data);
                navigate("/home");
            })
            .catch((err)=>{
                console.log(err);
                console.log("err.response:", err.response);
                console.log("err.response.data", err.response.data);
                console.log("err.response.data.errors", err.response.data.errors);
                setErrors(err.response.data.errors);
                return 
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
            {/* <Header
            titleText = {"GearShare"}
            subText = {"Gear for sharing"}
            link = {"/"}
            linkText = {"Home"}
            /> */}

<header>
    <section class = "section-intro bg-primary padding-y-lg">
                <div class ="container">
                <h1>GearShare</h1>
                <h6>Lend & borrow your favorite gear.</h6>
                </div>
                
                </section>
                <Link to ={"/home"}>
                    
                <Button variant = "primary">Home</Button>

                </Link>
                
</header>
<br></br>
            

{/* new Form component  */}
            <Form1
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