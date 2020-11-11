import React, {useEffect, useRef} from 'react';
import { connect } from 'react-redux';
import nextSlide from '../store/actionsCreator/nextSlide';
import prevSlide from '../store/actionsCreator/prevSlide';
import updateCurMonth from '../store/actionsCreator/updateCurMonth';
import '../styles/App.css';
import '../styles/Calendar.css';
import Calendar from './Calendar';

function App(props) {
  const {isNextSlide, isPrevSlide, direction, curMonth, nextSlide, prevSlide, updateCurMonth, count} = props;

  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const sliderView = document.querySelector('.slider__view');
      switch (direction) {
        case 'from_right':
          sliderView.classList.add('slider__view--from-right');
          break;
        case 'from_left':
          sliderView.classList.add('slider__view--from-left');
          break;
      }
      
      setTimeout(() => {
        sliderView.classList.remove('slider__view--from-right');
        sliderView.classList.remove('slider__view--from-left');
        updateCurMonth(curMonth);
      }, 1000)
    }
  }, [count])

  const leftSlide = {
    position: 'absolute',
    left: '-100%',
  }
  
  return (
    <div className="app">
      <div className="prev-btn" onClick={prevSlide}>◄</div>
        <div className="slider">
          <div className="slider__view">
            {isPrevSlide && <Calendar curMonth={curMonth - 1} style={leftSlide}/>}
            <Calendar curMonth={curMonth}/>
            {isNextSlide && <Calendar curMonth={curMonth + 1}/>}
          </div>
        </div>
      <div className="next-btn" onClick={nextSlide}>►</div>
    </div>
  );
}


function mapStateToProps(store) {
  return {
    isNextSlide: store.isNextSlide,
    isPrevSlide: store.isPrevSlide,
    direction: store.direction,
    curMonth: store.curMonth,
    count: store.count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    nextSlide: () => {
      dispatch(nextSlide());
    },
    prevSlide: () => {
      dispatch(prevSlide());
    },
    updateCurMonth: (e) => {
      dispatch(updateCurMonth(e))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);


