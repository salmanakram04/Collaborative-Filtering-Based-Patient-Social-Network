<template>
<div class="container mt-5">
    <div class="w-50 m-auto text-center">

        <div class="w-100 text-left mt-4">
            <p class="mb-0 font-weight-bold">Email</p>
            <div class="input-group mb-3">
                <input type="email" class="form-control" required v-model="email">
            </div>        
        </div>

        <div class="w-100 text-left mt-4">
            <p class="mb-0 font-weight-bold">Password <nuxt-link to="/" class="font-weight-normal">Forgot Password?</nuxt-link> </p>
            <div class="input-group mb-3 border">
                <input :type="password_visible ? 'text' : 'password'" class="form-control bd-none bd-radius-5" required v-model="password">
                <div class="input-group-append">
                    <span class="input-group-text material-icons btn bg-none bd-none btn" :class="password_visible ? 'text-primary' : ''" @click="password_visible = !password_visible">visibility</span>
                </div>
            </div>        
        </div>
        
        <div class="custom-control custom-checkbox text-left mt-4">
            <input v-model="terms" type="checkbox" class="custom-control-input" id="customCheck" name="example1">
            <label class="custom-control-label" for="customCheck">Remember me in this computer</label>
        </div>

        <div class="p-2">
            <button @click="create()" class="btn btn-primary box-shadow bd-radius-0 mt-4 btn-block pt-3 pb-3">Sign in</button>
            <nuxt-link to="/join" class="btn text-primary font-weight-bold mt-2 btn-block pt-3 pb-3">Create new Account</nuxt-link>
        </div>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            password_visible: null,
            email: null,
            password: null,
            terms: false
        }
    },
    methods: {
        create() {
            if(!this.email) {
                this.alertmsg("Please Enter you email", "danger")
                return
            }            
            if(!this.password) {
                this.alertmsg("Please Enter the password", "danger")
                return
            }
            this.signin_with_email_password(this.email, this.password, (res, success) => {
                if(success) {
                    this.alertmsg("Signin Successfully", "success")
                    let uid = res.user.uid
                    this.firebase_get_one("users/"+ uid, (res) => {
                        this.setCookie("mywebsite.registration", {...res, uid}, 14)
                        this.$router.push("/member/home")
                        // console.log(this.getCookie("mywebsite.registration"), 'my response')
                    })
                }
                else {
                    this.alertmsg(res, "danger")
                }
            })
        },
    }

}
</script>

<style>

</style>