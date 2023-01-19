<template>
  <v-container fluid>
    <v-row align-content="center">
      <v-carousel cycle height="400" style="width:100%">
      <v-carousel-item
        v-for="(response,i) in responses"
        :key="i"
        :src="response.thumbnail"
        reverse-transition="fade-transition"
        transition="fade-transition"
        :gradient="gradient"
      >
        <router-link :to="'/board/'+ response.id">
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h3 font-weight-bold white--text">
              {{ response.title }}
            </div>
          </v-row>
        </router-link>
      </v-carousel-item>
    </v-carousel>
  </v-row>
  <v-row class="mt-3" dense>
      <v-col cols="6" v-for="(response, i) in responses" :key="i">
        <v-hover v-slot="{ hover }">
          <router-link :to="'/board/'+response.id">
          <v-card class="grey lighten-3" outlined :elevation="hover ? 12 : 2" :class="{'on-hover':hover}">
            <div class="d-flex flex-no-wrap">
              <v-avatar
                class="ma-3 justify-space-left"
                size="130"
                tile
              >
                <v-img :src="response.thumbnail"></v-img>
              </v-avatar>
              <div>
                <v-card-title
                  class="text-h5 font-weight-bold"
                  v-text="response.title"
                ></v-card-title>
                <v-card-subtitle>작성일: {{ response.createDate }}</v-card-subtitle>
                <v-card-subtitle>조회수: {{ response.hit }}</v-card-subtitle>
              </div>
            </div>
          </v-card>
        </router-link>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      responses: null,
      gradient: 'rgba(0, 0, 0, .5), rgba(0, 0, 0, .7)'
    }
  },
  methods: {
    getBoards: function () {
      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      this.$axios({
        method: 'GET',
        url: 'http://localhost:8080/',
        headers
      }).then((response) => {
        this.responses = response.data
      })
    }
  },
  created () {
    this.getBoards()
  }
}
</script>
<style lang="">

</style>
