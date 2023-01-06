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
            class="pt-4"
          ></v-text-field>
    <v-divider/>

    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
        >
          <v-list-item-content>
            <v-list-item-title v-text="child.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>
<script>
export default {
  name: 'SidebarView',
  data: () => ({
    items: [
      {
        action: 'mdi-ticket',
        items: [{ title: 'List Item' }],
        title: 'Attractions'
      },
      {
        action: 'mdi-silverware-fork-knife',
        active: true,
        items: [
          { title: 'Breakfast & brunch' },
          { title: 'New American' },
          { title: 'Sushi' }
        ],
        title: 'Dining'
      },
      {
        action: 'mdi-school',
        items: [{ title: 'List Item' }],
        title: 'Education'
      },
      {
        action: 'mdi-human-male-female-child',
        items: [{ title: 'List Item' }],
        title: 'Family'
      },
      {
        action: 'mdi-bottle-tonic-plus',
        items: [{ title: 'List Item' }],
        title: 'Health'
      },
      {
        action: 'mdi-briefcase',
        items: [{ title: 'List Item' }],
        title: 'Office'
      },
      {
        action: 'mdi-tag',
        items: [{ title: 'List Item' }],
        title: 'Promotions'
      }
    ]
  })
}
</script>
<style lang="">

</style>
