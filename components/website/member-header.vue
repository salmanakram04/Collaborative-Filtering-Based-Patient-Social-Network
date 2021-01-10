<template>
<div class="container p-0">

    <chat />
    <!-- <div style="bottom:5%;right:2.5%;width:80px;height:80px;border-radius:50%" class="bg-primary position-fixed shadow d-flex align-items-center justify-content-center">
    </div> -->
    <!-- The Modal -->
    <div class="modal fade" id="myModal">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body p-4">
            <h2 class="modal-title">{{ result.title }}</h2>
            <p class="w-100 small">{{result.symptoms}}</p>
            <div v-if="result.body" v-html="result.body">
            </div>
            <p v-else class="w-100 p-4 mt-5 text-center small bd-top">No Content Available for this symptom</p>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>

        </div>
    </div>
    </div>   
     
    <div class="w-100 text-right pt-4 pb-4">
        <button class="btn text-sm bd-radius-0 bd-right">
            <span class="d-flex align-items-center">
                <span class="material-icons mr-2 text-primary">face</span>
                <span class="text-dark font-weight-bold"> {{ account.type == 'doctor' ? 'Dr.' : ''}} {{account.username}}</span><br>
            </span>
        </button>
        <button @click="logout()" class="btn text-sm">Logout</button>
    </div>
    <div class="d-flex justify-content-between align-items-center pl-3 pr-3 pt-3">
        <div class="align-self-center">
            <v-logo />
        </div>        
        <div class="input-group mb-3 w-50 align-self-center border bd-radius-5">
            <input @keyup="search()" @blur="hideResult()" type="text" class="form-control bd-none" placeholder="Search" v-model="keywords">
            <div class="input-group-append bg-none">
                <span class="input-group-text material-icons bg-none bd-none">search</span>
            </div>
            <div v-if="keywords" class="position-relative w-100 animate__animated animate__fadeInUp animate__faster" style="z-index:100000">
                <div class="position-absolute overflow-auto w-100 bg-white shadow p-4 bd-radius-5 my-2" style="left:0px;top:0px;max-height:500px">
                    <div v-if="filterSearch.length > 0">
                        <button @click="result = item" data-toggle="modal" data-target="#myModal" class="bd-bottom bd-radius-0 hov my-0 py-2 btn btn-block text-left" v-for="(item, i) in filterSearch" :key="i">
                            <h6 v-html="highlight(item.title)"></h6>
                            <p class="small" v-html="highlight(item.symptoms)"></p>
                        </button>

                    </div>
                    <p v-else class="small text-center w-100">No Result Found!</p>
                </div>
            </div>
        </div> 
        <div class="text-right header-right align-self-center">
            <div class="lg-screen d-flex align-items-center">
                <button @click="change_tab(-1, 'CONVERSATION')" class="btn material-icons btn-hov dropdown-btn">mail_outline</button>
                <!-- Default dropleft button -->
                <div class="btn-group dropleft">
                    <button type="button" class="btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="material-icons">notifications_none</span>
                        <span v-if="notifications.length > 0" class="badge badge-danger position-absolute" style="top:0px;right:0px">{{ notifications.length }}</span>
                    </button>
                    <div v-if="notifications_type == 'messages'" class="dropdown-menu">
                        <a @click="change_tab(-1, 'CONVERSATION'), open_conversation(notificaiton, i)" v-for="(notificaiton, i) in notifications" :key="i" class="dropdown-item border-bottom py-3 text-sm" href="#"> 
                            <span>New message from <span class="font-weight-bold">{{ notificaiton.from.username }}</span></span> <br>
                        </a>
                    </div>
                    <div v-else class="dropdown-menu">
                        <a class="dropdown-item py-3 text-sm" href="#">No Notifcations</a>
                    </div>
                </div>                
            </div>
        </div>
    </div>
    <div class="w-100 text-center mt-2 bd-bottom" :class="tabs ? '' : 'd-none'">
        <button @click="change_tab(i, item.title)" class="btn btn-hov mr-2" :class="active == i ? 'font-weight-bold bd-bottom-blue' : ''" v-for="(item, i) in links" :key="i">{{item.title}}</button>
    </div>
</div>
</template>

