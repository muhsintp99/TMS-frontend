import {
  fetchTaskSuccess, fetchTaskFailure,
  addTaskSuccess, addTaskFailure,
  updateTaskSuccess, updateTaskFailure,
  deleteTaskSuccess, deleteTaskFailure,
  getTaskByIdSuccess, getTaskByIdFailure,
  getTasksByStatusSuccess, getTasksByStatusFailure,
  getTasksByPrioritySuccess, getTasksByPriorityFailure
} from "./taskSlice";
import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import config from '../../../config';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

// Fetch all tasks
function* fetchTasks() {
  try {
    const response = yield call(axios.get, `${config.ip}/tasks`);
    yield put(fetchTaskSuccess(response.data));
    // Show success message
    // toast.success('Tasks fetched successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(fetchTaskFailure(error.message));
  }
}

// Create a new task
function* addTaskSaga(action) {
  try {
    const response = yield call(axios.post, `${config.ip}/tasks`, action.payload);
    yield put(addTaskSuccess(response.data));
    // Show success message
    toast.success('Task added successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(addTaskFailure(error.message));
  }
}

// Update an existing task
function* updateTaskSaga(action) {
  try {
    // Match the action payload structure from AddEditModel component
    const { id, data } = action.payload;
    const response = yield call(axios.put, `${config.ip}/tasks/${id}`, data);
    yield put(updateTaskSuccess(response.data));
    // Show success message
    toast.success('Task updated successfully', { autoClose: 3000 });

  } catch (error) {
    yield put(updateTaskFailure(error.message));
  }
}

// Delete a task
function* deleteTaskSaga(action) {
  try {
    yield call(axios.delete, `${config.ip}/tasks/${action.payload}`);
    yield put(deleteTaskSuccess(action.payload));
    // Show success message
    toast.success('Task deleted successfully', { autoClose: 3000 });
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}

// Get task by ID
function* getTaskById(action) {
  try {
    const response = yield call(axios.get, `${config.ip}/tasks/${action.payload}`);
    yield put(getTaskByIdSuccess(response.data));
  } catch (error) {
    yield put(getTaskByIdFailure(error.message));
  }
}

// Get tasks by status
function* getTasksByStatus(action) {
  try {
    const response = yield call(axios.get, `${config.ip}/tasks/status/${action.payload}`);
    yield put(getTasksByStatusSuccess(response.data));
  } catch (error) {
    yield put(getTasksByStatusFailure(error.message));
  }
}

// Get tasks by priority
function* getTasksByPriority(action) {
  try {
    const response = yield call(axios.get, `${config.ip}/tasks/priority/${action.payload}`);
    yield put(getTasksByPrioritySuccess(response.data));
  } catch (error) {
    yield put(getTasksByPriorityFailure(error.message));
  }
}

export function* watchTasks() {
  yield takeEvery('tasks/fetchTask', fetchTasks);
  yield takeEvery('tasks/addTask', addTaskSaga);
  yield takeEvery('tasks/updateTask', updateTaskSaga);
  yield takeEvery('tasks/deleteTask', deleteTaskSaga);
  yield takeEvery('tasks/getTaskById', getTaskById);
  yield takeEvery('tasks/getTasksByStatus', getTasksByStatus);
  yield takeEvery('tasks/getTasksByPriority', getTasksByPriority);
}