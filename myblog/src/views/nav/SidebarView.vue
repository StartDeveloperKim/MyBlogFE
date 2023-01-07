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

    <v-text-field
            outlined
            label="검색"
            append-icon="mdi-map-marker"
            class="mt-5"
          ></v-text-field>
    <v-list>
      <v-list-group
        v-for="category in categories"
        :key="category.name"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title class="text-h6 font-weight-bold">{{ category.name }}({{ category.categoryNum }})</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in category.childCategory"
          :key="child.name"
        >
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold">{{ child.name }}({{ child.categoryNum }})</v-list-item-title>
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
    categories: null
  }),
  methods: {
    getCategories: function () {
      this.$axios({
        method: 'GET',
        url: 'http://localhost:3805/category'
      }).then((response) => {
        this.categories = response.data
        console.log(response.data)
      })
    }
  },
  created () {
    this.getCategories()
  }
}
</script>
<style lang="">

</style>
