import React from "react";
import {Table} from 'react-bootstrap'

function ChartTable(props) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <b>Sites Visited</b>
            </th>
            <th>
              <b>Reviews</b>
            </th>
            <th>
              <b>Referrals</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>
              {" "}
              {props.data.site.map((item) => (
                <td>{item}</td>
              ))}
            </td>
            <td>
              {" "}
              {props.data.stars.map((item) => (
                <td>{item}</td>
              ))}
            </td>
            <td>
              {" "}
              {props.data.referrals.map((item) => (
                <td>{item}</td>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default ChartTable;
