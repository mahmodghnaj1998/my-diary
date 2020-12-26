<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-col coles="12" xs="12" sm="6" offset-sm="3" class="primary--text">
          <h1>Create a New DIARY</h1>
        </v-col>
      </v-layout>
      <v-layout row wrap>
        <v-col coles="12" xs="12" sm="6" offset-sm="3" class="primary--text">
          <form @submit.prevent>
            <v-text-field
              id="title"
              name="title"
              color="red"
              label="Title*"
              required
              v-model="title"
            ></v-text-field>
            <v-text-field
              id="loction"
              name="loction"
              color="red"
              label="Location*"
              required
              v-model="loction"
            ></v-text-field>
            <v-btn class="red"
            @click="onpickfile()"
              >Upload Image
              <v-icon right dark> mdi-cloud-upload </v-icon>
            </v-btn>
            <input type="file" style="display : none"  ref="fileInput" accept="image/*" @change="onfilepick"><br>
            <img class="mt-4" :src="imageUrl" height="200" />
            <v-textarea
              id="description"
              name="description"
              color="red"
              label="Description*"
              required
              v-model="description"
            ></v-textarea>
            <v-col coles="12" xs="12" sm="6" class="mb-2">
              <v-date-picker v-model="picker" color="red"></v-date-picker>
              {{ picker }}
            </v-col>
            <v-col coles="12" xs="12" sm="6">
              <v-time-picker
                v-model="picker1"
                :landscape="$vuetify.breakpoint.smAndUp"
                ampm-in-title
              ></v-time-picker>
              {{ picker1 }}
            </v-col>
                  <v-progress-linear
                  v-if="wait"
                   v-model="wait"
                    height="25"
                     >
                        <strong>{{ wait }}%</strong>
                      </v-progress-linear>
            <v-btn @click="onCreateMeet()" :disabled="!validet" class="red" :loading="islogin"
              >Create</v-btn
            >
          </form>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    title: "",
    imageUrl: "",
    description: "",
    loction: "",
    picker: new Date().toISOString().substr(0, 10), //12
    picker1: "",
    image:null,
    infoimage:{
          width:"",
          height:"",
          size:""
        }
  }),
  computed: {
    validet() {
      return (
        this.title !== "" &&
        this.loction !== "" &&
        this.imageUrl !== "" &&
        this.description !== "" &&
        this.picker1 !== ""
      );
    },
    islogin(){
      return this.$store.getters.islogin
    },
    wait(){
      return this.$store.getters.wait
    }
  },
 watch: {
    islogin(value) {
      if (value === false) {
        this.$router.push("/Meet")
      }
    },
  },
  methods: {
    onCreateMeet() {
      if (!this.validet) {
        return;
      }
      if(!this.image){
        return
      }
      const meetupData = {
        title: this.title,
        imageUrl: this.imageUrl,
        description: this.description,
        loction: this.loction,
        data: this.picker + " " + this.picker1,
        image:this.image,
        infoimage:this.infoimage.width+","+this.infoimage.height
      };
      this.$store.dispatch("CreateMeetup", meetupData);
     // this.$router.push("/Meet");
    },
    onpickfile(){
      this.$refs.fileInput.click()
    },
    onfilepick(event){
      const file = event.target.files
      if(!file[0] || file[0].type.indexOf('image/') !== 0) return;
      let filename = file[0].name
      if(filename.lastIndexOf(".") <= 0 ){
        return alert("plase enter image")
      }
      
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file[0])
      fileReader.addEventListener("load",()=>{
        this.imageUrl = fileReader.result
          let img = new Image();
          img.onload = () => {
          this.infoimage.width = img.width
          this.infoimage.height = img.height
          this.infoimage.size = img.size
        }
        img.src = fileReader.result
      })
      this.image = file[0]
      
    }
  },
};
</script>