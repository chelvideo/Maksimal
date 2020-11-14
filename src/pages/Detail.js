import React, {Fragment, useEffect, useRef} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';

function HolidayList() {
  const dayData = useSelector(state => state.dayData);
  const daySelected = useSelector(state => state.daySelected);
  console.log(dayData);
  return (
    dayData[daySelected - 1].map(item => 
      <a href={`https://ru.wikipedia.org/?curid=${item.pageid}`}>
        <h3>
          {item.title}
        </h3>
        {Parser(String(item.desc))}
        <img src={item.img}></img>
      </a>
    )
  )
}


function Detail(props) {
  const dayData = useSelector(state => state.dayData);
  const daySelected = useSelector(state => state.daySelected);

  useEffect(() => {

  }, [dayData])
  
  return (
    <div>
        <HolidayList />
    </div>
  );
}


export default Detail;


