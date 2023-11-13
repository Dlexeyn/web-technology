import React from "react";
import { Line } from "react-chartjs-2";
function LineChart({ chartData }) {
	return (
		<div className="chart-container">
			<h2 style={{ textAlign: "center" }}>История</h2>
			<Line
				data={chartData}
				options={{
					plugins: {
						legend: {
							display: true
						}
					}
				}}
			/>
		</div>
	);
}
export default LineChart;