import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const storeText = [];

  storeText.push(text.split(" "));

  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
  };

  const { speak } = useSpeechSynthesis();

  const handleDownClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
  };

  const undo = () => {
    storeText[0].pop();
    let newText = storeText[0].join(" ").trim();
    setText(newText);
  };

  const copyText = () => {
    const copytext = document.getElementById("box");
    copytext.select();
    navigator.clipboard.writeText(copytext.value);
  };

  const clear = () => {
    let newText = "";
    setText(newText);
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container my-2">
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="box"
            rows="8"
            value={text}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-2" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary" onClick={handleDownClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-2" onClick={undo}>
          Undo
        </button>
        <button className="btn btn-primary" onClick={copyText}>
          Copy
        </button>
        <button
          className="btn btn-primary mx-2"
          onClick={() => speak({ text: text })}
        >
          Speak
        </button>
        <button className="btn btn-danger mx" onClick={clear}>
          Clear
        </button>
      </div>
      <div className="container my-3">
        <h1>Your text Summary</h1>
        <p>
          {text.split(" ").length > 1
            ? `${text.split(" ").length} words`
            : `${text.split(" ").length} word`}{" "}
          and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").length} Minutes to read </p>
        <h1> Preview </h1>
        <p>
          {text.length > 0 ? text : "Enter something in the above text box"}
        </p>
      </div>
    </>
  );
}
