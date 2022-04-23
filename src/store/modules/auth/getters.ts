import { GetterTree } from "vuex";
import { AuthState } from "./state";
import { RootState } from "@/store";

export type AuthGetters = {
  isLoggedIn(state: AuthState): boolean
  test(state: AuthState): void
}

export const getters: GetterTree<AuthState, RootState> & AuthGetters = {
  isLoggedIn: (state: AuthState): boolean => state.isLoggedIn,
  test: (state: AuthState): void => { console.log(state.isLoggedIn); }
};

interface AuthToken {
  accessToken: string;
  refreshToken: string;
  lastAction: Date;
}

export const getAccessToken = (): string | undefined => {
  return "fake_token";
  // return undefined;
  // const obj = localStorage.getItem("AuthToken");
  // if (obj === null) return undefined;
  // const authToken: AuthToken = JSON.parse(obj);
  // return authToken.accessToken;
};

export const setAccessToken = (token: string): void => {
  const obj = localStorage.getItem("AuthToken");
  if (obj === null) return;
  const authToken: AuthToken = JSON.parse(obj);
  authToken.accessToken = token;
  localStorage.setItem("AuthToken", JSON.stringify(authToken));
};
