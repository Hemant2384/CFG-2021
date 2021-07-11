import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./VolunteerProgress.css";

import Crazy from "../../components/Charts/Crazy";
import MultiAxisLine from "../../components/Charts/MultiAxis";
import RadarChart from "../../components/Charts/Radar";
import ClickEvents from "../../components/Charts/ClickEvents";
import { Radar } from "react-chartjs-2";
import Profile from "./Profile";
function VolunteerProgress(props) {
  const [index, setIndex] = useState(0);
  const [disabledNext, setdisabledNext] = useState(false);
  const [disabledPrev, setdisabledPrev] = useState(false);
  const [chartNum, setChartNum] = useState(0);
  const togglePrev = (e) => {
    setIndex(index - 1);
    setdisabledPrev(false);
    if (index <= 0) {
      e.preventDefault();
      setIndex(0);
      setdisabledPrev(true);
    }
    setdisabledNext(false);
  };

  const toggleNext = (e) => {
    setIndex(index + 1);
    setdisabledNext(false);
    if (index === props.volunteers.length - 1) {
      e.preventDefault();
      setIndex(props.volunteers.length - 1);
      setdisabledNext(true);
    }
    setdisabledPrev(false);
  };

  const data_collector = [[], [], [], [], []];

  for (var i = 0; i <= props.volunteers.length - 1; i++) {
    data_collector[0].push(props.volunteers[i].interest);
    data_collector[1].push(props.volunteers[i].city);
    data_collector[2].push(props.volunteers[i].status);
    data_collector[3].push(props.volunteers[i].profession);
    data_collector[4].push(props.volunteers[i].duration);
    console.log("asdf", data_collector);
  }
  const data = [];
  for (var i = 0; i <= 4; i++) {
    function toUniqueArray(a) {
      var newArr = [];
      for (var j = 0; j < a.length; j++) {
        if (newArr.indexOf(a[j]) === -1) {
          newArr.push(a[j]);
        }
      }
      return newArr;
    }
    function repetitionCounter(array, value) {
      var n = 0;
      for (var k = 0; k < array.length; k++) {
        if (array[k] === value) {
          n++;
        }
      }
      return n;
    }
    data[i] = toUniqueArray(data_collector[i]).length;
    data[2] = repetitionCounter(data_collector[2], "Active");
  }
  data[4] =
    data_collector[4].reduce((a, b) => parseInt(a) + parseInt(b), 0) / 100.0;
  console.log(data_collector, "\nCHART DATA", data);

  var data_tmp = {
    registered: [3, 2, 0, 2, 1],
    attended: [1, 1, 0, 2, 1],
  };

  const profile = props.volunteers ? props.volunteers[index] : null;
  if (profile) {
    return (
      <div className="profile">

        <div style={{boxSizing: 'border-box', boxShadow: '0 0px 8px #0A7EEB'}}>
        <h1>Individual Volunteers</h1>
        &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          id="one"
          className="col-12 col-sm-3 col-md-3"
          onClick={togglePrev}
          disabled={disabledPrev}
          size="lg"
        >
          Prev
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          id="two"
          className="col-12 col-sm-3 col-md-3"
          onClick={toggleNext}
          disabled={disabledNext}
          size="lg"
        >
          Next
        </Button>
        <hr></hr>
        <br></br>

        <Profile volunteer={profile} />
        </div>
        <div className="buttons3">
        <Button className="btns3" onClick ={() => setChartNum(1)}>Activity Attendance</Button>  
        <Button className="btns3" onClick ={() => setChartNum(0)}>Organization Progress</Button>  
        {/* <Button className="btns3"  onClick ={() => setChartNum(2)}>Deeper Look</Button>   */}
        </div>
        { chartNum === 0 && 
          <div>
            <h1>Organization Progress</h1>
            <hr></hr>
            <RadarChart data={data} />
          </div>
        }
        { chartNum === 1 && 
          <div>
            <h1>Activity Attendance</h1>
            <hr></hr>
            <MultiAxisLine data={data_tmp} />
          </div>
        }
                {/* { chartNum === 2 && 
          <div>
            <h1>Deeper Look</h1>
            <ClickEvents data={data_collector} />
          </div>
        } */}

       <hr></hr>
       <br></br>
       
        {/* // <Crazy data = {data_tmp} />
            // <ClickEvents data = {data_tmp} />  */}
      </div>
    );
  } else {
    return <h1></h1>;
  }
}

export default VolunteerProgress;
