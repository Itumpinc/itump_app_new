import {combineReducers, Reducer} from '@reduxjs/toolkit';
import {i18nReducer} from 'i18n/i18nSlice';
import {storageReducer} from './services/storage';
import {api} from './api';

export const rootReducer = {
  i18n: i18nReducer,
  common: storageReducer,
  [api.reducerPath]: api.reducer,
};

export function createReducer(): Reducer {
  return combineReducers(rootReducer);
}
