import { NEXT_SLIDE, PREV_SLIDE, UPDATE_CUR_MONTH, CLICK_DAY, SET_DATA } from '../actions/actions';

function reducer(state, action) {

  switch (action.type) {
    case NEXT_SLIDE:
      return {
        ...state,
        isNextSlide: true,
        count: state.count += 1,
        direction: 'from_right',
      };

    case PREV_SLIDE:
      return {
        ...state,
        isPrevSlide: true,
        count: state.count += 1,
        direction: 'from_left',
      };

    case UPDATE_CUR_MONTH:
      return {
        ...state,
        curMonth: state.direction === 'from_right' ? action.curMonth + 1 : action.curMonth - 1,
        isNextSlide: false,
        isPrevSlide: false,
      };
    
    case CLICK_DAY:
      return {
        ...state,
        daySelected: action.daySelected
      };

    case SET_DATA:
      return {
        ...state,
        dayData: action.dayData.slice()
      };

    default: return state;
  }
}

export default reducer;
