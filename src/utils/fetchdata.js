import axios from 'axios';
import { put } from 'redux-saga/effects';

export default function* fetchData({ api, method, data, successAction, errorAction }) {
  try {
    const response = yield call(axios, {
      url: api,
      method,
      data,
    });
    yield put(successAction(response.data));
  } catch (error) {
    yield put(errorAction(error.message));
  }
}
