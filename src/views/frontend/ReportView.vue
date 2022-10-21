<style></style>
<template>
  <DefaultFrontend_1>
    <div id="reportView">
      <section class="sc__reportProcess">
        <report-process />
      </section>

      <section class="sc__formReport pb-50">
        <ReportForm />
      </section>
    </div>
  </DefaultFrontend_1>
</template>

<script>
import DefaultFrontend_1 from "@/layouts/DefaultFrontend_1.vue";
import ReportProcess from "@/components/frontend/ReportProcess.vue";
import ReportForm from "@/components/frontend/ReportForm.vue";

export default {
  name: "ReportView",
  components: { DefaultFrontend_1, ReportProcess, ReportForm },
};
</script>
