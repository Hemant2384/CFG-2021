import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

import Thread from "./Thread";
function Forum(props) {
  const [data,setData]=React.useState("");
  const [openThread, setOpenThread] = useState(false);
  const [threadID, setThreadID] = useState("");
  const divs = props.data.map((discussion) => {
    const variant = "light";
    const idx = "info";

    return (
      <div className="container">
        {!openThread && (
          <Card
            bg={variant.toLowerCase()}
            key={idx}
            text={variant.toLowerCase() === "light" ? "dark" : "white"}
            style={{ width: "100%" }}
            className="mb-2"
          >
            <Card.Header>
              <em>
                <b>Author: </b>
                {discussion.author}
              </em>
            </Card.Header>
            <Card.Body>
              <Card.Title>{discussion.title}</Card.Title>
              <Card.Text>Engage with fellow Volunteers!</Card.Text>
              <Button
                variant="primary"
                onClick={() => {
                  setThreadID(discussion._id);
                  setOpenThread(true);
                }}
              >
                Open Thread
              </Button>
            </Card.Body>
            {discussion.postdate !== undefined && (
              <Card.Footer className="text-muted">
                Posted on: {discussion.postdate.substring(0, 10)}
              </Card.Footer>
            )}
          </Card>
        )}
        {openThread && discussion._id === threadID && (
          <Button
            variant="primary"
            style={{display: "inline"}}
            onClick={() => {
              setThreadID("");
              setOpenThread(false);
            }}
          >
            Back To Forum
          </Button>
        )}
        {openThread && discussion._id === threadID && (
          <Thread data={discussion} />
        )}
      </div>
    );
  });
  return (
    <div>
      <div className="container p-3 my-3 text-white"
            style = {{backgroundColor: "#101522" }}>
                
        {openThread ? <h1>Threads</h1> : <h1>Discussions</h1>}
      </div>
      <ul>{divs}</ul>

    </div>
  );
}

export default Forum;
