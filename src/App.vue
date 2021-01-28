<template>
  <div id="app">
    <full-page ref="fullpage" id="fullpage" :options="options">
      <div class="section">
        <Weather />
      </div>
      <div class="section">
        <Covid />
      </div>
    </full-page>
  </div>
</template>

<script>
import Weather from "@/components/Weather.vue";
import Covid from "@/components/Covid.vue";

export default {
  name: "App",
  components: {
    Weather,
    Covid,
  },
  data() {
    return {
      options: {
        anchors: ['Weather', 'Covid19clone'],
        sectionsColor: ['#D1D3C4', '#BDC696'],
        controlArrows: true,

      },
    }
  }
};
</script>

<style>
</style>
