<template>
  <div>
    <div class="flex bg-red-200 p-4" v-if="!isEnv">
      <div class="mr-4">
        <div
          class="h-10 w-10 text-white bg-red-600 rounded-full flex justify-center items-center"
        >
          <i class="material-icons">report</i>
        </div>
      </div>
      <div class="flex justify-between w-full">
        <div class="text-red-600">
          <p class="mb-2 font-bold">Chybí konfigurační hodnoty</p>
          <p class="text-xs">
            Nastavte v .env správné hodnoty pro spojení s API!
          </p>
        </div>
        <div class="text-sm text-gray-500">
          <p>x</p>
        </div>
      </div>
    </div>

    <div class="flex bg-red-200 p-4" v-if="errFet">
      <div class="mr-4">
        <div
          class="h-10 w-10 text-white bg-red-600 rounded-full flex justify-center items-center"
        >
          <i class="material-icons">report</i>
        </div>
      </div>
      <div class="flex justify-between w-full">
        <div class="text-red-600">
          <p class="mb-2 font-bold">Chyba - počasí</p>
          <p class="text-xs">
            {{ errFet }}
          </p>
        </div>
        <div class="text-sm text-gray-500">
          <p>x</p>
        </div>
      </div>
    </div>

    <div
      class="h-screen overflow-hidden flex items-center justify-center"
      v-if="done && secondDone"
      :class="!done || !secondDone ? 'animate-pulse flex space-x-4' : null"
    >
      <p class="text-7xl text-center m-5">OpenWeather API</p>
      <div
        class="w-full mt-16 lg:mt-64 lg:px-40 justify-center container mx-auto"
      >
        <div class="flex flex-wrap w-full lg:w-auto">
          <div
            class="w-full lg:w-1/2 flex rounded-lg bg-auto"
            style="
              background-image: url('https://images.unsplash.com/photo-1559963110-71b394e7494d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80');
            "
          >
            <div
              class="rounded-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white"
            >
              <div class="mb-20">
                <h2 class="font-bold text-3xl leading-none pb-1">
                  {{ currentDay() }}
                </h2>
                <h3 class="leading-none pb-2 pl-1">{{ currentDate() }}</h3>
                <p v-if="!editing" class="flex aling-center opacity-75">
                  <img
                    src="@/assets/weather/placeholder.svg"
                    width="25px"
                    style="margin-right: 3px"
                  />
                  {{ currentWeather.name }} ({{ currentWeather.sys.country }})
                  &nbsp;[ <a href="" @click.prevent="editing =! editing">change</a> ]
                </p>
                <div v-if="editing" class="mb-3 pt-0">
                  <input
                    type="text"
                    placeholder="Location"
                    v-model="city"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full"
                  />
                  <button @click="changeLoc()">Confirm</button>
                </div>
              </div>
              <div>
                <WeatherSvg :icon="icon" />
                <strong class="leading-none text-6xl block font-weight-bolder"
                  >{{ Math.round(currentWeather.main.temp) }}ºC</strong
                >
                <b class="text-2xl block font-bold">{{
                  currentWeather.weather[0].main
                }}</b>
              </div>
            </div>
          </div>
          <div>
            <div
              class="center fixed block top-0 left-0 bg-white opacity-75 z-50"
              v-if="!done || !secondDone"
            >
              <span
                class="text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0"
                style="top: 50%"
              >
                <i class="fas fa-circle-notch fa-spin fa-5x"></i>
              </span>
            </div>
          </div>
          <div class="w-full lg:w-1/2 flex ml-0">
            <div
              class="lg:my-3 bg-gray-800 text-white p-8 lg:rounded-r-lg w-full"
            >
              <div class="flex justify-between w-64 mb-4 w-full"></div>
              <div class="flex justify-between w-64 mb-4 w-full">
                <div class="w-auto font-bold uppercase text-90">Humidity</div>
                <div class="w-auto text-right">
                  {{ currentWeather.main.humidity }} %
                </div>
              </div>
              <div class="flex justify-between w-64 mb-8 w-full">
                <div class="w-auto font-bold uppercase text-90">Wind</div>
                <div class="w-auto text-right">
                  {{ currentWeather.wind.speed }} m/s
                </div>
              </div>
              <div class="flex flex-row">
                <div
                  class="flex flex-col w-1/4 bg-gray-100 text-black rounded-lg pb-4"
                >
                  <div class="text-center pt-2 mb-2">
                    <WeatherSvg
                      :icon="getWeather('icon', 0)"
                      :black="true"
                      class="center"
                    />
                  </div>
                  <div class="text-center">
                    <b class="font-normal">{{ momentDate(0) }}</b
                    ><br />
                    <strong class="text-xl"
                      >{{ getWeather("temp", 0) }}ºC</strong
                    >
                  </div>
                </div>
                <div class="flex flex-col w-1/4 bg-gray-900 rounded-lg">
                  <div class="text-center pt-2 mb-2">
                    <WeatherSvg
                      :icon="getWeather('icon', 1)"
                      :black="false"
                      class="center"
                    />
                  </div>
                  <div class="text-center">
                    <b class="font-normal">{{ momentDate(1) }}</b
                    ><br />
                    <strong class="text-xl"
                      >{{ getWeather("temp", 1) }}ºC</strong
                    >
                  </div>
                </div>
                <div class="flex flex-col w-1/4 bg-gray-900 rounded-lg">
                  <div class="text-center pt-2 mb-2">
                    <WeatherSvg
                      :icon="getWeather('icon', 2)"
                      :black="false"
                      class="center"
                    />
                  </div>
                  <div class="text-center">
                    <b class="font-normal">{{ momentDate(2) }}</b
                    ><br />
                    <strong class="text-xl"
                      >{{ getWeather("temp", 2) }}ºC</strong
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import WeatherSvg from "./svg/WeatherSvg";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

