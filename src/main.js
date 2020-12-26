import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Alert from './components/shared/alert'
import edit from './components/Meet/Edit/editmeet'
import editdate from './components/Meet/Edit/editdate'
import edittime from './components/Meet/Edit/edittime'

Vue.config.productionTip = false;
Vue.component("app-alert", Alert)
Vue.component("edit", edit)
Vue.component("edit-date", editdate)
Vue.component("edit-time", edittime)



new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    mounted() {
        
        this.$store.dispatch('is_token_existing')
    },
    computed: {
        user() {
      return this.$store.getters.User;
    }
    },
    watch:{
        user(value){
            if (value !== null && value !== undefined) {
            this.$store.dispatch('loadedMeetup');
        }
    }
    }
}).$mount("#app");