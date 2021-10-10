import React from "react";
import ContentEditable from "react-contenteditable";

class GeneratingForm extends React.Component {

  // setting form question or task title
  editTitle = (e) => {
    this.props.data.title = e.target.value;
    this.props.editForm(this.props.id, this.props.data);
  }

  // editing form question or task title to default placeholder and importance as (*)
  editTitleOnBlur = (e) => {
    if (e.target.innerText === "\n" || e.target.innerText.length === 0) {
      this.props.data.title = "Question or task";
    }

    if (this.props.data.isImportant) {
      this.props.data.title = `${this.props.data.title}*`
    }

    this.props.editForm(this.props.id, this.props.data);
  }

  // editing importance as (*)
  editTitleOnFocus = () => {
    if (this.props.data.isImportant) {
      this.props.data.title = this.props.data.title.slice(0, this.props.data.title.length-1);
    }

    this.props.editForm(this.props.id, this.props.data);
  }

  // setting importance as*
  editImportance = () => {
    if (this.props.data.isImportant) {
      this.props.data.isImportant = false;
      this.props.data.title = this.props.data.title.slice(0, this.props.data.title.length-1);
    } else {
      this.props.data.isImportant = true;
      this.props.data.title = `${this.props.data.title}*`
    }
    this.props.editForm(this.props.id, this.props.data);
  }

  // setting option text title
  editOption = (e, id) => {
    this.props.data.options[id].title = e.target.value;
    this.props.editForm(this.props.id, this.props.data);
  }

  // editing default placeholder
  editOptionOnBlur = (e, id) => {
    if (e.target.innerText === "\n" || e.target.innerText.length === 0) {
      this.props.data.options[id].title = "Option";
      this.props.editForm(this.props.id, this.props.data);
    }
  }

  // setting button checkbox [+] or radiobutton (*)
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

  // adding new option checkbox [+] or radiobutton (*)
  addOption = () => {
    this.props.data.options.push({isTrue: false, title: "Option"});
    this.props.editForm(this.props.id, this.props.data);
  }

  // removing option checkbox [+] or radiobutton (*)
  removeOption = () => {
    if (this.props.data.options.length > 1) {
      this.props.data.options.pop();
      this.props.editForm(this.props.id, this.props.data);
    } else {
      this.props.removeForm(this.props.id);
    }
  }

  // display options checkbox [+] or radiobutton (*)
  renderOptions = () => {
    let optionList = [];
    this.props.data.options.forEach((item, i) => {
      optionList.push(
        <div key={i}>
          <div
            onClick={() => this.editOptionButton(i)}
            className={(item.isTrue) ? `${this.props.data.name}-on` : `${this.props.data.name}-off`}/>

          <ContentEditable
            className="option-editable"
            html={item.title}
            onChange={(e) => this.editOption(e, i)}
            onBlur={(e) => this.editOptionOnBlur(e, i)}/>
        </div>
      );
    });
    return optionList;
  }

  // display render input view as options, text or buttons
  renderTypes = () => {
    if (this.props.data.name === "check" || this.props.data.name === "radio") {
      return this.renderOptions();
    } else {
      return <div className={this.props.data.name}>{this.props.data.name}</div>
    }
  }

  // render buttons as add, remove, set importance
  renderButtons = () => {
    if (this.props.data.name === "check" || this.props.data.name === "radio") {
      return (
        <>
          {(this.props.data.isImportant) ?
            <div className="exclamation-on" onClick={() => this.editImportance()}/> :
            <div className="exclamation-off" onClick={() => this.editImportance()}/>}
          <div className="remove" onClick={() => this.removeOption()}/>
          <div className="add" onClick={() => this.addOption()}/>
        </>
      );
    } else {
      return (
        <>
          {(this.props.data.isImportant) ?
            <div className="exclamation-on" onClick={() => this.editImportance()}/> :
            <div className="exclamation-off" onClick={() => this.editImportance()}/>}
          <div className="remove" onClick={() => this.props.removeForm(this.props.id)}/>
        </>
      );
    }
  }

  // render buttons as add, remove, set importance
  renderDragAndDropPlace = () => {
    return (
      <div
        onDragStart={(e) => {
          this.props.setDraggedCard(this.props.id);
        }}
        draggable={true}
        className="dragger"
      >...</div>
    );
  }

  render() {
    return (
      <div className="form-card">
        {this.renderDragAndDropPlace()}
        <ContentEditable
          className="title-editable"
          html={this.props.data.title}
          onChange={(e) => this.editTitle(e)}
          onBlur={(e) => this.editTitleOnBlur(e)}
          onFocus={() => this.editTitleOnFocus()}/>
        {this.renderTypes(this.props.data.name)}

        {this.renderButtons()}
      </div>
    );
  }
}

export default GeneratingForm;
