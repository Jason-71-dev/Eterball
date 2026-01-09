import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: string;
  name: string;
  avatar: string;
  eter: number;
};

interface AuthState {
  user?: User;
  token?: string;
  isConnected: boolean;
}

type LoginActionPayload = {
  user: User;
  token: string;
};

const initialState: AuthState = {
  user: undefined,
  token: undefined,
  isConnected: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginActionPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isConnected = true;
    },
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      state.user = undefined;
      state.token = undefined;
      state.isConnected = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
