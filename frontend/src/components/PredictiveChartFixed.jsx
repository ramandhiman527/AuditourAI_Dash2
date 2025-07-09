import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const PredictiveChart = ({ 
  data = [], 
  title = "Predictive Analytics",
  height = 400 
}) => {
  // Mock data for the chart if no data provided
  const mockData = [
    { name: 'Jan', actual: 120, predicted: 125 },
    { name: 'Feb', actual: 150, predicted: 155 },
    { name: 'Mar', actual: 180, predicted: 175 },
    { name: 'Apr', actual: 220, predicted: 215 },
    { name: 'May', actual: 190, predicted: 195 },
    { name: 'Jun', actual: 240, predicted: 245 },
  ];

  const chartData = data.length > 0 ? data : mockData;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} />
            <Line type="monotone" dataKey="predicted" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PredictiveChart;