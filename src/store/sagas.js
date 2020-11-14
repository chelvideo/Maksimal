import { useState } from 'react';
import { takeEvery, put, all, select } from 'redux-saga/effects';
import { CLICK_DAY, NEXT_SLIDE } from './actions/actions';
import setData from './actionsCreator/setData';
import { getDayData } from './selectors';

function* requestDayHolidays(action) {
    //console.log(action);
    const date = new Date(2020, action.curMonth, action.daySelected).toLocaleDateString('ru-RU',{ month: 'long', day: 'numeric'}).replace(' ','_');
    const url = `https://ru.wikipedia.org/w/api.php?format=json&action=query&list=categorymembers&origin=*&cmtitle=Категория:Праздники_${date}`;
    const resp = yield fetch(url);
    //console.log(resp);
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    const data = yield resp.json();
    
    //console.log(data);
    //data.query.categorymembers.map(item => console.log(item.title));
    return data.query.categorymembers
}

function* requestTopHolydays(daysPerMonth) {
    let dayData = yield select(getDayData);
    dayData = dayData.slice();
    dayData.map(item => item.slice());
    //console.log(dayData);
    for(let i=0; i<4; i += 1) {
        for (let index=0; index<dayData[i].length; index += 1) {
            //console.log(dayData[i]);
            //console.log(i,' ',index);
            const id=dayData[i][index].pageid;
            const url = `https://ru.wikipedia.org/w/api.php?format=json&action=query&pageids=${id}&prop=revisions&rvprop=content&rvsection=0&origin=*`;
            const resp = yield fetch(url);
            const data = yield resp.json();
            const info = JSON.stringify(data.query.pages[id].revisions[0]).replace(/ {1,}/g," ").toUpperCase();
            const iStart = info.indexOf('ОТМЕЧАЕТСЯ = ');
            const iEnd = info.indexOf('\N', iStart);
            const top = info.slice(iStart + 13 , iEnd - 1);
            if (top.includes('РОССИЯ')) {
                dayData[i][index].top = true;
            } else {
                dayData[i][index].top = false;
            }
            //console.log(iStart, '       ', top);
        }
    }
    console.log(dayData);
    yield put(setData(dayData));
}


function* requestMonthHolydays(action) {
    //console.log(action);
    const curYear = new Date().getFullYear();
    const date = action.direction === 'from_right' ? 
        new Date(curYear, action.curMonth + 1) : new Date(curYear, action.curMonth - 1);
    const daysPerMonth = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
    //console.log(daysPerMonth);
    const newData = [];
    for (let i = 1; i<5; i += 1) {
        //console.log(i);
        const data = yield requestDayHolidays({curMonth:date.getMonth(), daySelected:i});
        newData.push(data);

    }
    yield put(setData(newData));
    yield requestTopHolydays(daysPerMonth);
}

function* rootSaga() {
    yield all([
        yield takeEvery(CLICK_DAY, requestDayHolidays),
        yield takeEvery(NEXT_SLIDE, requestMonthHolydays),
    ])
  }

export default rootSaga;