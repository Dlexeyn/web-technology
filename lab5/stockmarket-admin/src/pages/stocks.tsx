import axios from "axios";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom"
import {AddStock} from "../components/stocksController/addStock"
import IStock from "../components/Stock";

export default function Stocks({stocks}: { stocks: any }) {
    const [records, setRecords] = useState<IStock[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get<IStock[]>('http://localhost:5000/stocks')
            .then(res => {
                setRecords(res.data)
            })
    }, []);

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                {/*{columns.map((c, i) => (*/}
                {/*    <th key={i}>{c}</th>*/}
                {/*))}*/}
                </thead>

                <tbody>
                {
                    records.map((d, i) => (
                        <tr key={i}>
                            <td>{d.id}</td>
                            <td>{d.label}</td>
                            <td>{d.name}</td>
                            <td>{d.price}</td>
                            <td>
                                <AddStock data={stocks} stock={d}/>
                            </td>
                            <td>
                                <Link to={`/history/${d.id}`} className="btn btn-sm btn-primary">История</Link>
                            </td>
                        </tr>
                    ))
                }
                </tbody>

            </table>
        </div>
    );
}

