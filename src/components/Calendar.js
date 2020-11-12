import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clickDay from '../store/actionsCreator/clickDay';
import '../styles/Calendar.css';

function Calendar(props) {
  const { curMonth, style } = props;
  //const curMonth = useSelector(store => store.curMonth);
  const dispatch = useDispatch();

  const date = new Date(2020, curMonth);
  const daysPerMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();    // последний день месяца
  const dayOfWeekLast =                                                                 // день недели последнего дня месяца
    new Date(date.getFullYear(), date.getMonth(), daysPerMonth).getDay() ?
    new Date(date.getFullYear(), date.getMonth(), daysPerMonth).getDay() : 7; 
  const dayOfWeekFirst =                                                                // день недели первого дня месяца
    new Date(date.getFullYear(), date.getMonth(), 1).getDay() ?
    new Date(date.getFullYear(), date.getMonth(), 1).getDay() : 7;          

  const startBlankDays = new Array(dayOfWeekFirst - 1).fill(
    <div className="day-cell"></div>
  )

  const daysOfMonth = new Array(daysPerMonth).fill(0).map((item, i) => 
    item = 
      <div 
        className="day-cell" 
        key={i} 
        onClick={() => dispatch(clickDay(curMonth, i+1))}>
          {i + 1}
      </div>
  )
  
  const endBlankDays = new Array(7 - dayOfWeekLast).fill(
    <div className="day-cell"></div>
  )

  const title = new Date(2020, curMonth).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
  });

  return (
    <div className="calendar" style={style}>
      <div className="calendar__head">{title}</div>
        {startBlankDays}
        {daysOfMonth}
        {endBlankDays}
    </div>
  );
}

export default Calendar;
