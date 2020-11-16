let data;
let month;
if (sessionStorage.getItem('calendar-month')) month = Number(sessionStorage.getItem('calendar-month'));
else month = new Date().getMonth();
if (sessionStorage.getItem('calendar-data')) data = JSON.parse(sessionStorage.getItem('calendar-data'));
else data = [];

const initialState = {
  isNextSlide: false,
  isPrevSlide: false,
  direction: '',
  curMonth: month,
  daySelected: 0 || Number(sessionStorage.getItem('calendar-day')),
  dayData: data,
  countFlip: 0,
  isLoad: true,
};

export default initialState;