import "materialize-css/dist/css/materialize.min.css";
import "material-design-icons/iconfont/material-icons.css";
export default {
  name: "Weather",
  components: {
    WeatherSvg,
  },
  data() {
    return {
      city: "Prague",
      currentWeather: {},
      forecastWeather: {},
      working: false,
      icon: "01d",
      done: false,
      secondDone: false,
      errFet: "",
      isEnv: false,
      editing: false
    };
  },
  methods: {
    loadWeather() {
      let self = this;
      const options = {
        method: "GET",
        url: "https://community-open-weather-map.p.rapidapi.com/weather",
        params: {
          q: this.city,
          units: "metric",
        },
        headers: {
          "x-rapidapi-key": process.env.VUE_APP_KEY,
        },
      };

      this.axios
        .request(options)
        .then(function (response) {
          self.currentWeather = response.data;
          self.icon = response.data.weather[0].icon;
        })
        .catch(function (error) {
          const message = error.message;
          self.errFet = message;
        })
        .finally(() => {
          this.secondDone = true;
        });

      const options2 = {
        method: "GET",
        url: "https://community-open-weather-map.p.rapidapi.com/forecast",
        params: { q: this.city, units: "metric" },
        headers: {
          "x-rapidapi-key": process.env.VUE_APP_KEY,
        },
      };

      this.axios
        .request(options2)
        .then(function (response) {
          self.forecastWeather = response.data;
        })
        .catch(function (error) {
          const message = error.message;
          self.errFet = message;
        })
        .finally(() => {
          this.done = true;
        });
    },
    currentDay() {
      return moment().format("dddd");
    },
    currentDate() {
      return moment().format("MMM Do");
    },
    momentDate(day) {
      return moment().add(day, "days").format("ddd");
    },
    getWeather(type, day) {
      const days = day * 9;
      if (type === "temp") {
        if (moment().format("DD") > 12)
          return Math.round(this.forecastWeather.list[0 + days].main.temp);
        else return Math.round(this.forecastWeather.list[3 + days].main.temp);
      } else if (type === "icon") {
        if (moment().format("DD") > 12)
          return this.forecastWeather.list[0 + days].weather[0].icon;
        else return this.forecastWeather.list[3 + days].weather[0].icon;
      }
    },
    getEnv() {
      process.env.VUE_APP_KEY ? (this.isEnv = true) : (this.isEnv = false);
    },
    changeLoc() {
        this.editing = false;
        this.loadWeather();
    }
  },
  beforeMount() {
    this.getEnv();
    this.loadWeather();
  },
};
</script>

<style scoped>
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 35%;
}
</style>