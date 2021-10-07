import React from "react";

import "../../styles/control-window.css";

class AddForm extends React.Component {

  state = {
    display: false
  }

  render() {
    return (
      <>
        <div className="background-side" style={{display: (this.state.display) ? "" : "none"}}>
          <div className="control-window">
            <span className="exit" onClick={() => this.setState({display: false})}/>
            <div className="name">Form types</div>
            <div className="list">

              <div className="type" onClick={() => {
                this.props.addForm({
                  name: "check",
                  title: "Question or task",
                  options: [{isTrue: false, title: "Option"}]
                });
                this.setState({display: false});
              }}>
                <div className="check"/>
                <span>Multiple answers</span>
              </div>

              <div className="type" onClick={() => {
                this.props.addForm({
                  name: "radio",
                  title: "Question or task",
                  options: [{isTrue: false, title: "Option"}]
                });
                this.setState({display: false});
              }}>
                <div className="radio"/>
                <span>Single answer</span>
              </div>

              <div className="type" onClick={() => {
                this.props.addForm({
                  name: "date",
                  title: "Question or task"
                });
                this.setState({display: false});
              }}>
                <div className="date"/>
                <span>Date</span>
              </div>

              <div className="type" onClick={() => {
                this.props.addForm({
                  name: "text",
                  title: "Question or task"
                });
                this.setState({display: false});
              }}>
                <div className="text"/>
                <span>Text</span>
              </div>

              <div className="type" onClick={() => {
                this.props.addForm({
                  name: "paragraph",
                  title: "Question or task"
                });
                this.setState({display: false});
              }}>
                <div className="paragraph"/>
                <span>Paragraph</span>
              </div>

              <div className="type" onClick={() => {
                this.props.addForm({
                  name: "upload",
                  title: "Question or task"
                });
                this.setState({display: false});
              }}>
                <div className="upload"/>
                <span>Upload file</span>
              </div>

            </div>
          </div>
        </div>

        <button className="add-form" onClick={() => this.setState({display: true})}/>
      </>
    );
  }
}

export default AddForm;
