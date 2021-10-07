import React from "react";
import ContentEditable from "react-contenteditable";

import GeneratingForm from "./GeneratingForm";
import AddForm from "./AddForm";

import "../../styles/forms.css";

class NewForm extends React.Component {

  state = {
    name: "Name of form",
    listOfForms: []
  }

  addForm = (form) => {
    this.state.listOfForms.push(form);
    this.setState({listOfForms: this.state.listOfForms});
  }

  removeForm = (id) => {
    this.state.listOfForms.splice(id, 1);
    this.setState({listOfForms: this.state.listOfForms});
  }

  editForm = (id, form) => {
    let newListOfForms = [...this.state.listOfForms];
    newListOfForms[id] = form;
    this.setState({listOfForms: newListOfForms});
  }

  renderListOfForms = () => {
    let forms = [];
    this.state.listOfForms.forEach((item, i) => {
      forms.push(<GeneratingForm key={i} type={item.name} id={i} data={item} editForm={this.editForm} removeForm={this.removeForm}/>);
    });
    return forms;
  }

  render() {
    return (
      <div className="new-form">
        <div className="input-area">
          <ContentEditable
            className="form-name"
            html={this.state.name}
            onChange={(e) => this.setState({name: e.target.value})}
            onBlur={(e) => {
              if (e.target.innerText.length === 0) this.setState({name: "Name of form"});
            }}/>

          {this.renderListOfForms()}
          <AddForm addForm={this.addForm}/>
          <input type="submit" value="Create"/>
        </div>
      </div>
    );
  }
}

export default NewForm;
