const initialState = {
  isNextSlide: false,
  isPrevSlide: false,
  direction: '',
  curMonth: new Date().getMonth(),
  daySelected: 0,
  dayData: [],
  countFlip: 0,
  isLoad: false,
};

export default initialState;
