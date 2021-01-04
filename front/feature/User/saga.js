import axios from 'axios';
import { call, put, takeLatest, debounce } from 'redux-saga/effects';
import { userAction } from './slice';

function signUpAPI(data) {
  return axios.post('/user', data);
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.payload);
    console.log(result);
    yield put(userAction.signUpSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(userAction.signUpFailure(error));
  }
}

export function* watchSignUp() {
  yield takeLatest(userAction.signUpRequest, signUp);
}

function checkUsernameAPI(data) {
  return axios.post('/user/check', { username: data });
}

function* checkUsername(action) {
  try {
    const result = yield call(checkUsernameAPI, action.payload);
    console.log(result);
    yield put(userAction.checkUsernameSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(userAction.checkUsernameFailure(error));
  }
}

export function* watchCheckUsername() {
  yield debounce(500, userAction.checkUsernameRequest, checkUsername);
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(logInAPI, action.payload);
    console.log(result);
    yield put(userAction.logInSuccess(result));
  } catch (error) {
    console.error(error);
    yield put(userAction.logInFailure(error));
  }
}

export function* watchLogIn() {
  yield takeLatest(userAction.logInRequest, logIn);
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logOutAPI);
    yield put(userAction.logOutSuccess());
  } catch (error) {
    console.error(error);
    yield put(userAction.logOutFailure(error));
  }
}

export function* watchLogOut() {
  yield takeLatest(userAction.logOutRequest, logOut);
}
