import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  selectedHome: null,
  getHomeLoading: false,
  getHomeDone: false,
  getHomeError: null,
  editHomeLoading: false,
  editHomeDone: false,
  editHomeError: null,
};

const reducers = {
  getHomeRequest: (state) => {
    state.getHomeLoading = true;
    state.getHomeDone = false;
    state.getHomeError = null;
  },
  getHomeSuccess: (state, { payload: { data } }) => {
    state.getHomeLoading = false;
    state.getHomeDone = true;
    state.selectedHome = data;
  },
  getHomeFailure: (state, { payload: error }) => {
    state.getHomeLoading = false;
    state.getHomeError = error.message;
  },
  editHomeRequest: (state) => {
    state.editHomeLoading = true;
    state.editHomeDone = false;
    state.editHomeError = null;
  },
  editHomeSuccess: (state) => {
    state.editHomeLoading = false;
    state.editHomeDone = true;
  },
  editHomeFailure: (state, { payload: error }) => {
    state.editHomeLoading = false;
    state.editHomeError = error.message;
  },
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers,
});

export const homeReducer = homeSlice.reducer;
export const homeAction = homeSlice.actions;
