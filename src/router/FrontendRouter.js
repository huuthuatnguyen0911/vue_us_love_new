import checkBeginStart from "@/middleware/checkBeginStart";
import checkRole from "@/middleware/checkRole";

const FrontendRouter = [
  {
    path: "/manager-animal",
    name: "ManagerAnimal",
    meta: {
      middleware: [checkRole.isLogin],
    },
    component: () => import("@/views/frontend/ManagerCampaign"),
  },
  {
    path: "/messages/me",
    name: "ChatMe",
    meta: {
      middleware: [checkRole.isLogin],
    },
    component: () => import("@/views/frontend/Chat/MainGroupChat"),
  },
  {
    path: "/animal/:slug_animal",
    name: "detail_animal",
    meta: {
      title: "Chi tiết động vật",
    },
    component: () => import("@/views/frontend/AnimalView"),
  },
  {
    path: "/donate/:slug_campaign",
    name: "donate_campaign",
    meta: {
      title: "Quyên góp",
    },
    component: () => import("@/views/frontend/DonateView"),
  },
  {
    path: "/home",
    name: "home",
    meta: {
      title: "Trang chủ",
      middleware: [checkBeginStart],
    },
    component: () => import("@/views/frontend/HomeView"),
  },
  {
    path: "/actives",
    name: "actives",
    meta: {
      title: "Hoạt động",
      middleware: [checkBeginStart],
    },
    component: () => import("@/views/frontend/ActivityView.vue"),
  },

  {
    path: "/blog",
    name: "blog",
    meta: {
      title: "Bài viết",
      middleware: [checkBeginStart],
    },
    component: () => import("@/views/frontend/BlogView.vue"),
  },
  {
    path: "/events",
    name: "events",
    meta: {
      title: "Sự kiện",
      middleware: [checkBeginStart],
    },
    component: () => import("@/views/frontend/EventView.vue"),
  },
  {
    path: "/blog/:slugBlog",
    name: "detail_blog",
    meta: {
      title: "blog_detail",
    },
    component: () => import("@/views/frontend/DetailBlog"),
  },

  {
    path: "/report",
    name: "report",
    meta: {
      title: "Báo cáo",
      middleware: [checkBeginStart],
    },
    component: () => import("@/views/frontend/ReportView.vue"),
  },
  {
    path: "/campaign/:province_campaign/:id_campaign/:slug_campaign",
    name: "detail_campaign",
    component: () => import("@/views/frontend/campaign/CampaignDetail.vue"),
  },
  {
    path: "/condition-campaign",
    name: "conditionCampaign",
    meta: {
      title: "Điền kiện tạo chiến dịch",
      middleware: [checkRole.isLogin],
    },
    component: () => import("@/views/frontend/campaign/CampaignCondition.vue"),
  },

  {
    path: "/create-campaign",
    name: "create_campaign",
    meta: {
      title: "Tạo chiến dịch",
      middleware: [checkRole.isLogin],
    },
    component: () => import("@/views/frontend/campaign/CreateCampaign.vue"),
  },

  {
    path: "/",
    name: "convey",
    meta: {
      title: "Thông điệp",
    },
    component: () => import("@/views/frontend/BeginStartView"),
  },
];
export default FrontendRouter;
