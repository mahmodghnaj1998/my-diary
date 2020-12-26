<template>
  <v-container>
    <v-layout row wrap  v-if="loding">
      <v-col cols="12" class="text-center" offset-xs="5">
        <v-progress-circular
          :size="100"
          :width="7"
          color="red"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-layout>
    <v-layout row wrap v-else>
      <v-col xs="12">
        <v-card>
          <v-card-title class="red--text">
            My DIARY  {{ meetup.title }}
            <v-layout v-if="useriscreate">
              <v-spacer></v-spacer>
              <edit :meetup="meetup"></edit>
            </v-layout>
          </v-card-title>
          <v-layout row warp>
          <v-col cols="12" xs="12">
           <v-img
           contain
            class="white--text align-end"
            max-height="400px"
            :src="meetup.urlimage"
          >
          </v-img>
          </v-col>
          </v-layout>
          <v-card-text>
            <div class="info--text">{{ meetup.data }}-{{ meetup.loction }}</div>
            {{ meetup.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-layout>
  </v-container>
</template>
<script>
//import Jimp from 'jimp';
export default {
  data: () => ({
    bb: 1,
    dialog:false
  }),
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.loadedMeetup(this.id);
    },
    islogin() {
      return (
        this.$store.getters.User !== null &&
        this.$store.getters.User !== undefined
      );
    },
     loding() {
      return this.$store.getters.islogin;
    },
    useriscreate() {
      if (!this.islogin) {
        return false;
      }
      return this.$store.getters.User.id == this.meetup.createorid;
    },
    
  }
};
</script>