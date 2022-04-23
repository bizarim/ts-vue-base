# ts-vue-base


### [ directory ]
```sh
│  README.md
├─public
├─src
│  ├─assets         // cdn 전 or 개발 이미지
│  ├─components     // 공용 component
│  ├─service        // axios wrap
│  ├─store          // redux store
│  ├─views          // 페이지 단위 component
│  └─
└─
```

### [ 사용 미들웨어 ]
``` typescript
    1. vue
      - "vue": "^3.0.0"
    2. vuex
      - "vuex": "^4.0.0-0"
      - "vuex-persist": "^3.1.3"
    3. axios
      - "axios": "^0.24.0"
    4. css loader
      - "sass": "^1.26.5", 
      - "sass-loader": "^8.0.2"
    5. ui
      - "element-plus": "^1.2.0-beta.5"
      - "@vueup/vue-quill": "^1.0.0-beta.7"
    6. lint
      - "eslint": "^6.7.2"
```

### [ 실행 ]
``` typescript
    yarn build     // prod build
    yarn start     // local
    yarn lint:fix  // lint fix
```

### [ vuex 사용법 ]
step 1 : action 정의 및 구현
파일 src/store/modules/{이름}/actions.ts
``` typescript
    type ActionAugments = GenerateActionAugments<AuthState, AuthMutations>
    export enum AuthActionTypes { LOGOUT = "LOGOUT" }
    export type AuthActions = { [AuthActionTypes.LOGOUT](context: ActionAugments): void; }
    export const actions: ActionTree<AuthState, RootState> & AuthActions = {
    async [AuthActionTypes.LOGOUT] ({ commit }) {
        try {
            commit(AuthMutationTypes.LOGOUT, undefined);
        } catch (e) { }
    }
    };
```

step 2 : state 정의
파일 src/store/modules/{이름}/state.ts
``` typescript
    export type AuthState = { isLoggedIn: boolean }
    export const state: AuthState = { isLoggedIn: true };
```

step 3 : getters  정의 및 구현
파일 src/store/modules/{이름}/getters.ts
``` typescript
    export type AuthGetters = { isLoggedIn(state: AuthState): boolean }
    export const getters: GetterTree<AuthState, RootState> & AuthGetters = {
        isLoggedIn: (state: AuthState): boolean => state.isLoggedIn,
    }
```

step 4 : mutations 정의 및 구현
파일 src/store/modules/{이름}/mutations.ts
``` typescript
    export enum AuthMutationTypes { LOGOUT = "LOGOUT" }
    export type AuthMutations = { [AuthMutationTypes.LOGOUT](state: AuthState): void; }
    export const mutations: MutationTree<AuthState> & AuthMutations = {
        [AuthMutationTypes.LOGOUT] (state) { state.isLoggedIn = false; }
    };
```

step 5 : moudule 연결
파일 src/store/modules/{이름}/index.ts
``` typescript
    export type AuthStore = GenerateStoreType<Pick<RootState, "AUTH">, AuthMutations, AuthGetters, AuthActions>;
    export const AuthModule: Module<AuthState, RootState> = { state, mutations, actions, getters };
```


step 6 : store 생성
파일 src/store/index.ts
``` typescript
    // state, action, mutation, store combine
    export type RootState = { AUTH: AuthState; }
    export const AllActionTypes = { AUTH: AuthActionTypes };
    export const AllMutationTypes = { AUTH: AuthMutationTypes };
    export type Store = AuthStore
    // vuex persist plugin 적용
    const vuexLocal = new VuexPersist<RootState>({ storage: window.localStorage, modules: [ "AUTH" ] });
    // 생성
    export const store = createStore({
        plugins:[vuexLocal.plugin]
        modules: { AUTH: AuthModule }
    });
    // 사용 함수 정의
    export function useStore (): Store { return store as Store; }
```

step 7 : store 적용
파일 src/main.ts
``` typescript
    import store from "./store";
    createApp(App).use(ElementPlus).use(store).use(router).mount("#app");
```

step 8 : store 사용
파일 src/components/CtmHeader.ts
``` typescript
    export default defineComponent({
        setup () {
            // store 사용
            const store = useStore();
        ...
```


### [ axios intercept ]
step 1: axios 생성 및 기본 설정
파일 src/servcie/restApi.ts
``` typescript
    export const restApi = axios.create({
        baseURL: '',
        headers: { 'Content-Type': 'application/json' },
    });
```

step 2: request interceptor 설정
jwt header 설정
파일 src/servcie/restApi.ts
``` typescript
    restApi.interceptors.request.use(
        makeAuthHeader, // <-- header 설정
        error => { return Promise.reject(error); }
    );
```

step 3: response interceptor 설정
jwt 토큰 만료 시 처리를 위해
파일 src/servcie/restApi.ts
``` typescript
    restApi.interceptors.response.use(
        onRefreshToken,  // <-- 원하는 설정
        error => { return Promise.reject(error); }
    );
```

### [ element plus 사용법 ]
step 1 : element plus 적용
파일 src/main.ts
``` typescript
    import "element-plus/dist/index.css";
    import ElementPlus from "element-plus";
    createApp(App).use(ElementPlus).use(store).use(router).mount("#app");
```

step 2 : html css linck
파일 public/index.html
``` html
    <!DOCTYPE html>
    <html lang="">
    <head>
        <link rel="stylesheet" href="https://unpkg.com/element-plus/dist/index.css">
    </head>
```


### [ samplepage ]
step 1 : sample page
파일 src/views/Sample.vue
``` vue
    <template>
    <el-container class="pg-sample">
        <ctm-header />  // 사용자 정의 header
        <el-container>  // element plus 
        <ctm-aside />   // 사용자 정의 aside
        <router-view />
        </el-container>
    </el-container>
    </template>
    <script>
    import CtmHeader from "@/components/CtmHeader.vue";
    import CtmAside from "@/components/CtmAside.vue";
    import { defineComponent } from "vue";

    export default defineComponent({
    components: {
        CtmHeader,  // component 연결
        CtmAside
    }
    });
    </script>
    <style lang="scss">
    .pg-sample {    // css 정의
        display: flex;
        flex-direction: column;
    }
    </style>
```
