import { MutationTree } from "vuex";
import { AuthState } from "./state";

export enum AuthMutationTypes {
  LOGOUT = "LOGOUT"
}

export type AuthMutations = {
  [AuthMutationTypes.LOGOUT](state: AuthState): void;
}

export const mutations: MutationTree<AuthState> & AuthMutations = {
  [AuthMutationTypes.LOGOUT] (state) {
    state.isLoggedIn = false;
  }
};
