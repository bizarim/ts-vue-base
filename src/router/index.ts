import { getAccessToken } from "@/store/modules/auth/getters";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "sample",
    component: () => import(/* webpackChunkName: "sample" */ "../views/Sample.vue"),
    children: [
      {
        path: "edit",
        component: () => import(/* webpackChunkName: "sample" */ "../views/Edit.vue")
      },
      {
        path: "empty",
        component: () => import(/* webpackChunkName: "sample" */ "../views/Empty.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import(/* webpackChunkName: "about" */ "../views/Empty.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// router 접근 전 선행 처리
router.beforeEach(async (to, from, next) => {
  // 우아하진 않다.
  const tt = getAccessToken();
  console.log(tt);
  if (to.path === "/") {
    next();
  } else {
    if (undefined === tt) {
      if (to.path === "/login") {
        next();
      } else {
        next({ path: "/login" });
      }
    } else {
      next();
    }
  }
});

// router 접근 후 처리
router.afterEach((to, from, failure) => {
  console.log("router afterEach", failure);
});

export default router;
