<template>
  <v-app>
    <v-container>

      <v-list density="compact">
        <v-list-item><router-link :to="{name:'ExampleCalendar'}" title="">ExampleCalendar</router-link></v-list-item>
      </v-list>

    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
