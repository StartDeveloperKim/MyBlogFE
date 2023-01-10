<template>
  <v-app>
    <NavigationView></NavigationView>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NavigationView from '../views/nav/NavigationView.vue'

export default {
  name: 'HomeView',
  components: {
    NavigationView
  }
}
</script>
<style>

</style>
