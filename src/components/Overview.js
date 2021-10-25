import React from "react";

import Loader from "./tools/Loader";

import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";

import "../styles/overview.css";


const SignIn = (props) => {
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

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="overview">
      {/*
      <h2>Templates</h2>
      <div className="view">
        <span className="template">Website Feedback</span>
        <span className="template">Job Application</span>
        <span className="template">Event Registration</span>
        <span className="template">Online Order</span>
        <span className="template">Account Signup</span>
        <span className="template">Sales Contact</span>
      </div>
      */}
      <h2>Overview</h2>
      <div className="view">
        {renderForms()}
        <span className="card" onClick={() => props.history.push({pathname: "/NewForm"})}>New Form</span>
      </div>
    </div>
  );
}

export default SignIn;
