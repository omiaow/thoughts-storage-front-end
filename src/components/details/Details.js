import React from "react";

import Loader from "../tools/Loader";
import Answers from "./Answers";
import EachAnswer from "./EachAnswer";
import Api from "./Api";

import AuthContext from "../../context/AuthContext";
import useHttp from "../../hooks/http.hook";

import "../../styles/details.css";

const Details = (props) => {

  const [responseFormList, setResponseFormList] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [responseList, setResponseList] = React.useState([]);
  const [form, setForm] = React.useState([]);

  /*----- HTTP get form answer -----*/
  const { loading, request } = useHttp();
  const auth = React.useContext(AuthContext);

  const params = new URLSearchParams(props.location.search);
  const id = params.get("id");

  const getForms = React.useCallback(async () => {
    try {
      const data = await request(`/form/responses/${id}`, "GET", null, {
        authorization: `Bearer ${auth.token}`
      });

      let newResponseList = convert(data.responses);

      setResponseList(newResponseList);
      setResponseFormList(data.responses);
      setTotal(data.responses.length);
      setForm(data.form);

    } catch (e) {
      props.history.push({pathname: "/Overview"});
    }
  }, [ setResponseFormList, setResponseList, setForm, id, request, auth, props]);

  React.useEffect(() => getForms(), [getForms]);

  /*----- control bar buttons -----*/
  const [share, setShare] = React.useState("Share");
  const [pages, setPage] = React.useState("Responses");
  const [responseId, setResponseId] = React.useState(0);

  const controlBar = () => {

    // copy share link
    const shareHandle = () => {
      navigator.clipboard.writeText(`${window.location.origin}/Form?id=${id}`);
      setShare("Copied");
      setTimeout(() => {
        try {
          setShare("Share");
        } catch (e) {} // ignore
      }, 3000);
    }

    // HTTP delete form
    const deleteForm = async () => {
      try {
        if (window.confirm('Do you really want to delete form?')) {
          await request(`/form/delete/${id}`, "DELETE", null, {
            authorization: `Bearer ${auth.token}`
          });
          props.history.push({pathname: "/Overview"});
        }
      } catch (e) {} // ignore
    }

    return (
      <div className="control-bar">
        <span className={(pages === "Responses") ? "button-on" : "button-off"} onClick={() => setPage("Responses")}>Responses</span>
        <span className={(pages === "EachAnswer") ? "button-on" : "button-off"} onClick={() => setPage("EachAnswer")}>Each answer</span>
        <span className={(pages === "API") ? "button-on" : "button-off"} onClick={() => setPage("API")}>API</span>

        <span className="button-off" onClick={() => window.open(`${window.location.origin}/Form?id=${id}`, "_blank")}>Form</span>
        <span className="button-off" onClick={() => shareHandle()}>{share}</span>
        <span className="button-off" onClick={() => deleteForm()}>Delete</span>
      </div>
    );
  }

  if (loading) {
    return <Loader/>
  }

  const renderPage = () => {
    if (pages === "Responses") return <Answers responseList={responseList} total={total} setResponseId={setResponseId} setPage={setPage}/>;
    else if (pages === "EachAnswer") return <EachAnswer responseFormList={responseFormList} responseId={responseId} setResponseId={setResponseId}/>;
    else if (pages === "API") return <Api id={id}/>;
  }

  return (
    <div className="details">
      <h1>{form.name}</h1>
      {controlBar()}
      {renderPage()}
    </div>
  );
}

export default Details;



// convert to response list
const convert = (data) => {
  let newResponseList = [];

  data.forEach((form, i) => {
    form.answers.forEach((question, j) => {
      let index = newResponseList.findIndex(item => item.title === question.title && item.name === question.name);
      if (index === -1) {
        if (question.name === "text" || question.name === "paragraph" || question.name === "date") {

          newResponseList.push({
            name: question.name,
            title: question.title,
            answers: [(question.name === "date") ? (question.date) : (question.text)]
          });

        } else if (question.name === "radio" || question.name === "check") {

          let newOptionList = [];

          question.options.forEach((option, k) => {
            newOptionList.push({
              title: option.title,
              choosed: (option.isTrue) ? 1 : 0
            });
          });

          newResponseList.push({
            name: question.name,
            title: question.title,
            answers: newOptionList,
            total: 1
          });
        }
      } else {
        if (question.name === "text" || question.name === "paragraph" || question.name === "date") {
          newResponseList[index].answers.push((question.name === "date") ? (question.date) : (question.text));
        } else if (question.name === "radio" || question.name === "check") {
          let isAnswered = false;

          question.options.forEach((option, k) => {
            if (option.isTrue) {
              let optionId = newResponseList[index].answers.findIndex(item => item.title === option.title);
              newResponseList[index].answers[optionId].choosed++;
              isAnswered = true;
            }
          });

          if (isAnswered) newResponseList[index].total++;
        }
      }
    });
  });

  return newResponseList;
}
