<template>
<div class="container-fluid p-0">
    <div class="d-flex justify-content-between pl-3 pr-3 pt-3">
        <div class="align-self-center">
            <v-logo />
        </div>        
        <div class="input-group mb-3 w-25 align-self-center border bd-radius-5">
            <input type="text" class="form-control bd-none" placeholder="Search">
            <div class="input-group-append bg-none">
                <span class="input-group-text material-icons bg-none bd-none">search</span>
            </div>
        </div> 
        <div class="text-right header-right align-self-center">
            <div class="lg-screen">
                <nuxt-link :to="item.href" class="btn" :class="item.class" v-for="(item, i) in links" :key="i">{{item.title}}</nuxt-link>
            </div>
        </div>
    </div>
    <div class="w-100 text-center mt-2 bd-bottom d-none">
        <nuxt-link :to="item.href" class="btn btn-hov mr-2" v-for="(item, i) in links2" :key="i">{{item.title}}</nuxt-link>
    </div>

</div>
</template>

<script>
import dropdown_list from './dropdown-list.vue'
import vue from 'vue'
import $ from 'jquery'
import JSON from '@/assets/json/website.json'
import v_logo from './v-logo.vue'
export default {
    components: {
        dropdown_list,
        "v-logo": v_logo
    },
    data() {
        return {
            visible: true,
            links2: [
                { title: "HOME", href: "./member/home"},
                { title: "MYHEALTH", href: "./member/home"},
                { title: "CONDITIONS", href: "./member/home"},
                { title: "TREATMENTS", href: "./member/home"},
                { title: "SYMPTOMS", href: "./member/home"},
            ],
            links: [
                { title: "Sign In", class: "text-dark border text pl-3 pr-3 bd-radius-0 mr-4", href: "./login"},
                { title: "Join Now!", class: "btn-primary box-shadow bd-radius-0 mr-4", href: "./join"},
            ],
            keys: ["BISS_KEYS", "POWERVU", "SATELLITE_KEYS"],
            register: ["Login", "Create Account"],
            router_id: this.$route.params.id,
            year: ""
        }
    },
    methods: {
        dropdown(e, list) {
            let { html, instance } = this.component(dropdown_list, { e, list, width: 250 } )
            instance.$on('select', payload => {
                payload.value = payload.value.toLowerCase()
                if(payload.value.split("_").length > 1) {
                    payload.value = payload.value.split("_").join("-")
                }
                let url = "/receiver-software/"+payload.value
                this.$router.push(url)
            })
            document.body.append(html)
        },
        change_url(e, item) {
            if(item.dropdown) {
                this.dropdown(e, item.list)
            }
            else {
                if(this.keys.includes(item.value)) {
                    item.value += "_"+this.year
                }
                if(item.value.split("_").length > 1) {
                    item.value = item.value.split("_").join("-").toLowerCase()
                } else {
                    item.value = item.value.toLowerCase()
                }
                let url = '/post/'+item.value
                item.value.includes("KEYS") ? url += "-" + this.date().year : ''
                this.$router.push(url)
            }
        },
        open_menu(e) {
            let category = ["Receiver Software", "Satellite keys", "Channel TP"],
                post = ["Biss 2020", "PowerVu 2020"]
            let { html, instance } = this.component(dropdown_list, { e, list: this.links, width: 250, back: false } )
            instance.$on('select', (payload) => {
                let url = '/post/'+payload.value
                url = url.toLowerCase()
                if(url.split("_").length > 1) {
                    url = url.split("_").join("-")
                }
                if(payload.dropdown) {
                    instance.back = true
                    instance.list = payload.list
                }
                else if(this.keys.includes(payload.value)) {
                    url += "-" + this.year
                    this.$router.push(url)
                }
                else {
                    let contains = JSON.basic_types[3].list.filter(function (el) {
                        return el.value == payload.value
                    })
                    if(contains.length > 0) {
                        payload.value = payload.value.toLowerCase()
                        if(payload.value.split("_").length > 0) {
                            url = "/receiver-software/"+payload.value.split("_").join("-")
                        } else {
                            url = "/receiver-software/"+payload.value
                        }
                    }   
                        this.$router.push(url)
                }
            })
            instance.$on('back', () => {
                instance.list = this.links
                instance.back = false
            })
            document.body.append(html)
        },
        signup_or_signin(e) {
            let { html, instance } = this.component(dropdown_list, { e, list: this.register, width:175 } )
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
    },
    mounted() {
        this.year = this.date().year
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