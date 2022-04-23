import { ActionContext, CommitOptions, DispatchOptions, Store as VuexStore } from "vuex";
import { RootState } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type _funcMap = { [k: string]: (...args: any) => any }

export type GenerateActionAugments<A, M extends _funcMap> = Omit<ActionContext<A, RootState>, "commit"> & {
  commit<K extends keyof M>(
    key: K,
    payload: Parameters<M[K]>[1]
  ): ReturnType<M[K]>;
}

export type GenerateStoreType<S, M extends _funcMap, G extends _funcMap, A extends _funcMap> =
  Omit<VuexStore<S>, "commit" | "getters" | "dispatch">
  & {
    commit<K extends keyof M, P extends Parameters<M[K]>[1]>(
      key: K,
      payload: P,
      options?: CommitOptions,
    ): ReturnType<M[K]>;
  }
  & {
    getters: {
      [K in keyof G]: ReturnType<G[K]>
    };
  }
  & {
    dispatch<K extends keyof A>(
      key: K,
      payload: Parameters<A[K]>[1],
      options?: DispatchOptions,
    ): ReturnType<A[K]>;
  };
