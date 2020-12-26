<template>
  <v-dialog v-model="dialog" max-width="290" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-4" color="error" large dark v-bind="attrs" v-on="on">
        Edit Date <v-icon>mdi-alarm-panel</v-icon>
      </v-btn>
    </template>
    <v-date-picker width="100%" color="red" v-model="picker"></v-date-picker>
    <v-btn class="red--text blue lighten-5 mb-2" @click="onsavechange()"
      >Save</v-btn
    >
    <v-btn class="red--text blue lighten-5" @click="dialog = false"
      >Close</v-btn
    >
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      picker: new Date().toISOString().substr(0, 10),
    };
  },
  props: ["meetup"],
  methods: {
    onsavechange() {
      if (this.picker === null) {
        return;
      }
      let date = this.meetup.data;
      let search = date.search(" ");
      // let olddate = date.substr(0,search)
      let oldtime = date.substr(search + 1);
      let newtime = this.picker + " " + oldtime;

      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        data: newtime,
      });
      return (this.dialog = false);
    },
  },
};
</script>