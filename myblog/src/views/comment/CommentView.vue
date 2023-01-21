<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9">
        <v-textarea
        :label="commentMent"
        auto-grow outlined rows="2"
        row-height="20" shaped
        :disabled="isdisabled"
        v-model="comment">
        </v-textarea>
        <v-row justify="end">
          <v-btn
          color="primary"
          elevation="7"
          @click="save(null)"
          :disabled="isdisabled"
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
                  <v-dialog v-model="dialog" width="600">
                    <template v-slot:activator="{ on, attrs }">
                      <a class="caption" v-bind="attrs" v-on="on" @click="setParentId(comment.commentId)">.답글쓰기</a>
                    </template>

                    <v-card>
                      <v-card-title class="text-h5 font-weight-bold">
                        답글 작성
                      </v-card-title>
                      <v-card-text>
                        <v-row align-center>
                        <v-col cols="12">
                          <v-textarea outlined label="답글 작성" rows=2 v-model="childComment" :disabled="isdisabled"/>
                        </v-col>
                      </v-row>
                      <v-divider />
                      <v-row align-end class="mt-1">
                        <v-col cols="3">
                          <v-btn color="primary" small @click="save()" :disabled="isdisabled">등록</v-btn>
                        </v-col>
                      </v-row>
                      </v-card-text>
                    </v-card>
                  </v-dialog>

                  <a class="caption red--text" v-if="comment.remove" @click="remove(comment.commentId)">.삭제</a>
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
                  <a class="caption red--text" v-if="comment.remove" @click="remove(child.commentId)">.삭제</a>
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
      childComment: '',
      comments: [],
      total: '',
      isdisabled: true,
      isShow: false,
      dialog: false,
      parentId: null,
      commentMent: '로그인을 해주세요',
      url: 'http://localhost:8080/comment/'
    }
  },
  methods: {
    async save () {
      if (this.comment !== '' || this.childComment !== '') {
        const comment = (this.comment !== '') ? this.comment : this.childComment
        const requestData = {
          comment: comment,
          parentId: this.parentId
        }
        console.log(requestData, this.comment)
        await this.$axios.post(this.url + this.$route.params.id, JSON.stringify(requestData), {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
            this.comments = response.data.comments
            this.total = response.data.total
            this.comment = ''
            this.childComment = ''
          })
          .catch((_error) => {
            alert('오류가 발생했습니다.')
          })
      } else {
        alert('댓글을 입력해주세야 합니다.')
      }
    },
    async remove (commentId) {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        await this.$axios.delete(this.url + this.$route.params.id + '/' + commentId, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
            this.comments = response.data.comments
            this.total = response.data.total
            this.comment = ''
          })
          .catch((_error) => {
            alert('오류가 발생했습니다.')
          })
      }
    },
    async getComments () {
      this.$axios.get(this.url + this.$route.params.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => {
          this.comments = response.data.comments
          this.total = response.data.total
        })
        .catch((_error) => {
          alert('오류가 발생했습니다.')
        })
    },
    async setParentId (parentId) {
      this.parentId = parentId
    }
  },
  created () {
    this.getComments()
    const token = localStorage.getItem('token')
    if (token) {
      this.commentMent = '댓글을 입력해주세요'
      this.isdisabled = false
    }
  }
}
</script>
<style>

</style>
