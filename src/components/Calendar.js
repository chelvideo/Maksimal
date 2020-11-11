import React, { Fragment } from 'react';
import { connect, useSelector } from 'react-redux';
import '../styles/Calendar.css';

async function clickDayHandler(day, month) {
  const category = new Date(2020, month, day).toLocaleDateString('ru-RU',{ month: 'long', day: 'numeric'}).replace(' ','_');
  console.log(category);
  const endpoint = `https://ru.wikipedia.org/w/api.php?format=json&action=query&list=categorymembers&origin=*&cmtitle=Категория:Праздники_${category}`;
  const resp = await fetch(endpoint);
  if (!resp.ok) {
    throw Error(resp.statusText);
  }
  const json = await resp.json();
  console.log(json);
  json.query.categorymembers.map(item => console.log(item.title));

}

function Calendar(props) {
  const { curMonth, style } = props;

  const date = new Date(2020, curMonth);
  const daysPerMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();              // последний день месяца
  const dayOfWeekLast = new Date(date.getFullYear(), date.getMonth(), daysPerMonth).getDay() ?
                        new Date(date.getFullYear(), date.getMonth(), daysPerMonth).getDay() : 7; // день недели последнего дня месяца
  const dayOfWeekFirst =  new Date(date.getFullYear(), date.getMonth(), 1).getDay() ?
                          new Date(date.getFullYear(), date.getMonth(), 1).getDay() : 7;          // день недели первого дня месяца

  const startBlankDays = new Array(dayOfWeekFirst - 1).fill(
    <div className="day-cell"></div>
  )

  const daysOfMonth = new Array(daysPerMonth).fill(0).map((item, i) => 
    item = 
      <div 
        className="day-cell" 
        key={i} 
        onClick={ () => clickDayHandler(i + 1, curMonth) }>
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
