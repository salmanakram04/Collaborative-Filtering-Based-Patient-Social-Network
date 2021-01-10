<template>
<div>
    <a :href="url"  class="btn btn-hov btn-lg ls-2">
        <h1 class="font-weight-normal text-primary">CFBPSN</h1> 
    </a>
</div>
</template>

<script>
export default {
    data() {
        return {
            url: '/'
        }
    },
    mounted() {
        let logged = this.getCookie('mywebsite.registration')
        if(logged) {
            if(logged.email && logged.uid) {
                this.url = '/member/home'
            }
            else {
                this.url = '/'
            }
        }
    }
}
</script>

<style>
</style>