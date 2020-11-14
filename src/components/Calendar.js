import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clickDay from '../store/actionsCreator/clickDay';
import '../styles/Calendar.css';


function Calendar(props) {
  const { curMonth, style } = props;
  const dayData = useSelector(state => state.dayData);
  
  const dispatch = useDispatch();

  const curYear = new Date().getFullYear();
  const date = new Date(curYear, curMonth);
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
      <Link to='/detail'>
      <div 
        className="day-cell" 
        key={i} 
        id = {`day${i}`}
        onClick={() => dispatch(clickDay(curMonth, i+1))}>
          {i + 1}
      </div>
      </Link>
  )
  
  const endBlankDays = new Array(7 - dayOfWeekLast).fill(
    <div className="day-cell"></div>
  )

  const title = new Date(2020, curMonth).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
  });

  useEffect(() => {
    //console.log('use eff ', dayData);
    if (!dayData.length) return;
    for(let i=0; i<4; i += 1) {
      const tops = dayData[i].reduce((prev, item, index) => {
        //console.log('use eff ', item);
        if (item.top) prev = true;
        return prev;
      }, false)
      //console.log(tops);
      if(tops) document.querySelector(`#day${i}`).classList.add('day-cell--top-holiday')
      else document.querySelector(`#day${i}`).classList.remove('day-cell--top-holiday')
    }
  },[dayData])

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
