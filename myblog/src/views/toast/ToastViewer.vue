<template>
  <div>
    <Viewer ref="toastViewer" height="500px" />
  </div>
</template>
<script>
import { Viewer } from '@toast-ui/vue-editor'
export default {
  components: {
    Viewer
  },
  methods: {
    setContent (content) {
      this.$refs.toastViewer.invoke('setMarkdown', content)
    }
  }
}
</script>
<style lang="">

</style>
