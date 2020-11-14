import React, {Fragment, useEffect, useRef} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import nextSlide from '../store/actionsCreator/nextSlide';
import prevSlide from '../store/actionsCreator/prevSlide';
import updateCurMonth from '../store/actionsCreator/updateCurMonth';
import '../styles/Main.css';
import '../styles/Calendar.css';
import Calendar from '../components/Calendar';
import Loader from '../components/Loader';
import { requestMonthHolydays } from '../store/sagas';

function Main(props) {
  const {isNextSlide, isPrevSlide, direction, curMonth, prevSlide, updateCurMonth, countFlip} = props;
  const isLoad = useSelector(state => state.isLoad);
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
        updateCurMonth(curMonth);
      }, 1000)
    }
  }, [countFlip])

  const leftSlide = {
    position: 'absolute',
    left: '-100%',
  }
  
  return (
    <Fragment>
      <div className="app">
        <div className="prev-btn" onClick={prevSlide}>◄</div>
          <div className="slider">
            <div className="slider__view">
              {isPrevSlide && <Calendar curMonth={curMonth - 1} style={leftSlide}/>}
              <Calendar curMonth={curMonth}/>
              {isNextSlide && <Calendar curMonth={curMonth + 1}/>}
            </div>
          </div>
        <div className="next-btn" onClick={ () => dispatch(nextSlide(curMonth, 'from_right'))}>►</div>
      </div>
      {isLoad && <Loader />}
    </Fragment>
  );
}


function mapStateToProps(store) {
  return {
    isNextSlide: store.isNextSlide,
    isPrevSlide: store.isPrevSlide,
    direction: store.direction,
    curMonth: store.curMonth,
    countFlip: store.countFlip,
  };
}

function mapDispatchToProps(dispatch) {
  return {
   
    prevSlide: () => {
      dispatch(prevSlide());
    },
    updateCurMonth: (e) => {
      dispatch(updateCurMonth(e))
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

