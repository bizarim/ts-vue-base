import { createStore, createLogger } from "vuex";
import { AuthModule, AuthStore, AuthState } from "@/store/modules/auth";
import { AuthActionTypes } from "@/store/modules/auth/actions";
import { AuthMutationTypes } from "@/store/modules/auth/mutations";
import VuexPersist from "vuex-persist";

export type RootState = {
  AUTH: AuthState;
}

export const AllActionTypes = {
  AUTH: AuthActionTypes
};

export const AllMutationTypes = {
  AUTH: AuthMutationTypes
};

export type Store = AuthStore

const vuexLocal = new VuexPersist<RootState>({
  storage: window.localStorage,
  modules: [
    "AUTH"
  ]
});

export const store = createStore({
  plugins:
    process.env.NODE_ENV === "prod"
      ? [vuexLocal.plugin]
      : [vuexLocal.plugin, createLogger()],
  modules: {
    AUTH: AuthModule
  }
});

export function useStore (): Store {
  return store as Store;
}

export default store;
