import React from "react";
// import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import {
  BarChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

import Title from "./Title";

// Generate Sales Data
function createData(name, uv, mes, amt) {
  return { name, uv, mes, amt };
}

const data = [
  createData("Enero", 3124, 3213, 2400),
  createData("Febrero", 1244, 3123, 2400),
  createData("Marzo", 3123, 1244, 2400),
  createData("Mayo", 3213, 3213, 2400),
  createData("Junio", 4324, 3213, 2400),
  createData("Julio", 5433, 5433, 2400),
  createData("Agosto", 5435, 5435, 2400),
  createData("Septiembre", 1321, 5435, 2400),
];

export default function Chart() {
  return (
    <React.Fragment>
      <Title>Numero de cupones</Title>
      <ResponsiveContainer>
        <BarChart
          data={data}
          width={500}
          height={300}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="mes" fill="#8884d8" />
          {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
