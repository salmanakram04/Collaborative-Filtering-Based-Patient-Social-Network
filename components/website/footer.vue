<template>
<div class="container-fluid bg-light p-3 bd-top bd-bottom mt-5">
    <div class="container">
        <div class="d-flex align-items-center">
            <v-logo />
            <p class="small ml-4 w-50">
                {{description}} 
            </p>
        </div>
    
        <div class="w-100 mt-4 mb-4 bd-top pt-4">
            <nuxt-link :to="'/'+link.href" class="btn text-primary btn-hov" v-for="(link, i) in links" :key="'C'+i">{{link.title}}</nuxt-link>
        </div>
        <p class="small ml-2">Copyright &copy; {{year}} <nuxt-link to="/">CFBPSN</nuxt-link>. All Rights Reserved.</p>
    </div>
</div>
</template>

<script>
import v_logo from './v-logo.vue'
import JSON from '@/assets/json/website.json'
export default {
    components: {
        "v-logo": v_logo
    },
    data() {
        return {
            year: null,
            links: [
                { title: "About us", href: "about-us"},
                { title: "Contact us", href: "contact-us"},
                { title: "Terms and Conditions", href: "terms-and-conditions"},
                { title: "Privacy Policy", href: "privacy-policy"},
            ],
            description: JSON.footer_description
        }
    },
    mounted() {
        this.year = new Date().getFullYear()
    }

}
</script>

<style>

</style>