import logo from './logo.svg';
import './App.css';
import React, {useEffect} from "react";
import axios from "axios";
import {BrowserRouter, Routes, Route } from "react-router-dom";
import AllInstruments from './components/AllInstruments';
import NewInstrument from './components/NewInstrument';
import OneInstrument from './components/OneInstrument';
import EditInstrument from './components/EditInstrument';
import LogReg from './views/LogReg';
import Profile from './components/Profile';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route element={<LogReg/>} path="/" />
        <Route element = {<AllInstruments/>} path="/home"/>
        <Route element = {<NewInstrument/>} path="/new"/>
        <Route element = {<OneInstrument/>} path="/instruments/:id"/>
        <Route element = {<EditInstrument/>} path="/instruments/edit/:id"/>
        <Route element = {<Profile/>} path="/user/profile/:username"/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
