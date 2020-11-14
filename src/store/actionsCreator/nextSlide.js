import { NEXT_SLIDE } from '../actions/actions';

function nextSlide(curMonth, direction) {
  return {
    type: NEXT_SLIDE,
    curMonth: curMonth,
    direction: direction,
  };
}

export default nextSlide;
