import {all , call } from 'redux-saga/effects';

import { watchTasks } from '../container/taskSaga';

export default function* rootSaga() {
    yield all([
        call(watchTasks),
    ]);
}