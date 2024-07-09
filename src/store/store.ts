import {
  configureStore,
  Action,
  StateFromReducersMapObject,
  Dispatch,
  AnyAction,
  EnhancedStore,
  ThunkDispatch,
} from '@reduxjs/toolkit';

import {setupListeners} from '@reduxjs/toolkit/query';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  Storage,
} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {ThunkAction} from 'redux-thunk';

import {rootReducer, createReducer} from './rootReducer';
import {api} from './api';

export type RootState = StateFromReducersMapObject<typeof rootReducer>;

const storage = new MMKV();
const reduxStorage: Storage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
  whitelist: ['common', 'i18n'],
};

const persistedReducer = persistReducer(persistConfig, createReducer());

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(api.middleware);

    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default;
    //   middlewares.push(createDebugger());
    // }

    return middlewares;
  },
});
const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = Store['dispatch'];
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;

export const useAppDispatch = (): Dispatch<AnyAction> &
  ThunkDispatch<RootState, undefined, AnyAction> => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {store, persistor};
