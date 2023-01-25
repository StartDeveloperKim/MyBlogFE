<template>
  <v-container>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold text-h6 py-3">
          Steady Blog
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider/>

    <router-link :to="searchLink">
    </router-link>
    <v-text-field
            outlined
            label="검색"
            append-icon="mdi-map-marker"
            class="mt-5"
            v-model="searchKeyword"
            @keyup.enter="search"
          ></v-text-field>
    <v-divider />

    <v-container v-if="checkAuthorization()">
      <v-row justify="center">
        <v-col align-self="center" cols="10">
          <router-link to="/category">
            <v-icon>mdi-pencil</v-icon>
            <span class="font-weight-bold" style="color: black">카테고리 수정</span>
          </router-link>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />

    <v-list>
      <v-list-group
        v-for="category in categories"
        :key="category.name"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <router-link :to="'/board/'+ category.name +'/1/1'" class="black--text">
              <v-list-item-title class="text-h6 font-weight-bold">{{ category.name }}({{ category.categoryNum }})</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in category.childCategory"
          :key="child.name"
        >
          <v-list-item-content>
            <router-link :to="'/board/' + category.name + '/' + child.name + '/1/2'" class="black--text">
              <v-list-item-title class="font-weight-bold">{{ child.name }}({{ child.categoryNum }})</v-list-item-title>
            </router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-divider/>
  </v-container>
</template>
<script>

export default {
  name: 'SidebarView',
  data: () => ({
    categories: null,
    url: 'http://localhost:8080',
    searchKeyword: '',
    searchLink: '/board/search?page=1&query='
  }),
  methods: {
    getCategories: function () {
      this.$axios({
        method: 'GET',
        url: this.url + '/category'
      }).then((response) => {
        this.categories = response.data
      })
    },
    search () {
      if (this.searchKeyword === '') {
        alert('검색어를 입력해주세요')
      } else {
        const link = this.searchLink + this.searchKeyword
        this.searchKeyword = ''
        this.$router.push(link)
      }
    },

    checkAuthorization () {
      const token = localStorage.getItem('token')
      const role = localStorage.getItem('role')
      if (token && role === 'ROLE_ADMIN') {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.getCategories()
  }
}
</script>
<style>

</style>
