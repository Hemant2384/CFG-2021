import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import ChartTable from "./ChartTable";
const ClickEvents = (props) => {
  const rand = () => Math.floor(Math.random() * 255);

  const genData = () => ({
    labels: ['1', '2', '3', '4', '5'],
    datasets: [
      {
        type: "line",
        label: "interests",
        borderColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        borderWidth: 2,
        fill: false,
        data: props.data[0],
      },
      {
        type: "bar",
        label: "cities",
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data:props.data[1],
        borderColor: "white",
        borderWidth: 2,
      },
      {
        type: "bar",
        label: "status",
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data: props.data[2],
      },
      {
        type: "bar",
        label: "professions",
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data: props.data[3],
      },
      {
        type: "bar",
        label: "total hours committed(100hrs) ",
        backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
        data: props.data[4],
      },
    ],
  });

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

  const data = genData();

  const [clickedDataset, setClickedDataset] = useState("");
  const [clickedElement, setClickedElement] = useState("");
  const [clickedElements, setClickedElements] = useState("");

  const getDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    const datasetIndex = dataset[0].datasetIndex;
    setClickedDataset(data.datasets[datasetIndex].label);
  };

  const getElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];
    setClickedElement(
      `${data.labels[index]} - ${data.datasets[datasetIndex].data[index]}`
    );
  };

  const getElementsAtEvent = (elements) => {
    if (!elements.length) return;

    setClickedElements(elements.length);
  };

  return (
    <>
      <Bar
        data={data}
        options={options}
        getDatasetAtEvent={getDatasetAtEvent}
        getElementAtEvent={getElementAtEvent}
        getElementsAtEvent={getElementsAtEvent}
      />
      <div className="text-center">
        <p>{clickedElement}</p>
        <p>{clickedDataset}</p>
        <p>{clickedElements}</p>
      </div>
    </>
  );
};

export default ClickEvents;
