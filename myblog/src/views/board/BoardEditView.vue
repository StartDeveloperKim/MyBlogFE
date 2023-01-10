<template>
  <div class="edit-backgroud">
    <v-container fluid align-items="center">
      <div>
        <v-row align="end">
          <v-col cols="8" align-self="center">
            <v-text-field
              label="TITLE"
              :rules="titleRules"
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
              :items="item"
              label="CATEGORY"
              solo
            ></v-select>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12">
          <Editor ref="toastuiEditor" class="toast-editor-backgroud"/>
        </v-col>
      </v-row>
      <v-btn @click="save">저장하기</v-btn>
    </v-container>
  </div>
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/vue-editor'
import Tagify from 'tagify-vue'

export default {
  components: {
    Editor, Tagify
  },
  methods: {
    save () {
      const content = this.$refs.toastuiEditor.invoke('getHTML')
      alert(content)
    },
    getBoardEditViewInfo () {
      this.$axios({
        method: 'GET',
        url: 'http://localhost:8080/board/edit'
      }).then((response) => {
        this.temporalBoard = response.data.temporalBoardResp
        if (this.temporalBoard !== null) {
          alert('임시저장글이있다. 체크 화면')
        } else {
          this.categoryList = response.data.categoryList
          console.log(this.categoryList)
        }
      })
    }
  },
  data: () => ({
    titleRules: [
      value => !!value || '제목을 입력해주세요.'
    ],
    tags: [],
    categoryList: null,
    temporalBoard: null,
    item: ['1', '2', '3']
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
