<template>
  <v-container>
    <v-app-bar class="mt-3" rounded="pill" extension-height="50%" fixed app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title class="text-h4 font-weight-bold">꾸준함이 목표인 BLOG</v-app-bar-title>
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-app-bar>

      <v-navigation-drawer v-model="drawer" app>
        <SidebarView></SidebarView>
      </v-navigation-drawer>
  </v-container>
</template>
<script>
import SidebarView from '../nav/SidebarView'

export default {
  name: 'NavigationView',
  components: {
    SidebarView
  },
  data: () => ({
    drawer: false
  })
}
</script>
<style lang="">

</style>
