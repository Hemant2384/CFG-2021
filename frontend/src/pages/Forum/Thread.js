import React, { useState, useRef } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Card, Button } from "react-bootstrap";

const Thread = (props) => {
  const editor = useRef();
  const [posts, setPosts] = useState(props.data.post);
  const [editorActivate, setEditorActivate] = useState(false);
  const [submitPost, setSubmitPost] = useState(false);
  const [content, setContent] = useState("");

  const divs = posts.map((thread) => {
    const variant = "light";
    const idx = "info";

    return (
      <div className="container">
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
              {thread.author}
            </em>
          </Card.Header>
          <Card.Body>
            <Card.Title>{props.data.title}</Card.Title>
            <Card.Text>{thread.post}</Card.Text>
          </Card.Body>
          {thread.date !== undefined && (
            <Card.Footer className="text-muted">
              Posted on: {thread.date.substring(0, 10)}
            </Card.Footer>
          )}
        </Card>
      </div>
    );
  });

  console.log("All Posts:", posts);

  const SubmitPost = (text) => {
    const curDate = new Date();
    console.log(curDate);
    const content = `${text}`;
    console.log(content, submitPost);

    if (submitPost) {
      console.log("In SUbmit Post");
      setPosts([
        {
          _id: 9999,
          author: "Jane Doe",
          post: text,
          thread: "70e9803986195066b0344173",
          date: curDate.toString(),
        },
        ...posts,
      ]);
      setSubmitPost(false);
      setEditorActivate(false);
    }
  };

  return (
    <div className="Thread">
            <br></br>
      <div>
        <Button
          variant="info"
        
          onClick={() => setEditorActivate(true)}
        >
          Add Post!
        </Button>
        &nbsp;
        &nbsp;
        &nbsp;
        &nbsp;
        {editorActivate && (
          <Button
            variant="primary"
           
            onClick={() => {
              setSubmitPost(true);
              SubmitPost(content);
              console.log(submitPost);
            }}
          >
            {submitPost ? "Confirm" : "Submit Post!"}
          </Button>
                    
        )}
        <br></br>
        {editorActivate && (
          <SunEditor
            onChange={(content) => {
              const contentTestContainer = document.createElement("div");
              contentTestContainer.innerHTML = content;
              const textContent = contentTestContainer.textContent;

              if (textContent) {
                setContent(textContent);
              }
            }}
            placeholder="Please type here..."
          />
        )}
      </div>
      {divs}
    </div>
  );
};

export default Thread;
