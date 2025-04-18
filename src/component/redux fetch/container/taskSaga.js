
import { fetchTaskFailure, fetchTaskSuccess } from "./taskSlice";
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config'

function* fetchTasks() {
  try {
    const response = yield call(axios.get, `${config.ip}/tasks`);
    yield put(fetchTaskSuccess(response.data));
  } catch (error) {
    yield put(fetchTaskFailure(error.message));
  }
}

export function* watchFetchTasks() {
  yield takeEvery('tasks/fetchTask', fetchTasks);
}
