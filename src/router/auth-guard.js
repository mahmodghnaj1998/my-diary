import store from "../store"
export default (to, from, next) => {

    if (store.getters.User) {
        return next()

    } else(
        next("/Signin")
    )
}