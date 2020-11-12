import { SET_DATA } from '../actions/actions';

function setData(data) {
  return {
    type: SET_DATA,
    dayData: data,
  };
}

export default setData;
