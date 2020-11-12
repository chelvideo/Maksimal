import { takeEvery, put, call } from 'redux-saga/effects';
import { CLICK_DAY } from './actions/actions';
import setData from './actionsCreator/setData';

function* sagaWatcher() {
    yield takeEvery(CLICK_DAY, sagaWorker);
}

function* sagaWorker(action) {

    const date = new Date(2020, action.curMonth, action.daySelected).toLocaleDateString('ru-RU',{ month: 'long', day: 'numeric'}).replace(' ','_');
    const url = `https://ru.wikipedia.org/w/api.php?format=json&action=query&list=categorymembers&origin=*&cmtitle=Категория:Праздники_${date}`;
    const resp = yield fetch(url);
    console.log(resp);
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    const data = yield resp.json();
    yield put(setData(data.query.categorymembers));
    console.log(data);
    data.query.categorymembers.map(item => console.log(item.title));
}

export default sagaWatcher;