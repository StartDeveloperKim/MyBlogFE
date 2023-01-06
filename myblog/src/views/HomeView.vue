<template>
  <v-container>
    <v-carousel cycle height="400" width="1000">
      <v-carousel-item
        v-for="(response,i) in responses"
        :key="i"
        :src="response.thumbnail"
        reverse-transition="fade-transition"
        transition="fade-transition"
        :gradient="gradient"
      >
          <v-row class="fill-height" align="center" justify="center">
            <div class="text-h3 font-weight-bold white--text">
              {{ response.title }}
            </div>
          </v-row>
      </v-carousel-item>
    </v-carousel>
    <v-row class="mt-3">
      <v-col cols="4" v-for="(response, i) in responses" :key="i">
        <v-card class="mx-auto" max-width="400">
          <v-img class="white--text align-end" outline height="200px" v-bind:src="response.thumbnail">
          </v-img>
          <p class="text-h6" overflow-hidden>{{ response.title }}</p>
          <v-card-subtitle class="pb-0">{{ response.createDate }}</v-card-subtitle>
          <v-card-text class="text--primary">
            <div>Whitehaven Beach</div>

            <div>Whitsunday Island, Whitsunday Islands</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HomeView',
  data () {
    return {
      items: [
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
        }
      ],
      responses: null,
      gradient: 'rgba(0, 0, 0, .5), rgba(0, 0, 0, .7)'
    }
  },
  methods: {
    getBoards: function () {
      this.$axios({
        method: 'GET',
        url: 'http://localhost:3805/'
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
<style>

</style>
