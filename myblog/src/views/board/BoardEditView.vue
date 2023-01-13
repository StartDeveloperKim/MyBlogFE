<template>
  <v-app>
      <div>
      <v-container fluid align-items="center">
        <div>
          <v-row align="end">
            <v-col cols="8" align-self="center">
              <v-text-field
                label="TITLE"
                :rules="titleRules"
                v-model="title"
                solo
              >
              </v-text-field>
            </v-col>
            <v-col cols="4" align-self="center">
              <v-file-input
                label="THUMBNAIL"
                placeholder="THUMBNAIL"
                prepend-icon="mdi-paperclip"
                solo
                :show-size="1000"
                @change="thumbnailUpload"
              >
              </v-file-input>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="8">
              <Tagify :tags="tags" placeholder=" TAG"></Tagify>
            </v-col>
            <v-col cols="4">
              <v-select
                :items="categoryList"
                item-text="name"
                item-value="id"
                label="CATEGORY"
                v-model="categoryId"
                :rules="categoryRule"
                solo
              ></v-select>
            </v-col>
          </v-row>
        </div>
        <v-row>
          <v-col cols="12">
            <ToastEditor ref="toastuiEditor" class="toast-editor-backgroud"/>
          </v-col>
        </v-row>
        <div class="mt-5">
          <v-btn @click="save" depressed x-large color="primary" class="font-weight-bold">저장하기</v-btn>
          <v-btn @click="cancel" depressed x-large color="error" class="font-weight-bold">취소하기</v-btn>
        </div>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import ToastEditor from '../editor/ToastEditor.vue'
import Tagify from 'tagify-vue'

export default {
  components: {
    ToastEditor, Tagify
  },
  methods: {
    save () {
      const content = this.$refs.toastuiEditor.invoke('getHTML')
      const title = this.title
      const tags = this.tags
      const categoryId = this.categoryId
      const thumbnail = this.thumbnail

      if (title === null) {
        alert('제목을 입력해주세요')
      } else if (categoryId === null) {
        alert('카테고리를 선택해주세요')
      }

      const requestData = {
        title: title,
        content: content,
        categoryId: categoryId,
        thumbnail: thumbnail,
        tags: tags
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      alert(tags)
      this.$axios.post(this.url, requestData, config)
        .then((response) => {
          window.location.href = this.url + '/' + response.data
        })
        .catch(error => {
          alert(error)
        })
    },
    cancel () {
      if (confirm('작성 중인 글이 저장되지 않았을 수도 있습니다.')) {
        window.history.back()
      }
    },
    getBoardEditViewInfo () {
      this.$axios({
        method: 'GET',
        url: this.url + '/edit'
      }).then((response) => {
        this.temporalBoard = response.data.temporalBoardResp
        if (this.temporalBoard !== null) {
          alert('임시저장글이있다. 체크 화면')
        } else {
          this.categoryList = response.data.categoryList
          console.log(this.categoryList)
        }
      })
    },
    async thumbnailUpload (file) {
      const formData = new FormData()
      formData.append('img', file)
      const config = { 'Content-Type': 'multipart/form-data' }
      try {
        const { data } = await this.$axios.post(this.url + '/thumbnail', formData, config)
        this.thumbnail = data
      } catch (e) {
        alert('썸네일 업로드에 실패하였습니다.')
      }
    }
  },
  data: () => ({
    titleRules: [
      value => !!value || '제목을 입력해주세요.'
    ],
    categoryRule: [
      value => !!value || '카테고리를 선택해주세요.'
    ],
    tags: [],
    categoryList: null,
    temporalBoard: null,
    title: null,
    categoryId: null,
    thumbnail: null,
    url: 'http://localhost:8080/board'
  }),
  created () {
    this.getBoardEditViewInfo()
  }
}
</script>
<style>
.edit-backgroud {
 background-color: #ECEFF1;
}
.toast-editor-backgroud {
  background-color: white;
}
</style>
