<template>
  <div class="text-center">
    <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-container class="max-width">
          <v-pagination
              v-model="paging"
              :length="15"
              :total-visible="7"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      paging: 1
    }
  }
}
</script>
<style>

</style>
