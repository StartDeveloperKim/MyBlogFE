<template>
  <div class="text-center">
    <v-progress-circular
      indeterminate
      color="primary"
      size="32"
    ></v-progress-circular>
    <p class="text-h4">로딩 중...</p>
  </div>
</template>
<script>
export default {
  methods: {
    getUrlParameter (name) {
      const search = window.location.search
      const params = new URLSearchParams(search)
      return params.get(name)
    },
    checkToken () {
      const token = this.getUrlParameter('token')
      if (token) {
        // this.$store.commit('setToken', token)
        localStorage.setItem('token', token)
        window.location.href = '/'
      } else {
        alert('인증에 실패했습니다.')
        window.location.href = '/'
      }
    }
  },
  created () {
    console.log('SocialLogin')
    this.checkToken()
  }
}
</script>
<style>

</style>
