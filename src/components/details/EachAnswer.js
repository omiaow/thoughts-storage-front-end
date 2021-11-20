import React from "react";

import "../../styles/forms.css";
import "../../styles/form-types.css";

const EachAnswer = (props) => {

  /*----- render form -----*/
  const renderForm = () => {
    let jsxForms = [];

    let forms = props.responseFormList[props.responseId].answers;
    forms.forEach((form, i) => {
      if (form.name === "check" || form.name === "radio") {
        // for options
        let options = [];
        form.options.forEach((option, j) => {
          options.push(
            <div key={j}>
              {(option.isTrue) ? <div className={`${form.name}-on`}/> : <div className={`${form.name}-off`}/>}
              <div className="option">{option.title}</div>
            </div>
          );
        });
        jsxForms.push(
          <div className="form-card" key={i}>
            <div className="top"/>
            <div className="title">{form.title}</div>
            {options}
            <div className="bottom"/>
          </div>
        );
      } else if (form.name === "text" || form.name === "paragraph" || form.name === "date") {
        // for others as text, paragraph and dates
        jsxForms.push(
          <div className="form-card" key={i}>
            <div className="top"/>
            <div className="title">{form.title}</div>
            <div className="text">{(form.name === "date") ? form.date : form.text}</div>
            <div className="bottom"/>
          </div>
        );
      }
      jsxForms.push(<div className="drop-place" key={`${i}-space`}/>);
    });

    return jsxForms;
  }

  return (
    <>
      <h2>Response: {(props.responseFormList.length === 0) ? 0 : props.responseId+1}/{props.responseFormList.length}</h2>
      <div className="control-bar">
        <span className="button-off" onClick={() => {if (props.responseId > 0) props.setResponseId(props.responseId-1)}}>prev</span>
        <span className="button-off" onClick={() => {if (props.responseId < props.responseFormList.length-1) props.setResponseId(props.responseId+1)}}>next</span>
      </div>
      <div className="input-area">
        {(props.responseFormList.length !== 0) ? renderForm() : ""}
      </div>
    </>
  );
}

export default EachAnswer;
