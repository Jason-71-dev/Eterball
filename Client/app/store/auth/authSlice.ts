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

function safeReadUserLS(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const str = localStorage.getItem('user');
    return str ? JSON.parse(str) : null;
  } catch {
    return null;
  }
}

function safeWriteUserLS(user: User): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('user', JSON.stringify(user));
  } catch {
    // ignore
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginActionPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isConnected = true;

      // (recommandé) persister à chaque login pour que refresh soit cohérent
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('token', action.payload.token);
          // stocker "User" tel quel (id/name/avatar/balance)
          safeWriteUserLS(action.payload.user);
        } catch {
          // ignore
        }
      }
    },

    // FIX: mise à jour du solde + synchro localStorage
    setBalance: (state, action: PayloadAction<number>) => {
      const newBalance = action.payload;

      if (state.user) {
        state.user.balance = newBalance;
      }

      // synchro pour éviter que remette l'ancien solde au refresh
      const lsUser = safeReadUserLS();
      if (lsUser) {
        lsUser.balance = newBalance;
        safeWriteUserLS(lsUser);
      } else if (state.user) {
        // si jamais localStorage n'avait pas encore user
        safeWriteUserLS(state.user);
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
