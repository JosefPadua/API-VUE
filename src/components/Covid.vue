<template>
  <div class="covid min-h-screen">
    <p class="text-7xl text-center m-5">Klon mzcr covid-19 přehledu</p>
    <div class="grid grid-cols-1 grap-4 md:grid-cols-7">
      <div
        class="bg-indigo-900 text-white rounded shadow border p-6 m-2 text-center"
      >
        <p class="text-white text-sm">Provedené PCR testy</p>
        <h5 class="text-3xl font-bold mb-4 mt-0">
          {{ formatNumber(coviddata.provedene_testy_celkem) }}
        </h5>
        <p class="text-white text-sm">
          (+{{ formatNumber(coviddata.provedene_testy_vcerejsi_den) }} za
          {{ formatDate(coviddata.provedene_testy_vcerejsi_den_datum) }})
        </p>
      </div>

      <div
        class="bg-indigo-800 text-white rounded shadow border p-6 m-2 text-center"
      >
        <p class="text-sm">Provedené antigenní testy</p>
        <h5 class="text-3xl font-bold mb-4 mt-0">
          {{ formatNumber(coviddata.provedene_antigenni_testy_celkem) }}
        </h5>
        <p class="text-sm">
          (+{{ formatNumber(coviddata.provedene_antigenni_testy_vcerejsi_den) }}
          za
          {{
            formatDate(coviddata.provedene_antigenni_testy_vcerejsi_den_datum)
          }})
        </p>
      </div>

      <div
        class="bg-pink-700 text-white rounded shadow border p-6 m-2 text-center"
      >
        <p class="text-sm">Potvrzené případy</p>
        <h5 class="text-3xl font-bold mb-4 mt-0">
          {{ formatNumber(coviddata.potvrzene_pripady_celkem) }}
        </h5>
        <p class="text-sm">
          (+{{ formatNumber(coviddata.potvrzene_pripady_vcerejsi_den) }} za
          {{ formatDate(coviddata.provedene_testy_vcerejsi_den_datum) }})
        </p>
      </div>

      <div
        class="bg-red-900 text-white rounded shadow border p-6 m-2 text-center"
      >
        <p class="text-sm">Aktivní případy</p>
        <h5 class="text-3xl font-bold mb-4 mt-0">
          {{ formatNumber(coviddata.aktivni_pripady) }}
        </h5>
      </div>

      <div
        class="bg-green-500 text-black rounded shadow border p-6 m-2 text-center"
      >
        <p class="text-sm">Vyléčení</p>
        <h5 class="text-3xl font-bold mb-4 mt-0">
          {{ formatNumber(coviddata.vyleceni) }}
        </h5>
      </div>

      <div
        class="bg-gray-300 text-black rounded shadow border p-6 m-2 text-center"
      >
        <p class="text-sm">Úmrtí</p>
        <h5 class="text-3xl font-bold mb-4 mt-0">
          {{ formatNumber(coviddata.umrti) }}
        </h5>
      </div>

      <div
        class="bg-purple-900 text-white rounded shadow border p-6 m-2 text-center"
      >
        <p class="text-sm">Aktuálně hospitalizovaní</p>
        <h5 class="text-3xl font-bold mb-4 mt-0">
          {{ formatNumber(coviddata.aktualne_hospitalizovani) }}
        </h5>
      </div>
    </div>

    <div class="gradient text-white flex items-center min-h-full">
      <div class="container mx-auto p-4 flex flex-wrap items-center">
        <div class="w-full md:w-5/12 text-center p-4">
          <img src="@/assets/covid/bg.svg" alt="bg" />
        </div>
        <div class="w-full md:w-7/12 text-center md:text-left p-4">
          <div class="text-6xl font-medium">500</div>
          <div class="text-xl md:text-3xl font-medium mb-4">
            Oops. Server error
          </div>
          <div class="text-lg mb-8">
            Skutečná simulace webových stránek mzcr musí obsahovat error!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "Covid",
  data() {
    return {
      coviddata: {},
    };
  },
  methods: {
    fetchData() {
      this.axios
        .get(
          "https://onemocneni-aktualne.mzcr.cz/api/v2/covid-19/zakladni-prehled.json"
        )
        .then((response) => {
          this.coviddata = response.data.data[0];
        });
    },
    formatDate(date) {
      return moment(date).format("DD.MM");
    },
    formatNumber(num) {
      const numString = ""+num;
      return numString.replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style scoped>

</style>