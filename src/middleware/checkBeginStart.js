import handleBegin from "@/utils/handleBegin";

function checkBeginStart({ next, router }) {
  const value = handleBegin.getBegin();
  if (!value) {
    return router.push({ name: "convey" });
  } else {
    return next();
  }
}

export default checkBeginStart;
