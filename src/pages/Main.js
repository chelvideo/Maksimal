import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import nextSlide from '../store/actionsCreator/nextSlide';
import prevSlide from '../store/actionsCreator/prevSlide';
import updateCurMonth from '../store/actionsCreator/updateCurMonth';
import '../styles/Main.scss';
import Calendar from '../components/Calendar';
import Loader from '../components/Loader';

function Main(props) {
  const {
    isNextSlide, isPrevSlide, direction, curMonth, countFlip, isLoad,
  } = props;
  const dispatch = useDispatch();

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
        dispatch(updateCurMonth(curMonth));
      }, 500);
    }
  }, [countFlip]);

  const leftSlide = {
    position: 'absolute',
    left: '-100%',
  };

  return (
    <>
      <div className="app">
        <div
          className="prev-btn"
          onClick={() => dispatch(prevSlide(curMonth, 'from_left'))}
        >
          ◄
        </div>
        <div className="slider">
          <div className="slider__view">
            {isPrevSlide && <Calendar curMonth={curMonth - 1} style={leftSlide} />}
            <Calendar curMonth={curMonth} />
            {isNextSlide && <Calendar curMonth={curMonth + 1} />}
          </div>
        </div>
        <div
          className="next-btn"
          onClick={() => dispatch(nextSlide(curMonth, 'from_right'))}
        >
          ►
        </div>
      </div>
      {isLoad && <Loader />}
    </>
  );
}

function mapStateToProps(state) {
  return {
    isNextSlide: state.isNextSlide,
    isPrevSlide: state.isPrevSlide,
    direction: state.direction,
    curMonth: state.curMonth,
    countFlip: state.countFlip,
    isLoad: state.isLoad,
  };
}

export default connect(mapStateToProps, null)(Main);
