import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {IBroker} from "../Broker";

export default function Edit(){
    const {id} = useParams();
    const [data, setData] = useState<IBroker>({
        id: 0,
        name: "",
        cash: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get<IBroker>('http://localhost:5000/brokers/' + id)
            .then(res => {
                console.log(res);
                setData(res.data)
            })
    }, []);

    function handleSubmit(event) {
        event.preventDefault();


        axios.put('http://localhost:5000/brokers/' + id, data)
            .then(res => {
                alert("Data update Successfully!")
                navigate('/brokers')
            })
            .catch(err => console.log(err));
    }

    return(
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="id">ID</label>
                        <input type='text' disabled name='id' value={data.id} className='form-control'/>
                    </div>
                    <div>
                        <label htmlFor='name'>Name:</label>
                        <input type='text' name='name' value={data.name} className='form-control'
                               onChange={e => setData({...data, name: e.target.value})}/>
                    </div>
                    <div>
                        <label htmlFor='cash'>Cash:</label>
                        <input type='text' name='cash' value={data.cash} className='form-control'
                               onChange={e => setData({...data, cash: parseInt(e.target.value)})}/>
                    </div>
                    <br/>
                    <button className='btn btn-success'>Изменить</button>
                </form>
            </div>
        </div>
    );
}