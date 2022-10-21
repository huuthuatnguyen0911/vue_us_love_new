import checkRole from "@/middleware/checkRole";

const AdminRouter = [
  {
    path: "/admin/donate",
    name: "admin_donate",
    meta: {
      title: "Donate Manager",
      middleware: [checkRole.isAdmin],
    },
    component: () => import("@/views/admin/AdminDonate"),
  },
  {
    path: "/admin/campaign",
    name: "admin_campaign",
    meta: {
      title: "Campaign Manager",
      middleware: [checkRole.isAdmin],
    },
    component: () => import("@/views/admin/AdminCampaign"),
  },
  {
    path: "/admin/animal",
    name: "admin_animal",
    meta: {
      title: "Animal Manager",
      middleware: [checkRole.isAdmin],
    },
    component: () => import("@/views/admin/AdminAnimal"),
  },
  //  admin/blogs
  {
    path: "/admin/blogs/:idAuthor",
    name: "admin_blogs",
    meta: {
      title: "Blogs",
      middleware: [checkRole.isAdmin],
    },
    component: () => import("@/views/admin/Adminblogs"),
  },

  {
    path: "/admin/auth-account",
    name: "admin_auth_account",
    meta: {
      title: "Xác thực tài khoản",
      middleware: [checkRole.isAdmin],
    },
    component: () => import("@/views/admin/AdminAuthAccount"),
  },
];

export default AdminRouter;
