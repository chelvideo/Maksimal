import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Detail from './pages/Detail.js';
import Main from './pages/Main.js';
import store from './store/store';
import './styles/index.scss';

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <Route exact path="/" component={Main} />
      <Route path="/detail" component={Detail} />
    </Provider>
  </HashRouter>,
  document.getElementById('root'),
);
