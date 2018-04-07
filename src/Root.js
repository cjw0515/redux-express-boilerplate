import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import App from './components/App';

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default Root;


//store
//modules - 모듈들의 폴더
//index.js - 모듈들을 합칠 파일
//configure - store를 만들 함수
//index - 스토어 생성
