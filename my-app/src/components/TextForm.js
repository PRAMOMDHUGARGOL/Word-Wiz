import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./TextForm.css";

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
    <div className="container">
      <h1 className="heading">{props.heading}</h1>
      <div className="grid-container">
        <div className="grid-item">
          <textarea
            className="form-control"
            id="box"
            rows="12"
            value={text}
            onChange={handleOnChange}
          ></textarea>
        </div>
        <div className="grid-item">
          <button className="btn btn-primary" onClick={handleUpClick}>
            Convert to Uppercase
          </button>
          <button className="btn btn-secondary" onClick={handleDownClick}>
            Convert to Lowercase
          </button>
          <button className="btn btn-success" onClick={undo}>
            Undo
          </button>
          <button className="btn btn-info" onClick={copyText}>
            Copy
          </button>
          <button
            className="btn btn-warning"
            onClick={() => speak({ text: text })}
          >
            Speak
          </button>
          <button className="btn btn-danger" onClick={clear}>
            Clear
          </button>
        </div>

        <div className="grid-item summary">
          <h2 className="summary-heading">Your text Summary</h2>
          <p className="summary-text">
            {text.length > 0
              ? `${text.split(" ").length} ${
                  text.split(" ").length !== 1 ? "words" : "word"
                } and ${text.length} characters`
              : "Enter something in the above text box"}
          </p>
          <p className="summary-text">
            {0.008 * text.split("").length} Minutes to read{" "}
          </p>
        </div>
        <div className="grid-item preview">
          <h2 className="preview-heading">Preview</h2>
          <p className="preview-text">
            {text.length > 0 ? text : "Enter something in the above text box"}
          </p>
        </div>
      </div>
    </div>
  );
}
