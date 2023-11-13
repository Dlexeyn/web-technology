import React, {useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {IBrokerCreate} from "../Broker";

export default function Add() {
    const [inputData, setInputData] =
        useState<IBrokerCreate>({name: '', cash: 0})
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();

        axios.post('http://localhost:5000/brokers', inputData)
            .then(res => {
                alert("Data added Successfully!")
                navigate('/brokers')
            })
            .catch(err => console.log(err));
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' className='form-control'
                               onChange={e=>setInputData({...inputData, name: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor='cash'>Cash:</label>
                        <input type='text' name='cash' className='form-control'
                               onChange={e=>setInputData({...inputData, cash: parseInt(e.target.value)})}/>
                    </div>
                    <br/>
                    <button className='btn btn-success'>Добавить</button>
                </form>
            </div>
        </div>
    )
}

