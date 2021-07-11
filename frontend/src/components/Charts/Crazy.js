import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ChartTable from './ChartTable';
const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};


const Crazy = (props) => {

  const rand = () => Math.floor(Math.random() * 255);

  const genData = () =>
  ({
    labels: ['Activity 1', 'Activity 2', 'Activity 3', 'Activity 4', 'Activity 5', 'Activity 6'],
    datasets: [
      {
        type: 'line',
        label: 'Sites Visited',
        borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        borderWidth: 2,
        fill: false,
        data: props.data.site,
      },
      {
        type: 'bar',
        label: 'Reviews',
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data: props.data.stars,
        borderColor: 'white',
        borderWidth: 2,
      },
      {
        type: 'bar',
        label: 'Referrals',
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data: props.data.referrals,
      },
    ],
  }
  );


  const [data, setData] = useState(genData());



  useEffect(() => {
    const interval = setInterval(() => setData(genData()), 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>

      <Bar data={data} options={options} />
      <ChartTable data={props.data} />
    </>
  );
};

export default Crazy;