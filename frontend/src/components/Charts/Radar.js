import { getDefaultNormalizer } from '@testing-library/react';
import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';
import ChartTable from './ChartTable';
import '../../pages/AdminPanel/VolunteerProgress.css'

function RadarChart(props) {

    const options = {
        scale: {
            ticks: { beginAtZero: true },
        },
    };
    
    var data_sites = {
        labels: ['interests', 'cities', 'status', 'professions', 'total hours committed(100hrs)'],
        datasets: [
            {
                data: props.data,
                label: 'Radial View of the Organization',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            {console.log(data_sites)}
            <Radar data={data_sites} options={options} />
            <div id = "data-para">
            <br></br>
            <p className="volunteer-profile"><b>DATA:</b></p>
            <hr></hr>
            <p className="volunteer-profile">Interests: {props.data[0]}</p>
            <p className="volunteer-profile">Cities: {props.data[1]}</p>
            <p className="volunteer-profile">Active: {props.data[2]}</p>
            <p className="volunteer-profile">Professions: {props.data[3]}</p>
            <p className="volunteer-profile">Total Duration: {props.data[4] * 100} hrs</p>
            </div>
        </div>
    );
}

export default RadarChart





