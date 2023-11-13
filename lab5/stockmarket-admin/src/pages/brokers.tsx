import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {IBroker} from "../components/Broker";

export default function Brokers() {
    const [records, setRecords] = useState<IBroker[]>([]);
    const navigate = useNavigate();

    function fetchBrokers(){
        axios.get<IBroker[]>('http://localhost:5000/brokers')
            .then(res => {
                setRecords(res.data)
            })
    }

    useEffect(() => {
        fetchBrokers();
    }, []);

    return (
        <div className="container mt-5">
            <div className="text-end">
                <Link to="/create" className="btn btn-success">
                    Добавить +
                </Link>
            </div>
            <table className="table">
                <thead>
                </thead>
                    <td>Id</td>
                    <td>Имя</td>
                    <td>Cash</td>
                <tbody>
                {
                    records.map((d, i) => (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.name}</td>
                            <td>{d.cash.toFixed(3)}</td>
                            <td>
                                <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary">Изменить</Link>
                                <button onClick={e=> handleSubmit(d.id)}
                                        className="btn btn-sm ms-1 btn-danger">Удалить</button>
                            </td>
                        </tr>
                    ))
                }
                </tbody>

            </table>
        </div>
    );

    function handleSubmit(id){
        const conf = window.confirm("Вы действительно хотитет удалить брокера?");
        if(conf){
            axios.delete('http://localhost:5000/brokers/' + id)
                .then(res => {
                    alert("Record successfully has deleted!");
                    fetchBrokers();
                })
                .catch(err => console.log(err))
        }
    }
}
