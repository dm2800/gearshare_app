import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';


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
                <section class = "section-intro bg-primary padding-y-lg">
                <div class ="container">
                <h1>GearShare</h1>
                <h6>Lend & borrow your favorite gear.</h6>
                </div>
                </section>
                <Link to ={"/new"}>
                    
                    <Button variant = "info">List Your Gear</Button>
                    
                </Link>
            </header>


            <Nav
      activeKey="/home"
      onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
    >
      <Nav.Item>
        <Nav.Link href="/home">Guitars</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1">Drums</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Bass</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="Keyboards/Piano" disabled>
          Disabled
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

<div class = "row">
            {
                instrumentList.map((instrument, index)=> (
                    <div class = "col-lg-3 col-md-6 col-sm-6">
                        <figure class = "card card-product-grid">
                        <div class ="img-wrap">
                                <img src = {instrument.image}/>
                            </div>
                            <figcaption class="info-wrap border-top">
                                <Link to = {`/instruments/${instrument._id}`}>{instrument.title}</Link>
                            <div class = "price-wrap">
                            <p>Borrow for ${instrument.price}/day</p>
                            </div>
                                <p>{instrument.description}</p>
                            </figcaption>
                            
                            
                        </figure>
                    </div>
                ))
            }

</div>

        </div>
    )

}

export default AllInstruments;