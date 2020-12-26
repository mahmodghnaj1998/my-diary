<template>
  <div>
    <v-container>
      <v-row warp>
        <v-col cols="12" sm="6" xs="12" class="text-center text-sm-right">
          <v-btn class="info" large to="Meet">shOW MY DIARY</v-btn>
        </v-col>
        <v-col cols="12" sm="6" xs="12" class="text-center text-sm-left">
          <v-btn class="info mb-2" large to="/meet/new">CREATE DIARY</v-btn>
        </v-col>
      <v-col cols="12" xs="12" class="text-center">
        <p class="font-weight-bold">Save the most beautiful memories.</p>
      </v-col>
        <v-col cols="12" class="text-center" offset-xs="5">
         <v-progress-circular
         v-if="islogin"
            :size="100"
            :width="7"
            color="red"
            indeterminate
          ></v-progress-circular>
        </v-col>
        <v-col cols="12" xs="12" v-if="!islogin">
          <v-carousel style="cursor: pointer" cycle>
            <v-carousel-item
              contain
              v-for="(item, i) in items"
              :key="i"
              :src="item.urlimage"
              reverse-transition="fade-transition"
              transition="fade-transition"
              @click="onloadMeetup(item.id)"
            >
              <div class="title">
                {{ item.name }}
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  computed: {
    items() {
      return this.$store.getters.feachMeetups;
    },
    islogin() {
      return this.$store.getters.islogin;
    },
  },
  methods: {
    onloadMeetup(id) {
      this.$router.push("/meet/" + id);
    },
  },
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 2em;
}
.v-progress-circular {
   margin: 1rem;
}
</style>