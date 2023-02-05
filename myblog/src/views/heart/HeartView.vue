<template>
   <span>
    <span class="white--text"> .좋아요</span>
      <v-btn
        icon
        v-bind:color="color"
         @click="pressHeart()"
      >
      <v-icon>mdi-heart</v-icon>
      </v-btn>
    </span>
</template>
<script>
export default {
  data () {
    return {
      color: 'gray',
      url: 'http://localhost:8080/heart/',
      isUserPressHeart: null
    }
  },
  methods: {
    pressHeart () {
      const isPressHeart = this.checkLogin()
      if (isPressHeart) {
        if (this.color === 'gray') {
          this.addHeart()
        } else {
          this.removeHeart()
        }
      } else {
        alert('로그인을 하시면 좋아요를 누를 수 있습니다!!')
      }
    },

    async addHeart () {
      await this.$axios.post(this.url + this.$route.params.id, null, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((response) => {
        if (response.data === 'success') {
          this.color = 'pink'
        } else {
          alert('좋아요 오류 발생')
        }
      })
    },

    async removeHeart () {
      await this.$axios.delete(this.url + this.$route.params.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((response) => {
        if (response.data === 'success') {
          this.color = 'gray'
        } else {
          alert('좋아요 오류 발생')
        }
      })
    },

    checkLogin () {
      const token = localStorage.getItem('token')
      if (token) {
        return true
      } else {
        return false
      }
    },

    getHeartInfo () {
      this.$axios.get(this.url + this.$route.params.id, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((response) => {
        this.isUserPressHeart = response.data.heartBoard
        if (this.isUserPressHeart) {
          this.color = 'pink'
        } else {
          this.color = 'gray'
        }
      }).catch((_error) => {
        console.log(_error)
      })
    }
  },
  created () {
    if (this.checkLogin()) {
      this.getHeartInfo()
    }
  }
}
</script>
<style lang="">

</style>
