import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  userInfo: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  checkUsernameResult: null,
  checkUsernameLoading: false,
  checkUsernameDone: false,
  checkUsernameError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
};

const reducers = {
  signUpReset: (state) => {
    state.signUpLoading = false;
    state.signUpDone = false;
    state.signUpError = null;
    state.checkUsernameResult = '';
  },
  signUpRequest: (state) => {
    state.signUpLoading = true;
    state.signUpDone = false;
    state.signUpError = null;
  },
  signUpSuccess: (state) => {
    state.signUpLoading = false;
    state.signUpDone = true;
  },
  signUpFailure: (state, { payload: error }) => {
    state.signUpLoading = false;
    state.signUpError = error.message;
  },
  checkUsernameRequest: (state) => {
    state.checkUsernameLoading = true;
    state.checkUsernameDone = false;
    state.checkUsernameError = null;
  },
  checkUsernameSuccess: (state, { payload: { data } }) => {
    state.checkUsernameLoading = false;
    state.checkUsernameDone = true;
    state.checkUsernameResult = data;
  },
  checkUsernameFailure: (state, { payload: error }) => {
    state.checkUsernameLoading = false;
    state.checkUsernameError = error.message;
  },
  logInRequest: (state) => {
    state.logInLoading = true;
    state.logInDone = false;
    state.logInError = null;
  },
  logInSuccess: (state, { payload: { data } }) => {
    state.logInLoading = false;
    state.logInDone = true;
    state.userInfo = data;
  },
  logInFailure: (state, { payload: error }) => {
    state.logInLoading = false;
    state.logInError = error.message;
  },
  logOutRequest: (state) => {
    state.logOutLoading = true;
    state.logOutDone = false;
    state.logOutError = null;
  },
  logOutSuccess: (state) => {
    state.logOutLoading = false;
    state.logOutDone = true;
    state.userInfo = null;
  },
  logOutFailure: (state, { payload: error }) => {
    state.logOutLoading = false;
    state.logOutError = error.message;
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
});

export const userReducer = userSlice.reducer;
export const userAction = userSlice.actions;
