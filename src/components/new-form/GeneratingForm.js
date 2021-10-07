import React from "react";
import ContentEditable from "react-contenteditable";

import "../../styles/form-types.css";

class GeneratingForm extends React.Component {

  editTitle = (e) => {
    this.props.data.title = e.target.value;
    this.props.editForm(this.props.id, this.props.data);
  }

  editTitleOnBlur = (e) => {
    if (e.target.innerText.length === 0) {
      this.props.data.title = "Question or task";
      this.props.editForm(this.props.id, this.props.data);
    }
  }

  editOption = (e, id) => {
    this.props.data.options[id].title = e.target.innerText;
    this.props.editForm(this.props.id, this.props.data);
  }

  editOptionOnBlur = (e, id) => {
    if (e.target.innerText.length === 0) {
      this.props.data.options[id].title = "Option";
      this.props.editForm(this.props.id, this.props.data);
    }
  }

  addOption = () => {
    this.props.data.options.push({isTrue: false, title: "Option"});
    this.props.editForm(this.props.id, this.props.data);
  }

  removeOption = () => {
    if (this.props.data.options.length > 1) {
      this.props.data.options.pop();
      this.props.editForm(this.props.id, this.props.data);
    } else {
      this.props.removeForm(this.props.id);
    }
  }

  renderOptions = (type) => {
    let optionList = [];
    this.props.data.options.forEach((item, i) => {
      optionList.push(
        <div key={i}>
          <div className={type}/>
          <ContentEditable
            className="option"
            html={item.title}
            onInput={(e) => this.editOption(e, i)}
            onBlur={(e) => this.editOptionOnBlur(e, i)}/>
        </div>
      );
    });
    return optionList;
  }

  renderTypes = (type) => {
    if (type === "check" || type === "radio") {
      return this.renderOptions(type);
    } else {
      return <div className={type}>{type}</div>
    }
  }

  renderButtons = (type) => {
    if (type === "check" || type === "radio") {
      return (
        <>
          <div className="remove" onClick={() => this.removeOption()}></div>
          <div className="add" onClick={() => this.addOption()}></div>
        </>
      );
    } else {
      return ( <div className="remove" onClick={() => this.props.removeForm(this.props.id)}></div> );
    }
  }

  render() {
    return (
      <div className="form-card">
        <ContentEditable
          className="title"
          html={this.props.data.title}
          onChange={(e) => this.editTitle(e)}
          onBlur={(e) => this.editTitleOnBlur(e)}/>
        {this.renderTypes(this.props.type)}

        {this.renderButtons(this.props.type)}
      </div>
    );
  }
}

export default GeneratingForm;
