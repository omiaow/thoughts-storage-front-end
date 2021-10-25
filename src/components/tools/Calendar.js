import React from "react";

import "../../styles/control-window.css";

class Calendar extends React.Component {

  state = {
    display: false,
    title: "Choose date",
    date: new Date(),
    renderDays: true
  }

  // rendering next month
  moveLeft = () => {
    let newDate = new Date(this.state.date);
    newDate.setMonth(newDate.getMonth() - 1);
    this.setState({date: newDate});
  }

  // rendering previous month
  moveRight = () => {
    let newDate = new Date(this.state.date);
    newDate.setMonth(newDate.getMonth() + 1);
    this.setState({date: newDate});
  }

  // picking up date
  chooseDate = (date) => {
    const shortMonthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + 1);
    this.props.editDate(`${newDate.toISOString().slice(0, 10)}`);
    this.setState({title: `${date.getDate()} - ${shortMonthNames[date.getMonth()]}, ${date.getFullYear()}`, display: false});
  }

  // rendering days by week types
  renderDays = (date) => {
    let days = [];
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    function getWeekDay(date){
      let day = date.getDay();
      if (day === 0) day = 7;
      return day - 1;
    }

    for (let i=0; i<getWeekDay(firstDay); i++) {
      days.push(<div className="empty" key={`${i}-empty`}/>);
    }

    let today = new Date();
    while (firstDay.getTime() <= lastDay.getTime()) {
      let newDate = new Date(firstDay);
      if (newDate.getDate() === today.getDate() && newDate.getMonth() === today.getMonth() && newDate.getFullYear() === today.getFullYear()) {
        days.push(<div className="today" key={newDate.getDate()} onClick={() => this.chooseDate(newDate)}>{newDate.getDate()}</div>);
      } else {
        days.push(<div className="days" key={newDate.getDate()} onClick={() => this.chooseDate(newDate)}>{newDate.getDate()}</div>);
      }
      firstDay.setDate(firstDay.getDate() + 1);
    }

    return (
      <>
        <div className="week-names">
          <div className="weekday">Mo</div>
          <div className="weekday">Tu</div>
          <div className="weekday">We</div>
          <div className="weekday">Th</div>
          <div className="weekday">Fr</div>
          <div className="weekend">Sa</div>
          <div className="weekend">Su</div>
        </div>
        <div className="date-numbers">{days}</div>
      </>
    );
  }

  renderYears = () => {
    let today = new Date();
    let newDate = new Date(`${today.getFullYear()-100}-${today.getMonth()}-${today.getDate()}`);
    newDate.setMonth(newDate.getMonth() + 1);
    let years = [];
    for (let i=0; i<200; i++) {
      let tempDate = new Date(newDate);
      years.push(<div key={i} className="years" onClick={() => this.setState({date: tempDate, renderDays: true})}>{tempDate.getFullYear()}</div>);
      newDate.setYear(newDate.getFullYear() + 1);
    }

    return <div className="year-numbers">{years}</div>;
  }

  render() {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
      <>
        <div className="background-side" style={{display: (this.state.display) ? "" : "none"}}>
          <div className="control-window">
            <span className="exit" onClick={() => this.setState({display: false})}/>
            <div className="name">Date</div>
            <div className="calendar">
              <div className="calendar-header">
                <div className="left-button" onClick={() => this.moveLeft()}/>
                <div className="month-name" onClick={() => this.setState({renderDays: !this.state.renderDays})}>{`${monthNames[this.state.date.getMonth()]} ${this.state.date.getFullYear()}`}</div>
                <div className="right-button" onClick={() => this.moveRight()}/>
              </div>
              {(this.state.renderDays) ? this.renderDays(this.state.date) : this.renderYears(this.state.date)}
            </div>
          </div>
        </div>
        <div className="date" onClick={() => this.setState({display: true})}>{this.state.title}</div>
      </>
    )
  }
}

export default Calendar;
