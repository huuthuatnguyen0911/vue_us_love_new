const GameRouter = [
  {
    path: "/flip-card",
    name: "game_flip_card",
    meta: {
      title: "Flip card game",
    },
    component: () => import("@/views/frontend/game/FlipCardView"),
  },
];

export default GameRouter;
