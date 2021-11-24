import React from "react";

import Loader from "./tools/Loader";

import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

import templates from "../utils/templates.json";

import "../styles/overview.css";


const Overview = (props) => {
  const { loading, request } = useHttp();
  const auth = React.useContext(AuthContext);

  const [formList, setFormList] = React.useState(0);
  const getForms = React.useCallback(async () => {
    try {
      const data = await request("/form/getAll", "GET", null, {
        authorization: `Bearer ${auth.token}`
      });
      setFormList(data);
    } catch (e) {} // ignore
  }, [auth, request, setFormList]);

  React.useEffect(() => getForms(), [getForms]);

  const renderForms = () => {
    let jsxForms = [];
    if (formList) {
      formList.forEach((item, i) => {
        jsxForms.push(
          <span className="card" key={i}
                onClick={() => props.history.push({pathname: "/Details", search: `?id=${item._id}`})}
                >{item.name}</span>
        );
      });
    }
    return jsxForms;
  }

  const renderTemplates = () => {
    let listOfTemplates = [];
    templates.forEach((template, id) => listOfTemplates.push(
      <span className="template" key={id}
            onClick={() => props.history.push({pathname: "/NewForm", search: `?id=${id}`})}>
            {template.name}
      </span>
    ));
    return <div className="view">{listOfTemplates}</div>
  }

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="overview">
      <h2>Templates</h2>
      {renderTemplates()}
      <h2>Overview</h2>
      <div className="view">
        {renderForms()}
        <span className="card" onClick={() => props.history.push({pathname: "/NewForm"})}>New form</span>
      </div>
    </div>
  );
}

export default Overview;
