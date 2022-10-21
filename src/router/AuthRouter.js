const AuthRouter = [
  {
    path: "/login",
    name: "login",
    meta: {
      title: "Đăng nhập",
    },
    component: () => import("@/views/auth/login"),
  },
  {
    path: "/register",
    name: "register",
    meta: {
      title: "Đăng kí",
    },
    component: () => import("@/views/auth/register"),
  },
];
export default AuthRouter;
