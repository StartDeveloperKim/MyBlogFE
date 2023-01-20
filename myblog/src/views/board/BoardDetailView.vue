<template>
  <v-container>
    <v-card width="100%">
      <v-img height="200px" :src="thumbnail" :gradient="gradient">
        <v-card-title class="white--text mt-10 text-h4 font-weight-bold">{{ title }}</v-card-title>
        <v-card-subtitle class="white--text mt-1">
          {{ createDate }}.
          <!-- 나중에 권한에 따른 수정 및 삭제 여부를 구현하자. -->
          <router-link :to="'/board/new/'+this.id" class="white--text">수정. </router-link>
          <a @click="removeBoard" class="white--text">삭제</a>
        </v-card-subtitle>
      </v-img>
      <v-card-text>
        <Viewer ref="viewer"></Viewer>
      </v-card-text>
      <v-divider class="mx-auto" width="90%"/>
      <CommentView></CommentView>
    </v-card>
  </v-container>
</template>
<script>
import Viewer from '../toast/ToastViewer.vue'
import CommentView from '../comment/CommentView.vue'

export default {
  name: 'BoardDetailView',
  props: ['id'],
  components: { Viewer, CommentView },
  data () {
    return {
      title: '',
      content: '',
      thumbnail: '',
      createDate: '',
      viewer: null,
      gradient: 'rgba(0, 0, 0, .5), rgba(0, 0, 0, .7)'
    }
  },
  methods: {
    getBoard: function () {
      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      this.$axios({
        method: 'GET',
        url: 'http://localhost:8080/board/' + this.id,
        headers
      }).then((response) => {
        this.title = response.data.title
        this.content = response.data.content
        this.thumbnail = response.data.thumbnail
        this.createDate = response.data.createDate
        this.$refs.viewer.setContent(this.content)
      })
    },
    removeBoard: function () {
      alert('게시글 삭제')
    }
  },
  created () {
    this.getBoard()
  }
}
</script>
<style>
a {
  text-decoration: none;
}
</style>
