import {all , call } from 'redux-saga/effects';

import { watchFetchTasks } from '../container/taskSaga';

export default function* rootSaga() {
    yield all([
        call(watchFetchTasks),
    ]);
}