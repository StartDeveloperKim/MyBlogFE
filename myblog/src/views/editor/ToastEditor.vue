<template>
  <div id="editor" ref="toastEditor"/>
</template>
<script>
import { Editor } from '@toast-ui/editor'

export default {
  data () {
    return {
      editor: null,
      url: 'http://localhost:8080/board'
    }
  },
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
        const headers = {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
        this.$axios.post(this.url + '/toast', formData, headers)
          .then((response) => {
            const imageURL = response.data
            console.log(imageURL)
            setText(imageURL, 'image')
          })
      } catch (e) {
        alert('파일 업로드에 실패하였습니다.')
      }
    },
    contentUpdate (e) {
      this.$emit('contentUpdate', this.content)
    }
  }
}
</script>
<style>

</style>
