<template>
  <v-container>
    <NavigationView />
    <router-view />
  </v-container>
</template>
<script>
import NavigationView from '../nav/NavigationView.vue'

export default {
  components: [
    NavigationView
  ]
}
</script>
<style>

</style>
