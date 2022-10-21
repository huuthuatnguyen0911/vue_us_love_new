import { createRouter, createWebHistory } from "vue-router";
import AdminRouter from "./AdminRouter";
import GameRouter from "./GameRouter";
import MeRouter from "./MeRouter";
import FrontendRouter from "./FrontendRouter";
import AuthRouter from "./AuthRouter";

const routes = [
  /**
   * ==============================================================
   * PAGE AUTHEN
   * ==============================================================
   */
  ...AuthRouter,
  /**
   * ==============================================================
   * PAGE ADMIN
   * ==============================================================
   */

  ...AdminRouter,

  /**
   * ==============================================================
   * PAGE GAME
   * ==============================================================
   */
  ...GameRouter,
  /**
   * ==============================================================
   * PAGE ME
   * ==============================================================
   */
  ...MeRouter,
  /**
   * ==============================================================
   * PAGE GROUP CHAT
   * ==============================================================
   */
  /**
   * ==============================================================
   * PAGE FRONTEND
   * ==============================================================
   */
  ...FrontendRouter,

  {
    path: "/:pathMatch(.*)*",
    name: "page_not_found",
    meta: {
      title: "Trang không tồn tại",
    },
    component: () => import("@/views/frontend/PageNotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  document.title = to.meta.title || "Us love";
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];

  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to,
    };

    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return next();
});

export default router;
