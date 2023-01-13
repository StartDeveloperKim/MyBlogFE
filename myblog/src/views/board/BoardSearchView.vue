<template>
  <v-container>
    <p class="text-h5 font-weight-bold">{{ query }} 검색결과</p>
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
    <div class="text-center">
      <v-container>
        <v-row justify="center">
          <v-col cols="8">
            <v-container class="max-width">
              <v-pagination
                v-model="currentPage"
                :length="endPage"
                :total-visible="7"
                @input="pageChanged"
              ></v-pagination>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      url: 'http://localhost:8080/board/search?query=',
      query: '',
      page: '',
      boards: [],
      pageInfo: null,
      currentPage: 1,
      endPage: null
    }
  },
  methods: {
    getsearchBoard () {
      this.query = this.$route.query.query
      console.log(this.currentPage)
      this.$axios.get(this.url + this.query + '&page=' + this.currentPage)
        .then((response) => {
          this.boards = response.data.boards
          this.pageInfo = response.data.pageInfo
          this.endPage = this.pageInfo.realEndPage
        })
    },
    pageChanged (newPage) {
      this.currentPage = newPage
      this.getsearchBoard()
    }
  },
  created () {
    this.getsearchBoard()
    this.$watch(
      () => this.$route.query.query,
      (toParams, previousParams) => {
        console.log('getsearchBoard')
        this.currentPage = 1
        this.getsearchBoard()
      }
    )
  }

}
</script>
<style lang="">

</style>
