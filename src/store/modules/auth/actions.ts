import { ActionTree } from "vuex";
import { AuthMutations, AuthMutationTypes } from "./mutations";
import { AuthState } from "./state";
import { RootState } from "@/store";
import { GenerateActionAugments } from "@/store/util";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ActionAugments = GenerateActionAugments<AuthState, AuthMutations>

export enum AuthActionTypes {
    LOGOUT = "LOGOUT"
}

export type AuthActions = {
    [AuthActionTypes.LOGOUT](context: ActionAugments): void;
}

export const actions: ActionTree<AuthState, RootState> & AuthActions = {
  async [AuthActionTypes.LOGOUT] ({ commit }) {
    try {
      commit(AuthMutationTypes.LOGOUT, undefined);
    } catch (e) {

    }
  }
};
