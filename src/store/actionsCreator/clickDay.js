import { CLICK_DAY } from '../actions/actions';

function clickDay(month, day) {
  return {
    type: CLICK_DAY,
    daySelected: day,
    curMonth: month
  };
}

export default clickDay;
