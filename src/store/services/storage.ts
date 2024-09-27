import {createSlice} from '@reduxjs/toolkit';

interface GlobalState {
  status: number;
  theme: string;
  storage: any;
}

const initialState: GlobalState = {
  status: 200,
  theme: 'light',
  storage: {},
};

export const storageSlice = createSlice({
  name: 'storage',
  initialState,
  reducers: {
    setStatus: (state, status) => {
      state.status = status.payload;
    },
    setTheme: (state, theme) => {
      state.theme = theme.payload;
    },
    setData: (state, data) => {
      const {payload} = data;
      state.storage[payload.key] = payload.value;
    },
    removeData: (state, data) => {
      const {payload} = data;
      const newState = {
        storage: {
          ...state.storage,
        },
      };
      delete newState.storage[payload];
      state.storage = newState.storage;
    },
    logoutAction: state => {
      const newState = {
        storage: {
          ...state.storage,
          tokens: undefined,
          user: undefined,
          primaryBusiness: undefined,
          business: undefined,
        },
      };
      state.storage = newState.storage;
    },
  },
});

export const {setTheme, setData, logoutAction, removeData} =
  storageSlice.actions;

export const storageReducer = storageSlice.reducer;
