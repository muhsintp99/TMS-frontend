import { combineReducers } from 'redux';

import taskReducer from '../container/taskSlice';

const reducer = combineReducers({
    task:taskReducer,
})

export default reducer;