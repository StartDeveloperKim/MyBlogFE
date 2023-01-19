<template>
  <v-container class="justify-center">
    <v-app-bar class="mt-3" rounded="pill" extension-height="50%" app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <router-link to="/" class="black--text">
          <v-app-bar-title class="text-h4 font-weight-bold">꾸준함이 목표인 BLOG</v-app-bar-title>
        </router-link>
        <v-spacer />
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon @click="dialog=!dialog" v-if="checkToken()">
                <v-icon
                color="primary"
                large
                v-bind="attrs"
                v-on="on"
              >
                mdi-login
                </v-icon>
              </v-btn>
            </template>
            <span class="font-weight-bold">로그인</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <router-link to="/edit">
              <v-btn
              class="ma-2"
              outlined
              color="blue"
              v-bind="attrs"
              v-on="on"
              >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            </router-link>
          </template>
          <span class="font-weight-bold">글 쓰기</span>
        </v-tooltip>
        <v-dialog v-model="dialog" width="500">
          <v-card>
            <v-card-title class="text-h6 grey lighten-2 font-weight-bold">
              로그인
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols=6>
                  <v-btn id="google" @click="login('google')" color="red" class="ma-2 white--text font-weight-bold">
                      <v-icon>
                        mdi-google
                      </v-icon>
                      .Google
                    </v-btn>
                </v-col>
                <v-col cols=6>
                  <v-btn id="naver" @click="login('naver')" color="green" class="ma-2 white--text font-weight-bold">
                      <v-icon x-large>
                        mdi-alpha-n
                      </v-icon>
                      Naver
                    </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
          </v-card>
        </v-dialog>
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
    drawer: false,
    dialog: false,
    BASE_URL: 'http://localhost:8080'
  }),
  methods: {
    login (server) {
      window.location.href = this.BASE_URL + '/oauth2/authorization/' + server + '?redirect_url=' + window.location.origin
    },
    checkToken () {
      // token이 없다면 로그인 표시가 떠야한다.
      const result = localStorage.getItem('token')
      console.log('token : ' + result)
      return result == null
    }
  }
}
</script>
<style>

</style>
