<template>
  <v-dialog v-model="dialog" max-width="290" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mb-2" color="error" large dark v-bind="attrs" v-on="on">
        Edit Time <v-icon>mdi-alarm</v-icon>
      </v-btn>
    </template>
    <v-time-picker
      ampm-in-title
      format="ampm"
      width="100%"
      color="red"
      v-model="picker"
    ></v-time-picker>
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
      picker: null,
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
      let olddate = date.substr(0, search);
      //let oldtime = date.substr(search + 1)
      let newtime = olddate + " " + this.picker;

      this.$store.dispatch("updateMeetup", {
        id: this.meetup.id,
        data: newtime,
      });
      return (this.dialog = false);
    },
  },
};
</script>