<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9">
        <v-textarea
        label="댓글을 입력해주세요"
        auto-grow outlined rows="2"
        row-height="20" shaped
        v-model="comment">
        </v-textarea>
        <v-row justify="end">
          <v-btn
          color="primary"
          elevation="7"
          @click="save"
          >등록</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="9">
        <v-card>
        <v-card-subtitle>댓글:{{ total }}</v-card-subtitle>
          <v-list v-for="comment in comments" :key="comment.commentId">
            <v-list-item>
              <v-avatar size="35px" class="mr-3">
                <img :src="comment.userThumbnail"/>
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="font-weight-bold">{{ comment.userName }}</span>.
                  <span class="caption">{{ comment.createDate }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>{{ comment.content }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="child in comment.childCommentDtos" :key="child.commentId" class="ml-5">
              <v-avatar size="35px" class="mr-3">
                <img :src="child.userThumbnail"/>
              </v-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <span class="font-weight-bold">{{ child.userName }}</span>.
                  <span class="caption">{{ child.createDate }}</span>
                </v-list-item-title>
                <v-list-item-subtitle>{{ child.content }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      comment: '',
      comments: [],
      total: '',
      url: 'http://localhost:8080/comment/'
    }
  },
  methods: {
    save () {
      alert(this.comment)
    },
    getComments () {
      this.$axios.get(this.url + this.$route.params.id)
        .then((response) => {
          this.comments = response.data.comments
          this.total = response.data.total
        })
    }
  },
  created () {
    this.getComments()
  }
}
</script>
<style>

</style>
