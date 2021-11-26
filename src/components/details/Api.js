import React from "react";

import Loader from "../tools/Loader";

import useHttp from "../../hooks/http.hook";

import "../../styles/forms.css";
import "../../styles/form-types.css";

const Api = (props) => {

  const { loading, request } = useHttp();
  const [form, setForm] = React.useState(null);
  const [copied, setCopied] = React.useState(null);

  // HTTP call
  const getForms = React.useCallback(async () => {
    try {
      const data = await request(`/form/${props.id}`, "GET", null);
      const newData = {_id: data._id, name: data.name, listOfForms: data.listOfForms};
      setForm(newData);
    } catch (e) {} // ignore
  }, [setForm, props.id, request]);

  React.useEffect(() => getForms(), [getForms]);

  if (loading) {
    return <Loader/>
  }


  // copy share link
  const copy = (text, name) => {
    navigator.clipboard.writeText(text);
    setCopied(name);
    setTimeout(() => {
      try {
        setCopied(null);
      } catch (e) {} // ignore
    }, 400);
  }

  return (
    <>
      <h2>JSON of your form (press to copy)</h2>
      <code style={{backgroundColor: (copied === "json") ? "#44635B" : "#323F4B"}}
            onClick={(e) => copy(e.target.innerText, "json")}><pre>let jsonForm = {JSON.stringify(form, null, 2)}</pre></code>
      <h2>POST method to submit (press to copy)</h2>
      <code style={{backgroundColor: (copied === "post") ? "#44635B" : "#323F4B"}}
            onClick={(e) => copy(e.target.innerText, "post")}>
        {`const url = "${window.location.origin}/form/submit";`}<br/>
        {`const headers = {"Content-Type": "application/json"}; //important`}<br/>
        {`const body = JSON.stringify(jsonForm);`}<br/><br/>
        {`fetch(url, { method, body, headers })`}<br/>
        {`.then(res => console.log(response))`}<br/>
        {`.catch(err => console.error(err));`}
      </code>
    </>
  );
}

export default Api;
