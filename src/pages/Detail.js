import React from 'react';
import { useSelector } from 'react-redux';
import Parser from 'html-react-parser';
import Loader from '../components/Loader';
import '../styles/Detail.scss';

function holidayList() {
  const dayData = useSelector((state) => state.dayData);
  const daySelected = useSelector((state) => state.daySelected);
  const dayDataNew = dayData.slice();
  if (!dayDataNew.length) return <Loader />;
  return (
    dayDataNew[daySelected - 1].slice().map((item, index) => (
      <div className="card" key={index}>
        <a href={`https://ru.wikipedia.org/?curid=${item.pageid}`}>
          <h3>{item.title}</h3>
          <div className="card__detail">
            <div>
              {Boolean(item.desc) && Parser(String(item.desc))}
            </div>
            <img src={item.img} />
          </div>
        </a>
      </div>
    ))
  );
}

function Detail() {
  const curMonth = useSelector((state) => state.curMonth);
  const day = useSelector((state) => state.daySelected);
  const curYear = new Date().getFullYear();
  const date = new Date(curYear, curMonth, day).toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' });

  return (
    <div className="detail">
      <h2 className="title">
        Праздники
        {' '}
        {date}
      </h2>
      {holidayList()}
    </div>
  );
}

export default Detail;
