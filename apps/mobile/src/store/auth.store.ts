import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (token: string, user: User) => Promise<void>;
  clearAuth: () => Promise<void>;
  loadAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (token, user) => {
    await AsyncStorage.setItem("@pfm:token", token);
    await AsyncStorage.setItem("@pfm:user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  clearAuth: async () => {
    await AsyncStorage.removeItem("@pfm:token");
    await AsyncStorage.removeItem("@pfm:user");
    set({ token: null, user: null, isAuthenticated: false });
  },

  loadAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("@pfm:token");
      const userStr = await AsyncStorage.getItem("@pfm:user");
      if (token && userStr) {
        set({ token, user: JSON.parse(userStr), isAuthenticated: true });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
