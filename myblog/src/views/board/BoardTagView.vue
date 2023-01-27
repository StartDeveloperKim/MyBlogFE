<template>
  <v-container>
    <p class="text-h5 font-weight-bold">{{ tag }} 결과</p>
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
      url: 'http://localhost:8080/board/tag?page=',
      tag: '',
      page: '',
      boards: [],
      pageInfo: null,
      currentPage: 1,
      endPage: null
    }
  },
  methods: {
    getTagBoard () {
      this.tag = this.$route.query.tag
      console.log(this.currentPage)
      this.$axios.get(this.url + this.currentPage + '&tag=' + this.tag)
        .then((response) => {
          this.boards = response.data.boards
          this.pageInfo = response.data.pageInfo
          this.endPage = this.pageInfo.realEndPage
        })
    },
    pageChanged (newPage) {
      this.currentPage = newPage
      this.getTagBoard()
    }
  },
  created () {
    this.getTagBoard()
    this.$watch(
      () => this.$route.query.tag,
      (toParams, previousParams) => {
        console.log('getTagBoard')
        this.currentPage = 1
        this.getTagBoard()
      }
    )
  }

}
</script>
<style>

</style>