<script>
import dropdown_list from './dropdown-list.vue'
import vue from 'vue'
import $ from 'jquery'
import JSON from '@/assets/json/website.json'
import v_logo from './v-logo.vue'
import { EventBus } from '@/globals/event-bus.js'
import Chat from '../member/chat'
export default {
    props: {
        tabs: {
            default: true
        }
    },
    components: {
        dropdown_list,
        "v-logo": v_logo,
        Chat
    },
    data() {
        return {
            notifications: [],
            notifications_type: null,
            result: {},
            keywords: null,
            active: 0,
            visible: true,
            search_results: [],
            filterSearch: [],
            links: [],
            fav_list: [
                { title: "MonthlyMe Check-in", class: "text-dark border text pl-3 pr-3 bd-radius-0 mr-4", href: "./login"},
                { title: "Doctor Visit Guide", class: "btn-primary box-shadow bd-radius-0 mr-4", href: "./join"},
                { title: "Treatment Check-in", class: "btn-primary box-shadow bd-radius-0 mr-4", href: "./join"},
            ],
            email_list: [
                { title: "<h5 class='text-dark font-weight-bold'>You do not have any new Messages</h5>", class: "text-dark border text pl-3 pr-3 bd-radius-0 mr-4", href: "./login"},
            ],
            notification_list: [
                { title: "No New notifications", class: "text-dark border text pl-3 pr-3 bd-radius-0 mr-4", href: "./login"},
            ],
            account: {}
        }
    },
    methods: {
        open_conversation(conversation, i) {
            EventBus.$emit('open_conversation', conversation)
            this.init()
            this.notifications.splice(i, 1)
        },
        hideResult() {
            setTimeout(() => {
                this.keywords = null
            
            }, 500);
        },
        highlight(str) {
            return str.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            let $this = this
            this.filterSearch = this.search_results.filter(function(el) {
                return el.title.includes($this.keywords)
            })
        },        
        logout() {
            this.setCookie("mywebsite.registration", {})
            this.$router.push("/")
        },
        change_tab(i, name) {
            this.active=i
            this.$emit("tab", name)
        },
        dropdown(e, list) {
            let { html, instance } = this.component(dropdown_list, { e, list, width: 250 } )
            document.body.append(html)
        },
        open_dropdown(e, list) {
            let { html, instance } = this.component(dropdown_list, { e, list, width: 250, back: false } )
            document.body.append(html)
        },
        component(component, props = null) {
            let ComponentClass = vue.extend(component)
            let instance = new ComponentClass({ propsData: props })
            instance.$mount()
            return {
                html: instance.$el,
                instance
            }
        },
        init() {

            if(this.getCookie("mywebsite.registration")) {
                this.user = this.getCookie("mywebsite.registration")
                this.firebase_get("conversations", (res) => {
                    if(res) {
                        
    
                        let messages = res.filter(el => {

                            if (el.from && el.to) {

                                return el.from.email == this.user.email || el.to.email == this.user.email
                            }
                        })

                        let unread = messages.filter(el => !el.read)

                        if (unread.length > 0) {

                            this.notifications_type = "messages"
                            this.notifications = unread
                        }

                    }
                })

            }


        }

    },
    mounted() {
        this.init()

        if(this.getCookie("mywebsite.registration")) {
            this.account = this.getCookie("mywebsite.registration")
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.account = res
                        if(this.account.type == "doctor") {
                           this.links = [
                                { title: "HOME"},
                                { title: "MY APPOINTMENTS"}
                            ]
                        }
                        else {
                           this.links = [
                                { title: "HOME"},
                                { title: "MYHEALTH"},
                                { title: "CONDITIONS"},
                                { title: "TREATMENTS"},
                                { title: "SYMPTOMS"},
                                { title: "APPOINTMENTS"},
                                { title: "MEDICINE"},
                            ]
                        }
                    })
                }                
        }
        
        EventBus.$on('appointment', (appointment) => {            
            this.change_tab(-1, 'CONVERSATION')
            this.$emit('makeAppointment', appointment)
        })

        this.firebase_get("conditions", (conditions) => {
            this.search_results = conditions

            this.firebase_get("treatments", (treatments) => {

                for(let i=0; i<treatments.length; i++) {
                    this.search_results.push(treatments[i])
                }
            })

        })


        EventBus.$on("notifications-of-messages", (payload) => {

            this.init()
            // let user = this.getCookie("mywebsite.registration")
            // console.log(payload, 'my-payload')
        })

    }

}
</script>

<style>
.blue-bd-bottom-lg {
    border-bottom: 0.25rem solid #007BFF;
}
@media only screen and (max-width: 1170px) {
  .header-right .lg-screen {
    display: none;
  }
  .header-right .menu {
      display: inline-block !important;
  }
}
</style>