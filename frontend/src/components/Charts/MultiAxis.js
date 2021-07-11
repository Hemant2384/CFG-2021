import React from 'react';
import { Line } from 'react-chartjs-2';

import ChartTable from './ChartTable';


const MultiAxisLine = (props) => {
    
    const data = {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [
            {
                label: 'Volunteers Registered',
                data: props.data.registered,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
                yAxisID: 'y-axis-1',
            },
            {
                label: 'Volunteers Attended',
                data: props.data.attended,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                yAxisID: 'y-axis-2',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    id: 'y-axis-1',
                },
                {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    id: 'y-axis-2',
                    gridLines: {
                        drawOnArea: false,
                    },
                },
            ],
        },
    };



    return (
    <div>
            <Line data={data} options={options} />
            <div id = "data-para">
            <br></br>
            <p className="volunteer-profile"><b>DATA:</b></p>
            <hr></hr>
            <p className="volunteer-profile">Registered For Activities: {props.data.registered.reduce((a, b) => parseInt(a) + parseInt(b), 0)}</p>
            <p className="volunteer-profile">Attended For Activities: {props.data.attended.reduce((a, b) => parseInt(a) + parseInt(b), 0)}</p>

            </div>

            </div>
    );
};

export default MultiAxisLine;