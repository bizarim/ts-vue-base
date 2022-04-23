<template>
  <el-header id="header">
    <el-row class="row-bg" justify="space-between">
      <span>header</span>
      <div>
        <div id="nav-content">
          <div v-show="!isLoggedIn">
            <el-button color="#626aef" style="color: white" @click="handleOnRegister"
              >회원가입</el-button
            >
            <el-button color="#626aef" style="color: white" @click="handleOnLogin">로그인</el-button>
          </div>
          <el-button color="#626aef" style="color: white" @click="handleOnLogout" v-if="isLoggedIn"
            >로그아웃</el-button
          >
          <el-button color="#626aef" style="color: white" @click="handleOnLogout" v-if="isLoggedIn"
            >로그아웃</el-button
          >
        </div>
      </div>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRouter, RouteRecordRaw } from "vue-router";
import { routes } from "../router";
import { useStore, AllActionTypes } from "@/store";

export default defineComponent({
  setup () {
    const store = useStore();
    const { push } = useRouter();
    const isLoggedIn = computed(() => store.getters.isLoggedIn);
    const handleOnRegister = () => push("/register");
    const handleOnLogin = () => push("/login");
    const handleOnLogout = async () => {
      await store.dispatch(AllActionTypes.AUTH.LOGOUT, undefined);
    };

    const navItems = routes.filter((route: RouteRecordRaw) => {
      const { name, component } = route;
      return name && component;
    });

    return {
      handleOnLogin,
      handleOnRegister,
      handleOnLogout,
      navItems,
      isLoggedIn
    };
  }
});
</script>

<style lang="scss">
.el-header,
.el-footer {
  background-color: blueviolet;
  color: white;
  text-align: center;
  line-height: 60px;
}
</style>
