<template>
  <div>
    <v-container>
      <v-layout row warp>
        <v-col coles="12" xs="12" sm="6" offset-sm="3">
          <app-alert
            v-if="error"
            @dismissible="ondismissible()"
            :text="error"
          ></app-alert>
          <v-card>
            <v-card-text>
              <form @submit.prevent="Siginin()">
                <v-layout row>
                  <v-col coles="12" xs="12">
                    <v-text-field
                      id="email"
                      name="email"
                      color="red"
                      label="Email"
                      required
                      v-model="email"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col coles="12" xs="12">
                    <v-text-field
                      v-model="password"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-btn
                  :loading="islogin"
                  type="submit"
                  class="red"
                  :disabled="!validate"
                  >Sigin In</v-btn
                >
              </form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
    },
  }),
  computed: {
    validate() {
      return this.email !== "" && this.password !== "";
    },
    user() {
      return this.$store.getters.User;
    },
    error() {
      return this.$store.getters.error;
    },
    islogin() {
      return this.$store.getters.islogin;
    },
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/")
      }
    },
  },
  methods: {
    Siginin() {
      const infouser = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch("SiginIn", infouser);
    },
    ondismissible() {
      this.$store.commit("clear_error");
    },
  },
   mounted(){
    this.$store.commit("clear_error")
  }
};
</script>
