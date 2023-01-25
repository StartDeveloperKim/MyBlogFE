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
            <div id="editor" ref="toastEditor" class="toast-editor-backgroud"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="auto" class="mr-auto">
            <v-btn @click="save(url)" depressed x-large color="primary" class="font-weight-bold pa-2" v-if="boardId === null">저장</v-btn>
            <v-btn @click="update(url)" depressed x-large color="primary" class="font-weight-bold pa-2" v-if="boardId !== null">수정</v-btn>
            <v-btn @click="cancel" depressed x-large color="error" class="font-weight-bold pa-2 ml-2">취소</v-btn>
          </v-col>
          <v-col cols="auto" v-if="boardId === null">

              <v-switch
                v-model="isTemporalSave"
                inset
                label="임시저장"
                class="font-weight-bold"
                @click="startTemporalSave"
              >
              </v-switch>
          </v-col>
        </v-row>
        <v-snackbar v-if="boardId === null" v-model="snackbar" absolute bottom color="success" outlined right>
           <strong>임시저장</strong> 되었습니다.
        </v-snackbar>
      </v-container>
    </div>
  </v-app>
</template>
<script>
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/editor'
import Tagify from 'tagify-vue'

export default {
  components: {
    Tagify
  },
  props: ['id'],
  mounted () {
    this.editor = new Editor({
      el: document.querySelector('#editor'),
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '400px',
      hooks: {
        addImageBlobHook: this.addImageBlobHook
      }
    })
  },
  methods: {
    async addImageBlobHook (file, setText, type) {
      try {
        if (!file) return false

        if (file && file.size > 5242880) {
          // const size = (file.size / (1000 * 1000).toFixed(1))
          alert('최대 업로드 사이즈(5MB)를 초과 하였습니다.')
          return false
        }

        const formData = new FormData()
        formData.append('image', file)

        this.$axios.post(this.url + '/toast', formData, {
          headers: {
            'Content-type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
          .then((response) => {
            const imageURL = response.data
            console.log(imageURL)
            setText(imageURL, 'image')
            return imageURL
          })
      } catch (e) {
        alert('파일 업로드에 실패하였습니다.')
      }
    },

    startTemporalSave () {
      if (this.isTemporalSave === true) {
        const url = 'http://localhost:8080/temporal-board'
        this.temporalSave = setInterval(() => {
          if (this.temporalBoardId === null) {
            this.save(url)
          } else {
            this.save(url + '/' + this.temporalBoardId)
          }
        }, 60000) // 1분마다 임시저장 함
      } else {
        clearInterval(this.temporalSave)
      }
    },

    destroyed () {
      clearInterval(this.temporalSave)
    },

    getRequestData () {
      const content = this.editor.getHTML()
      const title = this.title
      const tags = this.tags
      const categoryId = this.categoryId
      const thumbnail = this.thumbnail

      const requestData = {
        title: title,
        content: content,
        categoryId: categoryId,
        thumbnail: thumbnail,
        tags: tags
      }

      return requestData
    },

    save (url) {
      const requestData = this.getRequestData()

      if (requestData.title === null && url === this.url) {
        alert('제목을 입력해주세요')
        return 0
      } else if (requestData.categoryId === null && url === this.url) {
        alert('카테고리를 선택해주세요')
        return 0
      }

      // if (this.temporalBoardId !== null) {
      //   url = url + '/' + this.temporalBoardId
      // }

      this.$axios.post(url, JSON.stringify(requestData), {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => {
          if (url === this.url) {
            this.destroyed()
            if (this.temporalBoardId !== null) {
              this.deleteTemporalBoard()
            }
            window.location.href = this.redirectUrl + '/board/' + response.data
          } else if (this.temporalBoardId === null) {
            this.snackbar = true // snackbar 띄우기
            this.temporalBoardId = response.data // 임시저장 글 ID 저장
          } else {
            if (response.data === 'success') {
              this.snackbar = true
            } else {
              alert('오류가 발생했습니다.')
            }
          }
        }).catch(error => {
          alert('에러 발생!!' + error)
        })
    },

    update (url) {
      const requestData = this.getRequestData()
      this.$axios.patch(url + '/' + this.boardId, JSON.stringify(requestData), {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => {
          alert('글이 수정되었습니다.')
          window.location.href = this.redirectUrl + '/board/' + response.data
        })
        .catch(error => {
          alert('에러 발생!!' + error)
        })
    },

    cancel () {
      if (confirm('작성 중인 글이 저장되지 않았을 수도 있습니다.')) {
        window.history.back()
      }
    },

    deleteTemporalBoard () {
      this.$axios.delete('http://localhost:8080/temporal-board/' + this.temporalBoardId)
        .then((response) => {
          console.log(response.data)
        }).catch((_error) => {
          console.log(_error)
        })
    },

    setBoardData (response) {
      this.categoryList = response.data.categoryList
      const board = response.data.boardResponse
      this.title = board.title
      this.tags = board.tags
      this.thumbnail = board.thumbnail
      this.categoryId = board.categoryId
      this.editor.setHTML(board.content)
    },

    getBoardEditViewInfo () {
      const headers = {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
      this.$axios({
        method: 'GET',
        url: this.url + '/edit',
        headers
      }).then((response) => {
        const temporalBoard = response.data.boardResponse
        if (temporalBoard !== null) {
          if (confirm(temporalBoard.createDate + '에 작성된 글이 있습니다. 이어서 작성하시겠습니까?')) {
            this.setBoardData(response)
            this.temporalBoardId = temporalBoard.id
          }
        }

        this.categoryList = response.data.categoryList
      }).catch((Error) => {
        alert('접근 권한이 없습니다.', Error)
        history.back()
      })
    },

    async getBoardDetailEditInfo () {
      this.$axios.get(this.url + '/edit/' + this.boardId, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((response) => {
        this.setBoardData(response)
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
    editor: null,
    isTemporalSave: false,
    // temporalSaveComment: this.isTemporalSave === true ? 'ON' : 'OFF',
    titleRules: [
      value => !!value || '제목을 입력해주세요.'
    ],
    categoryRule: [
      value => !!value || '카테고리를 선택해주세요.'
    ],
    tags: [],
    categoryList: null,
    temporalBoard: null,
    temporalBoardId: null,
    title: null,
    categoryId: null,
    thumbnail: null,
    url: 'http://localhost:8080/board',
    redirectUrl: 'http://localhost:8077',
    editorOptions: {
      initialEditType: 'markdown',
      previewStyle: 'vertical',
      height: '500px',
      hooks: {
        addImageBlobHook: (blob, callback) => {
          this.addImageBlobHook(blob, callback)
        }
      }
    },
    boardId: null,
    snackbar: false
  }),
  created () {
    const boardId = this.$route.params.id
    if (typeof boardId === 'undefined') {
      this.getBoardEditViewInfo()
    } else {
      this.boardId = boardId
      this.getBoardDetailEditInfo()
    }
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
