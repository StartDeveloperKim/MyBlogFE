<template>
  <v-container>
    <v-card width="100%">
      <v-img height="200px" :src="thumbnail" :gradient="gradient">
        <v-card-title class="white--text mt-10 text-h4 font-weight-bold">{{ title }}</v-card-title>
        <v-card-subtitle class="white--text mt-1">
          {{ createDate }}.
          <router-link :to="'/edit/'+this.$route.params.id" class="white--text" v-if="this.modify">수정. </router-link>
          <a @click="removeBoard" class="white--text" v-if="this.modify">삭제</a>
          <HeartView />
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
import HeartView from '../heart/HeartView.vue'

export default {
  name: 'BoardDetailView',
  props: ['id'],
  components: { Viewer, CommentView, HeartView },
  data () {
    return {
      title: '',
      content: '',
      thumbnail: '',
      createDate: '',
      modify: null,
      viewer: null,
      gradient: 'rgba(0, 0, 0, .5), rgba(0, 0, 0, .7)',
      url: 'http://localhost:8080/board/'
    }
  },
  methods: {
    getBoard: function () {
      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      this.$axios({
        method: 'GET',
        url: this.url + this.id,
        headers
      }).then((response) => {
        this.title = response.data.title
        this.content = response.data.content
        this.thumbnail = response.data.thumbnail
        this.createDate = response.data.createDate
        this.modify = response.data.modify
        this.$refs.viewer.setContent(this.content)
      })
    },

    async removeBoard () {
      if (confirm('게시글을 삭제하시겠습니까?')) {
        await this.$axios.delete(this.url + this.$route.params.id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
            if (response.data === 'success') {
              alert('성공적으로 삭제되었습니다.')
              window.location.href = '/'
            } else {
              alert('오류가 발생했습니다.')
            }
          })
          .catch((_error) => {
            alert('오류가 발생했습니다 : ', _error)
          })
      }
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
