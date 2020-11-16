import { NEXT_SLIDE } from '../actions/actions';

function nextSlide(curMonth, direction) {
  return {
    type: NEXT_SLIDE,
    curMonth,
    direction,
  };
}

export default nextSlide;
