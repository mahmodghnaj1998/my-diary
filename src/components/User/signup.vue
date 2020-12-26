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
              <form @submit.prevent="SiginUp()">
                <v-layout row>
                  <v-col coles="12" xs="12">
                    <v-text-field
                      id="name"
                      name="name"
                      color="red"
                      label="Name"
                      required
                      v-model="name"
                    ></v-text-field>
                  </v-col>
                </v-layout>
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
                      :rules="[rules.required, rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password"
                      hint="At least 8 characters"
                      counter
                      @click:append="show1 = !show1"
                    ></v-text-field>
                  </v-col>
                </v-layout>
                <v-layout row>
                  <v-col coles="12" xs="12">
                    <v-text-field
                      v-model="confirm"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.required, rules.min, ConfirmPassword]"
                      :type="show1 ? 'text' : 'password'"
                      name="input-10-1"
                      label="Password Confirm"
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
                  >Sigin Up</v-btn
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
    confirm: "",
    show1: false,
    rules: {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 8 || "Min 8 characters",
      emailMatch: () => `The email and password you entered don't match`,
    },
  }),
  computed: {
    validate() {
      return (
        this.name !== "" &&
        this.email !== "" &&
        this.password !== "" &&
        this.confirm !== "" &&
        this.ConfirmPassword !== "Password do not metch"
      );
    },
    ConfirmPassword() {
      return this.password == this.confirm || "Password do not metch";
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
        this.$router.push("/");
      }
    },
  },
  methods: {
    SiginUp() {
      const infouser = {
        name: this.name,
        email: this.email,
        password: this.password,
        confirm: this.confirm,
      };
      this.$store.dispatch("SiginUp", infouser);
    },
  },
  mounted(){
    this.$store.commit("clear_error")
  }
};
</script>
