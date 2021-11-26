import React from "react";

import Loader from "../tools/Loader";

import useHttp from "../../hooks/http.hook";

import "../../styles/forms.css";
import "../../styles/form-types.css";

const Npm = (props) => {

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
      <h2>Install TSForm npm package: (press to copy)</h2>
      <code style={{backgroundColor: (copied === "install") ? "#44635B" : "#323F4B"}}
            onClick={(e) => copy(e.target.innerText, "install")}>{"npm i thoughts-storage-form"}</code>
      <h2>Example how to use package:</h2>
      <code style={{backgroundColor: "#323F4B"}}><pre>
            {`import React from "react";`}<br/>
            {`import TSForm from "thoughts-storage-form";`}<br/><br/>

            {`function App() {`}<br/><br/>

            {`  // JSON of your form.`}<br/>
            {`  let jsonForm = {`}<br/>
            {`    "_id": "619e88ec1876b81ea13bfba6",`}<br/>
            {`    "name": "Example",`}<br/>
            {`    "listOfForms": [`}<br/>
            {`      {`}<br/>
            {`        "isImportant": false,`}<br/>
            {`        "name": "text",`}<br/>
            {`        "title": "White some words:",`}<br/>
            {`        "text": ""`}<br/>
            {`      }`}<br/>
            {`    ]`}<br/>
            {`  }`}<br/><br/>

            {`  return (`}<br/>
            {`    <>`}<br/>
            {`      {/* you can add another DOM or leave TSForm as one page */}`}<br/>
            {`      <TSForm form={ jsonForm }/>`}<br/>
            {`    </>`}<br/>
            {`  );`}<br/>
            {`}`}<br/><br/>

            {`export default App;`}
      </pre></code>
    </>
  );
}

export default Npm;
