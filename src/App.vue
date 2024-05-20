<template>
  <ExampleCalendar></ExampleCalendar>
</template>

<script>


import ExampleCalendar from "@/components/Calendar/ExampleCalendar.vue";

export default {
  name: 'App',
  components: {ExampleCalendar},
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
