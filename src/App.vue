<template>
  <v-app>
    <main>
      <!-- conect list -->
      
      <v-navigation-drawer v-model="drawer" class="red" absolute  temporary>
        <v-list >
          <v-list-item-group
            v-model="group"
            
          >
            <v-list-item
              v-for="icon in icons"
              :key="icon.title"
              :to="icon.link"
            >
             <v-list-item-icon>
              <v-icon>{{ icon.icon }}</v-icon>
              </v-list-item-icon>
               <v-list-item-content>
               <v-list-item-title>{{ icon.title }}</v-list-item-title>
              </v-list-item-content>
                </v-list-item>
            <v-list-item
            v-if="islogin"
            >
                <v-list-item-icon>
               <v-icon>mdi-account-arrow-left</v-icon>
               </v-list-item-icon>
               <v-list-item-content text @click="onlogout()" dark>
                  Logout
                 </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <!---->
      <!-- nav bar -->
      <v-toolbar dark class="red darken-1">
        <!-- buton list -->
        <v-app-bar-nav-icon
          class="d-md-none .d-md-flex"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <!---->
        <!-- title navbar -->
        <v-toolbar-title>
          <router-link
            @click="claer_erorr()"
            tag="span"
            to="/"
            style="cursor: pointer"
            >My Diary</router-link
          >
        </v-toolbar-title>
        <!---->

        <!-- space -->
        <v-spacer></v-spacer>
        <!---->

        <!-- button -->
        <v-btn
          class="d-none d-md-flex"
          text
          v-for="icon in icons"
          :key="icon.title"
          router
          :to="icon.link"
        >
          <v-icon left> {{ icon.icon }}</v-icon>
          {{ icon.title }}
        </v-btn>
          <v-btn
          class="d-none d-md-flex"
          text
          v-if="islogin"
          @click="onlogout()"
        >
          <v-icon left>mdi-account-arrow-left</v-icon>
          Logout
        </v-btn>
      </v-toolbar>
    </main>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  computed: {
    icons() {
      let items = [
        { icon: "mdi-lock-open", title: "SIGN UP", link: "/Signup" },
        { icon: "mdi-lock-question", title: "SIGN IN", link: "/Signin" },
      ];
      if (this.islogin) {
        items = [
          {
            icon: "mdi-account-multiple-outline",
            title: " VIEW DIARY",
            link: "/Meet",
          },
          {
            icon: "mdi-map-marker",
            title: "Create Meetup",
            link: "/meet/new",
          },
          { icon: "mdi-account-circle", title: "  Profile", link: "/Profile" },
        ];
      }
      return items;
    },
    islogin() {
      return (
        this.$store.getters.User !== null &&
        this.$store.getters.User !== undefined
      );
    },
  },
  methods: {
    onlogout(){
      this.$store.dispatch("logout")
    }
  },

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>
