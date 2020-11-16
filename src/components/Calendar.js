import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import clickDay from '../store/actionsCreator/clickDay';
import '../styles/Calendar.scss';

function Calendar(props) {
  const { curMonth, style } = props;
  const dayData = useSelector((state) => state.dayData);
  const dispatch = useDispatch();

  const curYear = new Date().getFullYear();
  const daysPerMonth = new Date(curYear, curMonth + 1, 0).getDate();
  // Порядковый номер дня недели последнего дня месяца
  const dayOfWeekLast = new Date(curYear, curMonth, daysPerMonth).getDay() || 7;
  // Порядковый номер дня недели первого дня месяца
  const dayOfWeekFirst = new Date(curYear, curMonth, 1).getDay() || 7;

  const head = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'].map((item) => <div className="calendar__head" key={item}>{item}</div>);

  const startBlankDays = new Array(dayOfWeekFirst - 1).fill(0).map((item, i) => <div className="day-cell" key={i + 100} />);

  const daysOfMonth = new Array(daysPerMonth).fill(0).map((item, i) => (
    <Link to="/detail" key={i}>
      <div
        className="day-cell"
        id={`day${i}`}
        onClick={() => dispatch(clickDay(curMonth, i + 1))}
      >
        {i + 1}
      </div>
    </Link>
  ));

  const endBlankDays = new Array(7 - dayOfWeekLast).fill(0).map((item, i) => <div className="day-cell" key={i + 200} />);

  const endCount = (dayOfWeekFirst - 1 + daysPerMonth + 7 - dayOfWeekLast);
  let fillEndCount;
  if (endCount === 28) fillEndCount = 14;
  else if (endCount === 35) fillEndCount = 7;
  else fillEndCount = 0;
  const fillEnd = new Array(fillEndCount).fill(0).map((item, i) => <div className="day-cell" key={i + 300} />);
  const title = new Date(curYear, curMonth).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    Array.from(document.querySelectorAll('.day-cell')).forEach((item) => item.classList.remove('day-cell--top-holiday'));
    for (let i = 0; i < dayData.length; i += 1) {
      const isTop = dayData[i].reduce((prev, item) => {
        if (item.isTop) prev = true;
        return prev;
      }, false);
      if (isTop) document.querySelector(`#day${i}`).classList.add('day-cell--top-holiday');
    }
  }, [dayData]);

  return (
    <div className="calendar" style={style}>
      <div className="calendar__title">{title}</div>
      {head}
      {startBlankDays}
      {daysOfMonth}
      {endBlankDays}
      {fillEnd}
    </div>
  );
}

export default Calendar;
