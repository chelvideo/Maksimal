import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import '../styles/Calendar.css';

function Calendar(props) {
  const {curMonth} = props;

  const date = new Date(2020, props.date);
  const daysPerMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();            // последний день месяца
  const dayOfWeekLast = new Date(date.getFullYear(), date.getMonth(), daysPerMonth).getDay() ?
                        new Date(date.getFullYear(), date.getMonth(), daysPerMonth).getDay() : 7;   // день недели последнего дня месяца
  const dayOfWeekFirst =  new Date(date.getFullYear(), date.getMonth(), 1).getDay() ?
                          new Date(date.getFullYear(), date.getMonth(), 1).getDay() : 7;             // день недели первого дня месяца

  function startBlankDays() {
    return (
      new Array(dayOfWeekFirst - 1)
        .fill(<div className="day-cell"></div>)
    )
  }

  function daysOfMonth() {
    return (
      new Array(daysPerMonth)
        .fill(0)
        .map((item, i) => {
          return item=<div className="day-cell" key={i}>{i + 1}</div>
        })
    )
  }
    
  function endBlankDays() {
    return (
      new Array(7 - dayOfWeekLast).fill(<div className="day-cell"></div>)
    )
  }


  return (
    <div className="calendar" style={props.style}>
      <div className="calendar__head">{new Date(2020, props.date).toLocaleDateString('ru-RU',{year: 'numeric', month: 'long'})}</div>
      {startBlankDays()}
      {daysOfMonth()}
      {endBlankDays()}
    </div>
  );
}

function mapStateToProps(store) {
  return {
    isNextSlide: store.isNextSlide,
    curMonth: store.curMonth,
    sliderPos: store.sliderPos,
    count: store.count,
  };
}

export default connect(mapStateToProps, null)(Calendar);
