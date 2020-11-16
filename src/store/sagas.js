import {
  takeEvery, put, all, select, takeLatest, take,
} from 'redux-saga/effects';
import { CLICK_DAY, NEXT_SLIDE, PREV_SLIDE } from './actions/actions';
import setData from './actionsCreator/setData';
import { getDayData } from './selectors';

const urlTemplate = 'https://ru.wikipedia.org/w/api.php?action=query&format=json&origin=*';
const search = ['МИР', 'ЗЕМЛЯ', 'МЕЖДУНАРОД'];

function* requestDayDetail(action) {
  const dayData = yield select(getDayData);
  const dayDataNew = dayData.slice();
  dayDataNew.map((item) => item.slice());
  const dayIndex = action.daySelected - 1;
  for (let holidayIndex = 0; holidayIndex < dayDataNew[dayIndex].length; holidayIndex += 1) {
    const id = dayDataNew[dayIndex][holidayIndex].pageid;
    const { title } = dayDataNew[dayIndex][holidayIndex];
    // request of main info about a holiday
    try {
      const url = `${urlTemplate}&pageids=${id}&prop=extracts&exintro=1`;
      const resp = yield fetch(url);
      const data = yield resp.json();
      dayDataNew[dayIndex][holidayIndex].desc = (data.query.pages[id].extract);
    } catch {
      console.log('main info error');
    }
    // request of main image in article about a holiday
    try {
      const url = `${urlTemplate}&prop=pageimages&piprop=thumbnail&pithumbsize=200&titles=${title}`;
      const resp = yield fetch(url);
      const data = yield resp.json();
      dayDataNew[dayIndex][holidayIndex].img = (data.query.pages[id].thumbnail.source);
    } catch {
      console.log('image error ');
    }
  }
  yield put(setData(dayDataNew));
}

function* requestDayHolidays(curYear, curMonth, day) {
  let dayData;

  const date = new Date(curYear, curMonth, day)
    .toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })
    .replace(' ', '_');
  // request for all holidays on a specific day
  const url = `${urlTemplate}&list=categorymembers&cmtitle=Категория:Праздники_${date}`;
  const resp = yield fetch(url);
  if (!resp.ok) {
    throw Error(resp.statusText);
  }
  const data = yield resp.json();
  dayData = data.query.categorymembers;

  for (let index = 0; index < dayData.length; index += 1) {
    const id = dayData[index].pageid;
    const { title } = dayData[index];
    // request 'box info' of holiday
    const url = `${urlTemplate}&pageids=${id}&prop=revisions&rvprop=content&rvsection=0`;
    const resp = yield fetch(url);
    const data = yield resp.json();
    const info = JSON.stringify(data.query.pages[id].revisions[0]).replace(/ {1,}/g, ' ').toUpperCase();
    const iStart = info.indexOf('ОТМЕЧАЕТСЯ = ');
    const iEnd = info.indexOf('\N', iStart);
    const topContainer = info.slice(iStart + 13, iEnd - 1);
    console.log(topContainer);
    const isTop = search.reduce((prev, item) => {
      if (topContainer.includes(item)) prev = true;
      return prev;
    }, false);
    const isTopInTitle = search.reduce((prev, item) => {
      if (title.toUpperCase().includes(item)) prev = true;
      return prev;
    }, false);
    dayData[index].isTop = isTop || isTopInTitle;
  }

  return dayData;
}

export function* requestMonthHolydays(action = { curMonth: new Date().getMonth() }) {
  const curYear = new Date().getFullYear();
  let curMonth;
  switch (action.direction) {
    case 'from_right':
      curMonth = action.curMonth + 1;
      break;
    case 'from_left':
      curMonth = action.curMonth - 1;
      break;
    default:
      curMonth = action.curMonth;
  }

  const daysPerMonth = new Date(curYear, curMonth + 1, 0).getDate();
  const dayDataNew = [];
  for (let day = 1; day <= daysPerMonth; day += 1) {
    const data = yield requestDayHolidays(curYear, curMonth, day);
    dayDataNew.push(data);
  }
  yield put(setData(dayDataNew));
}

function* rootSaga() {
  yield all([
    yield takeLatest(CLICK_DAY, requestDayDetail),
    yield takeLatest([NEXT_SLIDE, PREV_SLIDE], requestMonthHolydays),
  ]);
}

export default rootSaga;
