import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";
import axios from "axios";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import AllInstruments from './components/AllInstruments';
import NewInstrument from './components/NewInstrument';
import OneInstrument from './components/OneInstrument';
import EditInstrument from './components/EditInstrument';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route element = {<AllInstruments/>} path="/"/>
        <Route element = {<NewInstrument/>} path="/new"/>
        <Route element = {<OneInstrument/>} path="/instruments/:id"/>
        <Route element = {<EditInstrument/>} path="/instruments/edit/:id"/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
