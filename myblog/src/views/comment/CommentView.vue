<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="9">
        <v-textarea label="댓글을 입력해주세요" auto-grow outlined rows="2" row-height="20" shaped>
        </v-textarea>
        <v-row justify="end">
          <v-btn
          color="primary"
          elevation="7"
          >등록</v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card>
      댓글리스트
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {

}
</script>
<style>

</style>
