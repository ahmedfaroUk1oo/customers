import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, PointElement);

export default function Chart({customerTransations, selectedCustomer}) {
  const data = {
    labels: customerTransations?.map(trans=>trans.date),
    datasets: [
      {
        label: `Transactions for ${selectedCustomer.name}`,
        data: customerTransations?.map(trans=>trans.amount),
        backgroundColor: '#334155',
        borderColor: '#334155',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

