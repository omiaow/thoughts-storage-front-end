import React from "react";

import "../../styles/control-window.css";

class AddForm extends React.Component {

  state = {
    display: false // for recognizing to display
  }

  render() {
    return (
      <>
        <div className="background-side" style={{display: (this.state.display) ? "" : "none"}}>
          <div className="control-window">
            <span className="exit" onClick={() => this.setState({display: false})}/>
            <div className="name">Form types</div>
            <div className="list">

              {/* choosing checkbox form card */}

              <div className="type" onClick={() => {
                this.props.addForm({
                  isImportant: false,
                  name: "check",
                  title: "Question or task",
                  options: [{isTrue: false, title: "Option"}]
                });
                this.setState({display: false});
              }}>
                <div className="check"/>
                <span>Multiple answers</span>
              </div>

              {/* choosing radiobutton form card */}

              <div className="type" onClick={() => {
                this.props.addForm({
                  isImportant: false,
                  name: "radio",
                  title: "Question or task",
                  options: [{isTrue: false, title: "Option"}]
                });
                this.setState({display: false});
              }}>
                <div className="radio"/>
                <span>Single answer</span>
              </div>

              {/* choosing date form card */}

              <div className="type" onClick={() => {
                this.props.addForm({
                  isImportant: false,
                  name: "date",
                  title: "Question or task"
                });
                this.setState({display: false});
              }}>
                <div className="date"/>
                <span>Date</span>
              </div>

              {/* choosing text form card */}

              <div className="type" onClick={() => {
                this.props.addForm({
                  isImportant: false,
                  name: "text",
                  title: "Question or task",
                  text: "Answer"
                });
                this.setState({display: false});
              }}>
                <div className="text"/>
                <span>Text</span>
              </div>

              {/* choosing textarea form card */}

              <div className="type" onClick={() => {
                this.props.addForm({
                  isImportant: false,
                  name: "paragraph",
                  title: "Question or task",
                  text: "Answer"
                });
                this.setState({display: false});
              }}>
                <div className="paragraph"/>
                <span>Paragraph</span>
              </div>

              {/* choosing file uploading form card */}
              
              <div className="type" onClick={() => {
                this.props.addForm({
                  isImportant: false,
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
