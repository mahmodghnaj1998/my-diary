import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import Cookies from "js-cookie"
Vue.use(Vuex);
const url = 'https://my-diary-nice.herokuapp.com'
export default new Vuex.Store({
    state: {
        loadedMeetups: [{
            urlimage: "https://image.freepik.com/free-vector/group-young-people-posing-photo_52683-18824.jpg",
            title: "Save nice Diary",
            id: "Diary",
            data: 'Save Date and Time',
            loction: "Save location",
            description: "Save Description",
        }, {
            urlimage: "https://cdn1.careeraddict.com/uploads/article/58721/illustration-group-people-team-meeting.jpg",
            title: "Save nice Diary",
            id: "Diary",
            data: 'Save Date and Time',
            loction: "Save location",
            description: "Save Description",
        }],

        token: Cookies.get('token'),
        infoUser: null,
        islogin: null,
        error: null
    },
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetA, meetB) => {
                return meetA.data > meetB.data
            })
        },
        feachMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup(state) {
            return (id) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id == id
                })
            }

        },
        User(state) {
            return state.infoUser
        },
        error(state) {
            return state.error
        },
        islogin(state) {
            return state.islogin
        }

    },
    mutations: {
        setmeetups(state, paylod) {
            state.loadedMeetups = paylod
        },
        CreateMeetup(state, paylod) {
            state.loadedMeetups.push(paylod)
        },
        update(state, payload) {
            const meet = state.loadedMeetups.find(meet => {
                return meet.id == payload.id
            })
            if (payload.title) {
                meet.title = payload.title
            }
            if (payload.description) {
                meet.description = payload.description
            }
            if (payload.data) {
                meet.data = payload.data
            }
        },
        SaveToken(state, token) {
            state.token = token
            state.token = Cookies.set("token", token)
        },
        User_Info(state, payload) {
            state.infoUser = payload
        },
        setislogin(state, paylod) {
            state.islogin = paylod
        },
        seterror(state, paylod) {
            state.error = paylod
        },
        clear_error(state) {
            state.error = null
        },
        setuser(state, paylod) {
            state.infoUser = paylod
        }
    },
    actions: {
        loadedMeetup({ commit, getters }) {
            commit("setislogin", true)
            axios.get(`${url}/api/loademeetup/${getters.User.id}`).then((data) => {
                const meetups = []
                const obj = data.data
                if (obj.length === 0) {
                    commit("setislogin", false)
                    commit("setmeetups", [{
                        urlimage: "https://image.freepik.com/free-vector/group-young-people-posing-photo_52683-18824.jpg",
                        title: "Save nice Diary",
                        id: "Diary",
                        data: 'Save Date and Time',
                        loction: "Save location",
                        description: "Save Description",
                    }, {
                        urlimage: "https://cdn1.careeraddict.com/uploads/article/58721/illustration-group-people-team-meeting.jpg",
                        title: "Save nice Diary",
                        id: "Diary",
                        data: 'Save Date and Time',
                        loction: "Save location",
                        description: "Save Description",
                    }])
                }

                obj.forEach(element => {
                    let info = element.infoimage.search(",")
                    let width = element.infoimage.substr(0, info)
                    let height = element.infoimage.substr(info + 1)
                    meetups.push({
                        id: element.id,
                        title: element.title,
                        // urlimage: url + "/storage/" + element.urlimage, // if is stroge image in file back end
                        urlimage: element.urlimage, //if is stroge image hosting
                        description: element.description,
                        data: element.data,
                        loction: element.loction,
                        createorid: element.createorid,
                        width: width,
                        height: height
                    })
                    commit("setmeetups", meetups)
                    commit("setislogin", false)
                });
            })
        },
        CreateMeetup({ commit, getters }, paylod) {
            let formData = new FormData();
            // formData.append('file', paylod.image); //if strong in files back end
            formData.append('image', paylod.image); // if strong in hosting image
            const meetup = {
                title: paylod.title,
                data: paylod.data,
                description: paylod.description,
                loction: paylod.loction,
                createorid: getters.User.id,
                infoimage: paylod.infoimage
            }
            axios.post(`${url}/api/createMeetups`, meetup).then((data) => {
                commit("setislogin", true)
                const id = data.data.id
                return id
            }).then((id) => {
                ////////////////////////////////////////////////
                //if strong in files back end
                // axios.post(`${url}/api/addimage/${id}`, formData, {
                //     headers: {
                //         'Content-Type': 'multipart/form-data'
                //     }
                // })
                ////////////////////////////////////////////////
                // if strong in hosting image
                axios.post(`https://api.imgbb.com/1/upload?key=c2e975711545bc79b2ab2ef56386af60`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then((data) => {
                        /////////////////////////////////////////////////////
                        //if strong in files back end
                        // const id = data.data.id  
                        // const path = data.data.path
                        // commit("CreateMeetup", {
                        //     ...meetup,
                        //     urlimage: url + "/storage/" + path,
                        //     id: id
                        // })

                        /////////////////////////////////////////////////////
                        // if strong in hosting image
                        axios.post(`${url}/api/addimage/${id}`, {
                                path: data.data.data.display_url
                            }).then(() => {
                                commit("setislogin", false)
                                commit("CreateMeetup", {
                                    ...meetup,
                                    urlimage: data.data.data.display_url,
                                    id: id
                                })
                            })
                            /////////////////////////////////////////////////////////
                    })
            })


        },
        updateMeetup({ commit }, paylod) {
            commit("setislogin", true)
            const objupdate = {}
            if (paylod.title) {
                objupdate.title = paylod.title
            }
            if (paylod.description) {
                objupdate.description = paylod.description
            }
            if (paylod.data) {
                objupdate.data = paylod.data
            }
            axios.post(`${url}/api/update/${paylod.id}`, objupdate).then(() => {
                commit("setislogin", false)
                commit("update", paylod)
            })

        },
        SiginUp({ commit }, paylod) {
            commit("setislogin", true)
            commit("clear_error")
            axios
                .post(`${url}/api/register`, {
                    name: paylod.name,
                    email: paylod.email,
                    password: paylod.password,
                    password_confirmation: paylod.confirm,
                })
                .then((re) => {
                    commit("setislogin", false)
                    if (re.status !== 201) {
                        const token = re.data.access_token
                        commit("SaveToken", token)
                        axios.post(`${url}/api/user`, {
                            token: Cookies.get("token")
                        }).then((re) => {
                            commit("User_Info", re.data)
                        })

                    } else {
                        if (re.data.error.email) {
                            commit("seterror", "The email has already been taken.")
                        }

                    }
                });


        },
        SiginIn({ commit }, paylod) {
            commit("setislogin", true)
            commit("clear_error")
            axios.post(`${url}/api/login`, {
                email: paylod.email,
                password: paylod.password
            }).then((re) => {
                commit("setislogin", false)
                if (re.status == 200) {
                    const token = re.data.access_token
                    commit("SaveToken", token)
                    axios.post(`${url}/api/user`, {
                        token: Cookies.get("token")
                    }).then((re) => {
                        commit("User_Info", re.data)
                    })

                } else if (re.status == 201) {
                    commit("seterror", "The Email Not Found or passwoed Error ")
                }


            })
        },
        is_token_existing({ commit }) {
            if (Cookies.get("token")) {
                axios.post(`${url}/api/user`, {
                    token: Cookies.get("token")
                }).then((re) => {
                    if (re.status == 200) {
                        commit("User_Info", re.data)
                    }
                }).catch(() => {
                    commit("setuser", null)
                    Cookies.remove('token')
                })
            }
        },
        logout({ commit }) {
            commit("setuser", null)
            Cookies.remove('token')
            commit("setmeetups", [{
                urlimage: "https://image.freepik.com/free-vector/group-young-people-posing-photo_52683-18824.jpg",
                title: "Save nice Diary",
                id: "Diary",
                data: 'Save Date and Time',
                loction: "Save location",
                description: "Save Description",
            }, {
                urlimage: "https://cdn1.careeraddict.com/uploads/article/58721/illustration-group-people-team-meeting.jpg",
                title: "Save nice Diary",
                id: "Diary",
                data: 'Save Date and Time',
                loction: "Save location",
                description: "Save Description",
            }])

        }

    },
    modules: {}
});