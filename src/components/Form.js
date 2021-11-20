import React from "react";
import ContentEditable from "react-contenteditable";

import Calendar from "./tools/Calendar";
import Error from "./tools/Error";
import Loader from "./tools/Loader";

import useHttp from "../hooks/http.hook";

import "../styles/forms.css";
import "../styles/form-types.css";

const Form = (props) => {
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = React.useState(null);

  // HTTP call
  let params = new URLSearchParams(props.location.search);
  let id = params.get("id");
  const getForms = React.useCallback(async () => {
    try {
      const data = await request(`/form/${id}`, "GET", null);
      setForm(data);
    } catch (e) {} // ignore
  }, [setForm, id, request]);

  React.useEffect(() => getForms(), [getForms]);

  // editing options as checkbox [+] or radiobutton (*)
  const editOption = (type, formId, optionId) => {
    let newForm = {...form};
    if (type === "check") {
      newForm.listOfForms[formId].options[optionId].isTrue = !newForm.listOfForms[formId].options[optionId].isTrue;
    } else if (type === "radio") {
      if (newForm.listOfForms[formId].options[optionId].isTrue) {
        newForm.listOfForms[formId].options[optionId].isTrue = false;
      } else {
        newForm.listOfForms[formId].options.forEach((item, i) => {
          item.isTrue = false;
        });
        newForm.listOfForms[formId].options[optionId].isTrue = true;
      }
    }
    setForm(newForm);
  }

  // rendering options as checkbox [+] or radiobutton (*)
  const renderOptions = (item, id) => {
    let jsxOptionList = [];
    item.options.forEach((optionItem, i) => {
      let className;
      if (optionItem.isTrue) {
        className=`${item.name}-on`
      } else {
        className=`${item.name}-off`
      }
      jsxOptionList.push(
        <div key={i}>
          <div className={className} onClick={() => editOption(item.name, id, i)}/>
          <div className="option">{optionItem.title}</div>
        </div>
      );
    });
    return jsxOptionList;
  }

  // rendering text input types
  const renderContentEditableType = (item, id) => {
    return <ContentEditable className={item.name} html={item.text} onChange={(e) => {
      let newForm = {...form};
      newForm.listOfForms[id].text = e.target.value.replace( /(<([^>]+)>)/ig, '');
      setForm(newForm);
    }}/>;
  }

  // rendering file uploading type
  const renderFileUploader = (item, id) => {
    return (
      <>
        <label className="upload" htmlFor={item.name}>{item.name}</label>
        <input type="file" id={item.name} style={{opacity: "0", position: "absolute", zIndex: "-1", width: "0"}} onChange={(e) => {
          let newForm = {...form};
          let files = e.target.files;
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = (e) => {
            const formData = {file: e.target.result}
            newForm.listOfForms[id].file = formData;
            setForm(newForm);
          }
        }}/>
      </>
    );
  }

  // rendering calendar
  const renderDatePicker = (item, id) => {
    return <Calendar editDate={(date) => {
      let newForm = {...form};
      newForm.listOfForms[id].date = date;
      setForm(newForm);
    }}/>;
  }

  // distributing inputs and rendering them
  const renderInputTypes = (item, id) => {
    if (item.name === "check" || item.name === "radio") {
      return renderOptions(item, id);
    } else if (item.name === "text" || item.name === "paragraph") {
      return renderContentEditableType(item, id);
    } else if (item.name === "upload") {
      return renderFileUploader(item, id);
    } else if (item.name === "date") {
      return renderDatePicker(item, id);
    }
  }

  // rendering list of forms
  const renderListOfForms = (formList) => {
    let jsxFormList = [];
    formList.forEach((item, i) => {
      jsxFormList.push(<div key={`drop ${i}`} className="drop-place"/>);
      jsxFormList.push(
        <div className="form-card" key={i}>
          <div className="top"/>
          <div className="title">{item.title}</div>
          {renderInputTypes(item, i)}
          <div className="bottom"/>
        </div>
      );
    });
    return jsxFormList;
  }

  // submit answer
  const submit = async () => {
    try {
      const response = await request("/form/submit", "POST", form);
      if (response) props.history.push({pathname: "/"});
      else window.scrollTo(0, 0);
    } catch (e) {} // ignore
  }

  if (form && !loading) {
    return (
      <div className="new-form">
        {Error(error, clearError)}
        <div className="input-area">
          <div className="form-name">{form.name}</div>
          {renderListOfForms(form.listOfForms)}
          <input type="submit" value="Submit" onClick={submit}/>
        </div>
      </div>
    );
  } else return <Loader/>;
}

export default Form;
