import { UPDATE_CUR_MONTH } from '../actions/actions';

function updateCurMonth(curMonth) {
  return {
    type: UPDATE_CUR_MONTH,
    curMonth,
  };
}

export default updateCurMonth;
