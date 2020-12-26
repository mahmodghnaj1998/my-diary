<template>
  <v-container>
  <v-layout row wrap  v-for="(item, i) in items" :key="i" class="mb-2">
      <v-col xs='12'> 
        <v-card
        elevation="24"
         class="mx-auto"
        max-width="400"
         >
    <v-img
      contain
      class="white--text align-end"
      height="400px"
      :src="item.urlimage"
    >
    </v-img>
    <v-card-title>My DIARY</v-card-title>
    <v-card-subtitle class="pb-0">
      {{item.data}}
    </v-card-subtitle>
    <v-card-actions>
      <v-btn
        primary
        large
        :to="'/meet/' + item.id"
      >
        <v-icon class="mr-2">mdi-arrow-right</v-icon>View DIARY
      </v-btn>
    </v-card-actions>
  </v-card>
      </v-col>
  </v-layout>
      
  </v-container>
</template>
<script>
export default {
  computed:{
        items(){
      return this.$store.getters.loadedMeetups
    }
  }
}
</script>