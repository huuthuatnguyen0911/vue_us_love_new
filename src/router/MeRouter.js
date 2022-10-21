import checkRole from "@/middleware/checkRole";

const MeRouter = [
  {
    path: "/me/:idUser",
    name: "person",
    meta: {
      middleware: [checkRole.isLogin],
    },
    component: () => import("@/views/frontend/me/MeMain"),
  },
];

export default MeRouter;
