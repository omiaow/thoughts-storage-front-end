import React from "react";
import {withRouter} from 'react-router-dom';
import ContentEditable from "react-contenteditable";

import Calendar from "./Calendar";

import "../../styles/forms.css";
import "../../styles/form-types.css";

class Form extends React.Component {

  state = {
    form: {
      name: "Name of form",
      listOfForms: [{
        name: "check",
        title: "Question or task",
        options: [{isTrue: false, title: "Option"}, {isTrue: false, title: "Option"}]
      }, {
        name: "radio",
        title: "Question or task",
        options: [{isTrue: false, title: "Option"}, {isTrue: false, title: "Option"}]
      }, {
        name: "text",
        title: "Question or task",
        text: ""
      }, {
        name: "paragraph",
        title: "Question or task",
        text: ""
      }, {
        name: "date",
        title: "Question or task",
        date: undefined
      }, {
        name: "upload",
        title: "Question or task",
        file: undefined
      }]
    }
  }


  // editing options as checkbox [+] or radiobutton (*)
  editOption = (type, formId, optionId) => {
    let newForm = {...this.state.form};
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
    this.setState({form: newForm});
  }

  // rendering options as checkbox [+] or radiobutton (*)
  renderOptions = (item, id) => {
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
          <div className={className} onClick={() => this.editOption(item.name, id, i)}/>
          <div className="option">{optionItem.title}</div>
        </div>
      );
    });
    return jsxOptionList;
  }

  // rendering text input types
  renderContentEditableType = (item, id) => {
    return <ContentEditable className={item.name} html={item.text} onChange={(e) => {
      let newForm = {...this.state.form};
      newForm.listOfForms[id].text = e.target.value;
      this.setState({form: newForm});
    }}/>;
  }

  // rendering file uploading type
  renderFileUploader = (item, id) => {
    return (
      <>
        <label className="upload" htmlFor={item.name}>{item.name}</label>
        <input type="file" id={item.name} style={{opacity: "0", position: "absolute", zIndex: "-1", width: "0"}} onChange={(e) => {
          let newForm = {...this.state.form};
          let files = e.target.files;
          let reader = new FileReader();
          reader.readAsDataURL(files[0]);
          reader.onload = (e) => {
            const formData = {file: e.target.result}
            newForm.listOfForms[id].file = formData;
            this.setState({form: newForm});
          }
        }}/>
      </>
    );
  }

  // rendering calendar
  renderDatePicker = (item, id) => {
    return <Calendar editDate={(date) => {
      let newForm = {...this.state.form};
      newForm.listOfForms[id].date = date;
      this.setState({form: newForm});
    }}/>;
  }

  // distributing inputs and rendering them
  renderInputTypes = (item, id) => {
    if (item.name === "check" || item.name === "radio") {
      return this.renderOptions(item, id);
    } else if (item.name === "text" || item.name === "paragraph") {
      return this.renderContentEditableType(item, id);
    } else if (item.name === "upload") {
      return this.renderFileUploader(item, id);
    } else if (item.name === "date") {
      return this.renderDatePicker(item, id);
    }
  }

  // rendering list of forms
  renderListOfForms = (formList) => {
    let jsxFormList = [];
    formList.forEach((item, i) => {
      jsxFormList.push(<div key={`drop ${i}`} className="drop-place"/>);
      jsxFormList.push(
        <div className="form-card" key={i}>
          <div className="top"/>
          <div className="title">{item.title}</div>
          {this.renderInputTypes(item, i)}
          <div className="bottom"/>
        </div>
      );
    });
    return jsxFormList;
  }

  render() {
    return (
      <div className="new-form">
        <div className="input-area">
          <div className="form-name">{this.state.form.name}</div>
          {this.renderListOfForms(this.state.form.listOfForms)}
          <input type="submit" value="Submit"/>
        </div>
      </div>
    );
  }
}

export default withRouter(Form);
