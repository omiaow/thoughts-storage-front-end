import React from "react";

const Answers = (props) => {

  /*----- render response list -----*/
  const renderReponse = (responseList, total) => {
    let jsxResponseList = [];
    responseList.forEach((item, i) => {
      if (item.name === "text" || item.name === "paragraph" || item.name === "date") {

        // collect answers
        let jsxAnswerList = [];
        item.answers.forEach((answer, j) => {
          if (answer.length > 0) jsxAnswerList.push(
            <div className="answer" key={j}
                 onClick={() => {
                   props.setResponseId(j);
                   props.setPage("EachAnswer");
                 }}>{answer}</div>);
        });

        // create form
        jsxResponseList.push(
          <div className="question" key={i}>
            <p className="title">{item.title}</p>
            <div className="text-list">{jsxAnswerList}</div>
            <p className="info">Answered: {jsxAnswerList.length}</p>
          </div>
        );
      } else if (item.name === "check" || item.name === "radio") {

        // collect options
        let jsxDiagram = [];
        item.answers.forEach((option, j) => {
          let percentage = 100 / total * option.choosed;
          let width = 10 + (90 / 100 * percentage);
          jsxDiagram.push(
            <div key={j}>
              <p className="option-info">{percentage.toFixed(1)}%</p>
              <div className="option" style={{width: `${width}%`}}>{option.title}</div>
            </div>
          );
        });

        // create diagram
        jsxResponseList.push(
          <div className="question" key={i}>
            <p className="title">{item.title}</p>
            <div className="option-diagram">
              {jsxDiagram}
            </div>
            <p className="info">Answered: {item.total}</p>
          </div>
        );
      }
    });
    return jsxResponseList;
  }

  return (
    <>
      <h2>Total response: {props.total}</h2>
      <div className="form">
        {renderReponse(props.responseList, props.total)}
      </div>
    </>
  );
}

export default Answers;
