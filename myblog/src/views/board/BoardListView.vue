<template>
  <v-container>
    <v-hover v-slot="{ hover }" v-for="(board, i) in boards"
      :key="i">
      <router-link :to="'/board/' + board.id">
        <v-card
        :elevation="hover ? 12 : 2"
        outlined
        rounded="xl"
        hover
        class="mt-3"
        >
          <v-row>
            <v-col cols="4" align-self="center">
              <v-img class="rounded-xl" :src="board.thumbnail"></v-img>
            </v-col>
            <v-col cols="6">
              <v-card-title class="text-h3 font-weight-bold mt-6">{{ board.title }}</v-card-title>
              <v-card-subtitle class="text-h6">{{ board.createDate }}
                <p>조회수 : {{ board.hit }}</p>
              </v-card-subtitle>
            </v-col>
          </v-row>
        </v-card>
      </router-link>
    </v-hover>
    <PagingView></PagingView>
  </v-container>
</template>
<script>
import PagingView from '../board/PagingView.vue'

export default {
  name: 'BoardDetailView',
  props: ['parentCategory', 'childCategory', 'page', 'step'],
  components: { PagingView },
  data () {
    return {
      boards: [],
      paging: this.page,
      pCategory: this.parentCategory
    }
  },
  methods: {
    getBoardList: function () {
      let url
      if (typeof this.childCategory === 'undefined') {
        url = this.parentCategory + '/' + this.page + '/' + this.step
      } else {
        url = this.parentCategory + '/' + this.childCategory + '/' + this.page + '/' + this.step
      }
      this.$axios({
        method: 'GET',
        url: 'http://localhost:8080/board/' + url
      }).then((response) => {
        this.boards = response.data
      })
    }
  },
  created () {
    this.getBoardList()
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // 라우트 변경에 대응...
        console.log('getBoaraList')
        this.getBoardList()
      }
    )
  }
}
</script>
<style>

</style>
