<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card elevation="6" outlined shaped tile class="mx-auto" >
          <v-card-title class="text-h4 font-weight-bold">
            카테고리 수정
          </v-card-title>
          <v-divider />

          <v-row justify="center">
            <v-col cols="6">
              <v-list-item-content>
                <v-textarea
                    solo
                    label="카테고리 입력해주세요"
                    rows="2"
                    shaped
                    v-model="name"
                  ></v-textarea>
              </v-list-item-content>
            </v-col>
            <v-col cols="2" align-self="center">
              <v-btn
                outlined
                color="indigo"
                @click="addCategory(null)"
              >추가</v-btn>
            </v-col>
          </v-row>

          <v-divider />

          <v-row justify="center">
              <v-col cols="8">
                <v-card-text>
                  <v-list>
                    <v-list-item v-for="category, idx in categories" :key="idx">
                      <v-list-item-content>
                        <v-list-item-title class="text-h5 font-weight-bold">
                          {{ category.name }}
                          <v-dialog v-model="dialog" width="600" persistent :retain-focus="false">
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on" @click="setParentId(category.id)">
                                <v-icon>mdi-plus</v-icon>
                              </v-btn>
                            </template>

                            <v-card>
                              <v-card-title class="text-h5 font-weight-bold">
                                카테고리 추가
                              </v-card-title>
                              <v-card-text>
                                <v-row align-center>
                                  <v-col cols="12">
                                    <v-textarea outlined label="카테고리 추가" rows="1" v-model="name"></v-textarea>
                                  </v-col>
                                </v-row>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn color="primary" @click="addCategory()">추가</v-btn>
                                <v-spacer />
                                <v-btn color="primart" text @click="setData()">
                                  Close
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                          <a v-if="category.categoryNum === 0 && category.childCategory.length === 0" @click="removeCategory(category.id)">
                            <v-icon>mdi-delete</v-icon>
                          </a>
                        </v-list-item-title>

                        <v-list-item-subtitle v-for="child, idx in category.childCategory" :key="idx" class="text-h6 ml-3">
                          <span>
                            - {{ child.name }}
                          <v-btn icon v-if="child.categoryNum === 0" @click="removeCategory(child.id)">
                            <v-icon>mdi-delete</v-icon>
                          </v-btn>
                          </span>
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-col>
            </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data: function () {
    return {
      categories: null,
      name: '',
      parentId: null,
      dialog: false,
      url: 'http://localhost:8080/category'
    }
  },
  methods: {
    getCategories: function () {
      this.$axios({
        method: 'GET',
        url: this.url
      }).then((response) => {
        this.categories = response.data
        console.log(this.categories)
      })
    },
    addCategory (parentId) {
      const requestData = {
        categoryName: this.name,
        parentCategoryId: this.parentId
      }
      this.$axios.post(this.url, requestData, {
        headers: {
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then((response) => {
          this.categories = response.data
          this.name = ''
          this.parentId = null
          this.dialog = false
        }).catch((_error) => {
          alert('카테고리를 추가하는데 오류가 발생했습니다.', _error)
        })
    },
    removeCategory (categoryId) {
      this.$axios.delete(this.url + '/' + categoryId)
        .then((response) => {
          this.categories = response.data
        }).catch((_error) => {
          alert('카테고리를 삭제하는데 오류가 발생했습니다.', _error)
        })
    },

    setParentId (id) {
      this.parentId = id
    },
    setData () {
      this.parentId = null
      this.dialog = false
    }
  },
  created () {
    this.getCategories()
  }
}
</script>
<style>

</style>
