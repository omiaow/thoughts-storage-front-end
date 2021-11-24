import React from "react";
import ContentEditable from "react-contenteditable";

import GeneratingForm from "./GeneratingForm";
import AddForm from "./AddForm";

import Error from "../tools/Error";

import AuthContext from '../../context/AuthContext';
import useHttp from "../../hooks/http.hook";

import templates from "../../utils/templates.json";

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

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.history.location.search);
    if (parsed.id) {
      this.setState({form: templates[parsed.id]});
    }
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
        onDragLeave={(e) => e.target.style.backgroundColor = "#1f2933"}
        className="drop-place"/>
    );
  }

  // changing order after drag and drop
  changeOrder = (e, id) => {
    e.preventDefault();
    const draggedCard = this.state.draggedCard;
    if (draggedCard !== undefined && draggedCard !== id - 1 && draggedCard !== id) {
      let formCard = {...this.state.form.listOfForms[draggedCard]};
      let newForm = {...this.state.form};
      newForm.listOfForms.splice(draggedCard, 1);
      if (draggedCard > id) {
        newForm.listOfForms.splice(id, 0, formCard);
      } else {
        newForm.listOfForms.splice(id-1, 0, formCard);
      }
      this.setState({form: newForm, draggedCard: undefined});
    }
    e.target.style.backgroundColor = "#1f2933";
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

  // rendering editable name of form
  renderNameOfForm = () => {
    return (
      <ContentEditable
        className="form-name-editable"
        html={this.state.form.name}
        tabIndex="1"
        onChange={(e) => {
          let newForm = {...this.state.form};
          newForm.name = e.target.value.replace( /(<([^>]+)>)/ig, '');
          this.setState({form: newForm});
        }}
        onBlur={(e) => {
          if (e.target.innerText === "\n" || e.target.innerText.length === 0) {
            let newForm = {...this.state.form};
            newForm.name = "Name of form";
            this.setState({form: newForm});
          }
        }}
        onFocus={(e) => {
          if (this.state.form.name === "Name of form") {
            let newForm = {...this.state.form};
            newForm.name = "";
            this.setState({form: newForm});
          }
        }}
        />
    );
  }

  render() {
    return (
      <div className="new-form">
        <div className="input-area">
          {this.renderNameOfForm()}
          {this.renderListOfForms()}
          <AddForm addForm={this.addForm}/>
          <Create form={this.state.form} history={this.props.history} setError={this.setError}/>
        </div>
      </div>
    );
  }
}

export default NewForm;

// Button to create new form
const Create = (props) => {
  const auth = React.useContext(AuthContext);
  const { request, error, clearError } = useHttp();

  const create = async () => {
    const response = await request("/form/create", "POST", props.form, {
      authorization: `Bearer ${auth.token}`
    });
    if (response) props.history.push({ pathname: "Overview" });
  }

  return (
    <>
      {Error(error, clearError)}
      <input type="submit" value="Create" onClick={() => create()}/>
    </>
  );
}
