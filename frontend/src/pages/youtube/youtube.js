import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import './youtube.css';

const Youtube = () => {
  return (    
      <div style={{textAlign:'center'}}>
    <h1 style={{textAlign:'center'}}>VIDEO LIBRARY</h1><br/><br/>
    <div className="container">
      <iframe class="responsive-iframe" width="700px" height="300px"
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      />
      <div class="wrapper">
  <button class="button">PLAY</button>&nbsp;
  <button class="button">PAUSE</button>
</div>
    </div>
    <br/>
    <br/>
    <div className="container">
      <iframe class="responsive-iframe" width="700px" height="300px"
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      />
    <div class="wrapper">
  <button class="button">PLAY</button>&nbsp;
  <button class="button">PAUSE</button>
</div>
    <br/>
    <br/>
    <div className="container">
      <iframe class="responsive-iframe" width="700px" height="300px"
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      /><div class="wrapper">
      <button class="button">PLAY</button>&nbsp;
      <button class="button">PAUSE</button>
    </div>
    </div>
    <br/>
    <br/>

    <div className="container">
      <iframe class="responsive-iframe" width="700px" height="300px"
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      /><div class="wrapper">
      <button class="button">PLAY</button>&nbsp;
      <button class="button">PAUSE</button>
    </div>
    </div>
    <br/>
    <br/>
    <div className="container">
      <iframe class="responsive-iframe" width="700px" height="300px"
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="video"
      /><div class="wrapper">
      <button class="button">PLAY</button>&nbsp;
      <button class="button">PAUSE</button>
    </div>
    </div>
    <br/>
    <br/>
    </div></div>
  );
};

export default Youtube;
