import { PREV_SLIDE } from '../actions/actions';

function prevSlide(curMonth, direction) {
  return {
    type: PREV_SLIDE,
    curMonth,
    direction,
  };
}

export default prevSlide;
