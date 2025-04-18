import { put, takeEvery } from 'redux-saga/effects';
import { increment, decrement } from './counterSlice';


function* incrementAsync() {
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    yield put(increment());
}

function* decrementAsync() {
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    yield put(decrement());
}

export default function* counterSaga() {
    yield takeEvery('counter/incrementAsync', incrementAsync);
    yield takeEvery('counter/decrementAsync', decrementAsync);
}