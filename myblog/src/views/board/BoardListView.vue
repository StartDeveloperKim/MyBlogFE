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
                <p>์กฐํ์ : {{ board.hit }}</p>
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
  name: 'BoardDetailView',
  props: ['parentCategory', 'childCategory', 'page', 'step'],
  data () {
    return {
      boards: [],
      pageInfo: null,
      currentPage: 1,
      pCategory: this.parentCategory,
      endPage: null
    }
  },
  methods: {
    getBoardList: function () {
      let url
      if (typeof this.childCategory === 'undefined') {
        url = this.parentCategory + '/' + this.currentPage + '/' + this.step
      } else {
        url = this.parentCategory + '/' + this.childCategory + '/' + this.currentPage + '/' + this.step
      }

      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      this.$axios({
        method: 'GET',
        url: 'http://localhost:8080/board/' + url,
        headers
      }).then((response) => {
        console.log(response.data)
        this.boards = response.data.boards
        this.pageInfo = response.data.pageInfo
        this.endPage = this.pageInfo.realEndPage
      })
    },
    pageChanged (newPage) {
      this.currentPage = newPage
      this.getBoardList()
    }
  },
  created () {
    this.getBoardList()
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // ๋ผ์ฐํธ ๋ณ๊ฒฝ์ ๋์...
        console.log('getBoaraList')
        this.getBoardList()
      }
    )
  }
}
</script>
<style>

</style>
