import React from "react";
import ContentEditable from "react-contenteditable";

import "../../styles/form-types.css";

class GeneratingForm extends React.Component {

  editTitle = (e) => {
    this.props.data.title = e.target.value;
    this.props.editForm(this.props.id, this.props.data);
  }

  editTitleOnBlur = (e) => {
    if (e.target.innerText === "\n" || e.target.innerText.length === 0) {
      this.props.data.title = "Question or task";
      this.props.editForm(this.props.id, this.props.data);
    }
  }

  editOption = (e, id) => {
    this.props.data.options[id].title = e.target.value;
    this.props.editForm(this.props.id, this.props.data);
  }

  editOptionOnBlur = (e, id) => {
    if (e.target.innerText === "\n" || e.target.innerText.length === 0) {
      this.props.data.options[id].title = "Option";
      this.props.editForm(this.props.id, this.props.data);
    }
  }

  editOptionButton = (id) => {
    if (this.props.data.name === "check") {
      this.props.data.options[id].isTrue = !this.props.data.options[id].isTrue;
    } else if (this.props.data.name === "radio") {
      if (this.props.data.options[id].isTrue) {
        this.props.data.options[id].isTrue = false;
      } else {
        this.props.data.options.forEach((item, i) => {
          item.isTrue = false;
        });
        this.props.data.options[id].isTrue = true;
      }
    }
    this.props.editForm(this.props.id, this.props.data);
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
          <div onClick={() => this.editOptionButton(i)} className={(item.isTrue) ? `${type}-on` : `${type}-off`}/>

          <ContentEditable
            className="option"
            html={item.title}
            onChange={(e) => this.editOption(e, i)}
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
        <div
          onDragStart={(e) => console.log(e)}
          onDragLeave={(e) => console.log(e)}
          onDragEnd={(e) => console.log(e)}
          onDragOver={(e) => console.log(e)}
          onDrop={(e) => console.log(e)}
          draggable={true}
          className="drager"
        >...</div>
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
