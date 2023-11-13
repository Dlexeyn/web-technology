import React, {useEffect, useState} from 'react'
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Chart, {Legend, LinearScale, LineElement, PointElement, Title, Tooltip} from "chart.js/auto";
import {CategoryScale} from 'chart.js';
import LineChart from "./lineChart";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function DrawHistory(){
	const {id} = useParams();
	const [data, setData] = useState({ datasets: [] });
	const navigate = useNavigate();

	useEffect(() => {
		axios.get('http://localhost:5000/stocks/history/' + id)
			.then(res => {
				let xData = [];
				let yData = [];

				for (let i = res.data.stocks.length - 1; i >= 0; i--){
					xData.push(res.data.stocks[i].date);
					yData.push(res.data.stocks[i].open);
				}
				console.log(res.data.label);

				setData({
					labels: xData,
					datasets: [
						{
							label: res.data.label,
							data: yData,
							fill: false,
							backgroundColor: "rgba(75,192,192,0.2)",
							borderColor: "rgb(75,192,108)"
						},
					],
				});

			})
	}, []);


	return(
		<LineChart chartData={data} />
	);
}