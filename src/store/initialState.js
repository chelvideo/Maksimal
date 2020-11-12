const initialState = {
  isNextSlide: false,
  isPrevSlide: false,
  direction: '',
  curMonth: new Date().getMonth(),
  daySelected: 0,
  dayData: [],
  count: 0,
};

export default initialState;
