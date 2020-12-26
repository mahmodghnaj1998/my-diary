<template>
  <v-dialog v-model="dialog" width="500" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-2" fab dark large color="cyan" v-bind="attrs" v-on="on">
        <v-icon dark> mdi-pencil </v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-container grid-list-xs>
        <v-layout row wrap>
          <v-col cols="12" xs="12">
            <v-card-title> Edit MeetUp </v-card-title>
          </v-col>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-col cols="12" xs="12">
            <v-card-text>
              <v-text-field
              id="title"
              name="title"
              color="red"
              label="Title*"
              required
              v-model="edittitle"
            ></v-text-field>
            <v-textarea
              id="description"
              name="description"
              color="red"
              label="Description*"
              required
              v-model="editdes"
            ></v-textarea>
            </v-card-text>
          </v-col>
        </v-layout>
          <v-layout row wrap>
          <v-col cols="12" xs="12">
        <edit-date :meetup="meetup"></edit-date>
        <edit-time :meetup="meetup"></edit-time>
        </v-col>
        </v-layout>
        <v-divider></v-divider>
          <v-layout row wrap>
          <v-col cols="12" xs="12">
            <v-card-actions>
             <v-btn   class="blue--text blue lighten-5" @click="dialog=false">close</v-btn>
             <v-btn   class="blue--text blue lighten-5" @click="onsavechand()">save</v-btn>
            </v-card-actions>
          </v-col>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      edittitle:this.meetup.title,
      editdes:this.meetup.description
    };
  },
  props:["meetup"],
  methods:{
    onsavechand(){
      if(this.edittitle.trim() === "" || this.editdes.trim() === ""){
        return 
      }
      this.$store.dispatch("updateMeetup",{
        id:this.meetup.id,
        title:this.edittitle,
        description:this.editdes
      })
      return this.dialog = false
    }
  }


};
</script>

<style>
</style>