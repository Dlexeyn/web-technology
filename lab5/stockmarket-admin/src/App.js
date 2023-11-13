import React, {Component} from 'react';
import './App.css';
import { Route, Routes} from 'react-router-dom'
import Navbar from "./components/Navbar.tsx";
import Brokers from "./pages/brokers.tsx";
import Add from "./components/brokerController/add.tsx";
import Stocks from "./pages/stocks.tsx";
import {DrawHistory} from "./components/stocksController/stockHistory";
import Settings from "./pages/settings.tsx";
import {useSelector} from "react-redux";
import Edit from "./components/brokerController/edit.tsx";


export default function App(){

    const stocks = useSelector(state => state);

    return (
        <div>
            <Navbar></Navbar>
            <Routes>
                <Route path="/brokers" element={ <Brokers />}></Route>
                <Route path='create' element={<Add/>}/>
                <Route path='update/:id' element={<Edit/>}/>
                <Route path="/stocks" element={ <Stocks stocks={stocks}/>}></Route>
                <Route path='history/:id' element={<DrawHistory/>}/>
                <Route path="/settings" element={<Settings stocks={stocks}/>}/>
            </Routes>
        </div>
    );
}