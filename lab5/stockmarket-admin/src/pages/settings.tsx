import axios from "axios";
// @ts-ignore
import React, {useEffect, useState} from "react";
import StocksList from "../components/settingsContrroller/StocksList"
import io, {Socket} from "socket.io-client"
// @ts-ignore
import {initSettings, ISettings} from "../components/Settings.tsx";
import IStock from "../components/Stock";
import IAnswer from "../components/Stock";

export default function Settings(data: any){

    const [socket, setSocket] = useState<Socket>();
    const [settings, setSettings] = useState<ISettings>(initSettings);
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        const newSocket = io('http://localhost:5001', { transports : ['websocket'] })
        setSocket(newSocket);
    }, [setSocket])

    useEffect(() => {
        axios.get<ISettings>('http://localhost:5000/settings/')
            .then(res => {
                setSettings(res.data);
                console.log(res.data)
            })
    }, []);

    function changeHandlerSpeed(event: React.ChangeEvent<HTMLInputElement>) {
        let value = (event.target as HTMLInputElement).value.replace(/\D/g, '');
        setSettings({
            startDate: settings.startDate,
            dateChangeSpeed: parseInt(value),
            usedStocks: settings.usedStocks,
            isStarted: settings.isStarted,
            currentDate: settings.currentDate
        })
    }

    function changeHandlerDate(event: React.ChangeEvent<HTMLInputElement>){
        setSettings({
            startDate: (event.target as HTMLInputElement).value,
            dateChangeSpeed: settings.dateChangeSpeed,
            usedStocks: settings.usedStocks,
            isStarted: settings.isStarted,
            currentDate: settings.currentDate
        })
    }

    function submitHandler(event: React.FormEvent) {
        event.preventDefault();
        setSettings({
            startDate: settings.startDate,
            dateChangeSpeed: settings.dateChangeSpeed,
            usedStocks: settings.usedStocks,
            isStarted: !settings.isStarted,
            currentDate: settings.startDate
        })
        if (!settings.isStarted) {
            let usedStocks = [];
            data.stocks.forEach((item) => {
                usedStocks.push(item.stock);
            })
            axios.put('http://localhost:5000/settings/', {
                startDate: settings.startDate,
                dateChangeSpeed: settings.dateChangeSpeed,
                usedStocks: usedStocks,
                isStarted: true,
                currentDate: settings.startDate
            }).then(res => {
                socket?.open();
                socket?.emit('update')
            });
        } else {
            console.log("stop");
            socket?.emit('stop');
            socket?.close();
            axios.put('http://localhost:5000/settings/', {
                startDate: settings.startDate,
                dateChangeSpeed: settings.dateChangeSpeed,
                usedStocks: [],
                isStarted: false,
                currentDate: settings.startDate
            });
        }

    }

    const updatingStockListener = (stocks: IAnswer) => {
        console.log('updatingStockListener:');
        console.log(stocks);
        setStocks(stocks.updatedStocks);
        setSettings({
            startDate: settings.startDate,
            dateChangeSpeed: settings.dateChangeSpeed,
            usedStocks: settings.usedStocks,
            isStarted: settings.isStarted,
            currentDate: stocks.newTime
        })
    }

    useEffect(() => {
        socket?.on('update', updatingStockListener);
        return () => {
            socket?.off('update', updatingStockListener)
        };
    }, [updatingStockListener])

    return(
        <form onSubmit={submitHandler} className="d-flex w-full justify-content-center align-items-center">
            <div className='w-50 border bg-light p-5'>
                <h3 className="mb-4">Настройки торгов</h3>
                <div className='mb-4'>
                    Текущая Дата:
                    <input  type='date'
                            disabled={true}
                            value={settings.currentDate}
                            className="border py-2 px-4 mb-2 w-full outline-0"
                    />
                </div>
                <div className='mb-4'>
                    Начальная Дата:
                    <input type='date'
                           disabled={settings.isStarted}
                           value={settings.startDate}
                           className="border py-2 px-4 mb-2 w-full outline-0"
                           id="startDate"
                           onChange={changeHandlerDate}
                    />
                </div>

                <div className="mb-4">
                    Скорость смены дат :
                    <input
                        disabled={settings.isStarted}
                        type="number"
                        value={settings.dateChangeSpeed}
                        className="border py-2 px-4 mb-2 w-full outline-0"
                        onChange={changeHandlerSpeed}
                    />
                </div>
                <div className="mb-4 flex items-center justify-between">
                    <StocksList stocks={stocks}></StocksList>
                </div>

                <div className="flex items-center justify-between">
                    {!settings.isStarted && <button type="submit"
                                           className="btn btn-sm btn-primary">
                        Начать торги</button>}
                    {settings.isStarted && <button type="submit"
                                          className="btn btn-sm btn-danger">
                        Закончить</button>}
                </div>

            </div>
        </form>
    );
}