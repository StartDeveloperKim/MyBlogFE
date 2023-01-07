<template>
  <v-app>
    <NavigationView/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import NavigationView from './views/nav/NavigationView.vue'
export default {
  name: 'App',
  components: {
    NavigationView
  },
  data: () => ({
    //
  })
}
</script>

<style>
#app {
  background: url('../src/assets/backgroundImg.png');
  background-size: cover;
}
a {
  text-decoration: none;
}
</style>
