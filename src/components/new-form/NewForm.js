import React from "react";
import ContentEditable from "react-contenteditable";

import GeneratingForm from "./GeneratingForm";
import AddForm from "./AddForm";

import "../../styles/forms.css";
import "../../styles/form-types.css";

class NewForm extends React.Component {

  state = {
    form: {
      name: "Name of form",
      listOfForms: []
    },
    draggedCard: undefined
  }

  // adding new form card
  addForm = (form) => {
    this.state.form.listOfForms.push(form);
    this.setState({form: this.state.form});
  }

  // removing form card
  removeForm = (id) => {
    this.state.form.listOfForms.splice(id, 1);
    this.setState({form: this.state.form});
  }

  // editing form card
  editForm = (id, form) => {
    let newForm = {...this.state.form};
    newForm.listOfForms[id] = form;
    this.setState({form: newForm});
  }

  // setting id of dragged card
  setDraggedCard = (id) => {
    this.setState({draggedCard: id});
  }

  // rendering dragged card dropping place
  renderDragAndDropPlace = (key) => {
    return (
      <div
        key={`drop ${key}`}
        onDrop={(e) => this.changeOrder(e, key)}
        onDragOver={(e) => this.onDragOver(e)}
        onDragLeave={(e) => e.target.style.backgroundColor = "#06141C"}
        className="drop-place"/>
    );
  }

  // changing order after drag and drop
  changeOrder = (e, id) => {
    e.preventDefault();
    if (this.state.draggedCard !== undefined && !(this.state.draggedCard === 0 && id === 1)) {
      let formCard = {...this.state.form.listOfForms[this.state.draggedCard]};
      let newForm = {...this.state.form};
      newForm.listOfForms.splice(this.state.draggedCard, 1);
      newForm.listOfForms.splice(id, 0, formCard);
      this.setState({form: newForm});
    }
    e.target.style.backgroundColor = "#06141C";
  }

  // changing color when dragged card over dropping place
  onDragOver = (e) => {
    e.preventDefault();
    e.target.style.backgroundColor = "white";
  }

  // rendering list of form cards
  renderListOfForms = () => {
    let forms = [];
    forms.push(this.renderDragAndDropPlace(0));
    this.state.form.listOfForms.forEach((item, i) => {
      forms.push(<GeneratingForm key={i} id={i} data={item} editForm={this.editForm} removeForm={this.removeForm} setDraggedCard={this.setDraggedCard}/>);
      forms.push(this.renderDragAndDropPlace(i+1));
    });
    return forms;
  }

  render() {
    return (
      <div className="new-form">
        <div className="input-area">

          <ContentEditable
            className="form-name-editable"
            html={this.state.form.name}
            onChange={(e) => {
              this.state.form.name = e.target.value;
              this.setState({form: this.state.form});
            }}
            onBlur={(e) => {
              if (e.target.innerText === "\n" || e.target.innerText.length === 0) {
                this.setState({name: "Name of form"});
              }
            }}/>

          {this.renderListOfForms()}

          <AddForm addForm={this.addForm}/>

          <input type="submit" value="Ready"/>
        </div>
      </div>
    );
  }
}

export default NewForm;
