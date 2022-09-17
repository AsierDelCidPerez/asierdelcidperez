import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const Grafica = ({data, width, height, lineCharts}) => {
    return (
        <LineChart
          width={width}
          height={height}
          data={data}
          style={{width: width, height: height}}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name"/>
          <YAxis unit={'%'}/>
          <Tooltip />
          <Legend />
          {
            lineCharts.map(line => (
                <Line key={line.id} type="monotone" {...line} unit='%' />
              ))
          }
        </LineChart>
      );
}

export default Grafica