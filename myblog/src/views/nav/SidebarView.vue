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
    <v-row align-center>
      <v-col cols="10" align-self="start">
        <v-text-field
            outlined
            label="검색"
            append-icon="mdi-magnify"
            class="mt-5"
            v-model="searchKeyword"
            @keyup.enter="search"
          ></v-text-field>
      </v-col>
      <v-col cols="2" align-self="center">
        <v-menu offset-y>
          <template v-slot:activator="{on, attrs}">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon class="mr-7">mdi-cog</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item v-for="item,idx in items" :key="idx" link>
              <v-list-item v-text="item" @click="searchItem=searchCri[idx]"></v-list-item>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-divider />

    <v-container v-if="checkAuthorization()">
      <v-row justify="center" class="ml-2">
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

    <v-container>
      <span class="text-h6 font-weight-bold">"태그"</span>
      <br />
      <a v-for="tag, idx in tags" :key="idx"
        class="text-subtitle-2 font-weight-bold black--text"
        @click="searchByTag(tag)">
          #{{ tag }}
      </a>
    </v-container>
  </v-container>
</template>
<script>

export default {
  name: 'SidebarView',
  data: () => ({
    categories: null,
    tags: null,
    url: 'http://localhost:8080',
    searchKeyword: '',
    searchItem: 'title',
    items: ['제목', '태그'],
    searchCri: ['title', 'tag'],
    searchLink: '/board/search?&query=',
    tagLink: '/board/tag?page=1&tag='
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

    getTags () {
      this.$axios.get(this.url + '/tag')
        .then((response) => {
          this.tags = response.data
          console.log(this.tags)
        }).catch((_error) => {
          console.log('태그를 가져오는데 오류 발생')
        })
    },

    search () {
      if (this.searchKeyword === '') {
        alert('검색어를 입력해주세요')
      } else {
        const link = this.searchLink + this.searchKeyword + '&search=' + this.searchItem + '&page=1'
        this.searchKeyword = ''
        this.$router.push(link)
      }
    },

    searchByTag (tag) {
      const link = this.tagLink + tag
      this.$router.push(link)
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
    this.getTags()
  }
}
</script>
<style>

</style>
