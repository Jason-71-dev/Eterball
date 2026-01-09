import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type User = {
  id: string;
  name: string; // pseudo ou identifier
  avatar: string;
  balance: number; // remplace eter
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

    // NEW: mise à jour du solde après achat (ou autre)
    setBalance: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.balance = action.payload;
      }
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

export const { login, logout, setBalance } = authSlice.actions;
export default authSlice.reducer;
