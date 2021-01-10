<template>
<div class="container mt-5">
    <!-- The Modal -->
    <div class="modal fade" id="post-update-modal">
        <div class="modal-dialog box-shadow">
            <div class="modal-content">

            <!-- Modal Header -->
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <!-- Modal body -->
            <div class="modal-body">
                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Challan No.</p>
                    <p class="mb-1">Every Verified Doctor has a unique challan number which is 10 digits long, please enter your challan number to continue.</p>
                    <div class="input-group mb-3">
                        <input type="number" class="form-control" required v-model="challan_no" placeholder="e.g 1110314947">
                    </div>        
                </div>

            </div>

            <!-- Modal footer -->
            <div class="modal-footer">
                <button @click="challan_no.length == 10 ? create(verfied = true)  : null" type="button" class="btn btn-info px-4 shadow" data-dismiss="modal" :disabled="challan_no.length !== 10">Continue</button>
            </div>

            </div>
        </div>
    </div>     
    <div class="row">
        <div class="col-md-4 h-100 mt-5 p-0">
            <h1 class="font-gt-america mb-5">Join As</h1>
            <button @click="tab='doctor'" class="btn btn-block text-left transition p-3 bd-radius-5" :class="tab == 'doctor' ? 'text-lg font-weight-bold bd-left-blue bg-light-grey' : 'text-md'">Doctor</button>
            <button @click="tab='patient'" class="btn btn-block text-left transition p-3 bd-radius-5" :class="tab == 'patient' ? 'text-lg font-weight-bold bd-left-blue bg-light-grey' : 'text-md'">Patient</button>
        </div>
        <div class="col-md-8 p-4" v-if="tab=='patient'"  :class="tab=='patient' ? 'bg-light-grey' : ''">
            <div class="w-100 m-auto text-center">
                <h5>Already a member? <nuxt-link to="/login">Sign in</nuxt-link> </h5>

                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Email</p>
                    <p class="mb-1">Your email address will not be shared with anyone.</p>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" required v-model="email">
                    </div>        
                </div>

                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Password</p>
                    <div class="input-group mb-3 border">
                        <input :type="password_visible ? 'text' : 'password'" class="form-control bd-none bd-radius-5" required v-model="password">
                        <div class="input-group-append">
                            <span class="input-group-text material-icons btn bg-none bd-none btn" :class="password_visible ? 'text-primary' : ''"  @click="password_visible = !password_visible">visibility</span>
                        </div>
                    </div>        
                </div>

                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Username</p>
                    <p class="mb-1">This is visible to other CFBPSN members. You may want to use an anonymous name.</p>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" required v-model="username">
                    </div>        
                </div>

                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Condition(Optional)</p>
                    <p class="mb-1">Only visible to other PatientsLikeMe community members.</p>
                    <div class="input-group mb-3 border">
                        <input @keyup="search()" type="text" v-model="keywords" class="form-control bd-none bd-radius-5" required placeholder="Start typing to see suggestions">
                        <div class="input-group-append">
                            <span class="input-group-text material-icons btn bg-none bd-none">search</span>
                        </div>
                    </div>    
                    <div class="w-100" v-if="keywords">
                        <button @click="keywords=item.title" v-for="(item, i) in condition" :key="i" class="btn bd-bottom btn-block bd-radius-0 text-left btn-hov" v-html="highlight(item.title)"></button>
                    </div>    
                </div>
                
                <div class="custom-control custom-checkbox text-left mt-4">
                    <input v-model="terms" type="checkbox" class="custom-control-input" id="customCheck" name="example1">
                    <label class="custom-control-label" for="customCheck">I agree to the CFBPSN <nuxt-link to="./">Terms & Conditions of use</nuxt-link> and <nuxt-link to="./">privacy policy</nuxt-link></label>
                </div>

                <div class="p-2">
                    <button @click="create()" class="btn btn-primary box-shadow bd-radius-0 mt-4 btn-block pt-3 pb-3">Create Account</button>
                </div>

            </div>            
        </div>

        <div class="col-md-8 animate__animated  animate__fadeIn animate__faster p-4" v-else :class="tab=='doctor' ? 'bg-light-grey' : ''">
            <div class="w-100 m-auto text-center">
                <h5>Already a member? <nuxt-link to="/login">Sign in</nuxt-link> </h5>


                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Email</p>
                    <p class="mb-1">Your email address will not be shared with anyone.</p>
                    <div class="input-group mb-3">
                        <input type="email" class="form-control" required v-model="email">
                    </div>        
                </div>

                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Password</p>
                    <div class="input-group mb-3 border">
                        <input :type="password_visible ? 'text' : 'password'" class="form-control bd-none bd-radius-5" required v-model="password">
                        <div class="input-group-append">
                            <span class="input-group-text material-icons btn bg-none bd-none btn" :class="password_visible ? 'text-primary' : ''"  @click="password_visible = !password_visible">visibility</span>
                        </div>
                    </div>        
                </div>

                <div class="w-100 text-left mt-4">
                    <p class="mb-0 font-weight-bold">Username</p>
                    <p class="mb-1">This is visible to other CFBPSN members. You may want to use an anonymous name.</p>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" required v-model="username">
                    </div>        
                </div>
                <div class="w-100 text-left mt-2 d-flex w-100">
                    <div class="w-50">
                        <p class="mb-0 font-weight-bold">Specialization Field</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" required v-model="specialization_field">
                        </div>        
                    </div>
                    <div class="w-50 ml-2">
                        <p class="mb-0 font-weight-bold">Specialization Instituiton Name</p>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" required v-model="specialization_institute">
                        </div>        
                    </div>
                </div>

                <div class="w-100 text-left mt-2">
                    <p class="mb-0 font-weight-bold">Institution name graduation of <b>MMBS</b>.</p>
                    <div class="input-group mb-3">
                        <input type="text" class="form-control" required v-model="mmbs">
                    </div>        
                </div>

                <div class="custom-control custom-checkbox text-left mt-4">
                    <input v-model="terms" type="checkbox" class="custom-control-input" id="customCheck" name="example1">
                    <label class="custom-control-label" for="customCheck">I agree to the CFBPSN <nuxt-link to="./">Terms & Conditions of use</nuxt-link> and <nuxt-link to="./">privacy policy</nuxt-link></label>
                </div>

                <div class="p-2">
                    <button @click="create(verfied = false)" class="btn btn-primary box-shadow bd-radius-0 mt-4 btn-block pt-3 pb-3"  type="button" data-toggle="modal" :data-target="tab == 'doctor' ? '#post-update-modal' : ''">Create Account</button>
                </div>

            </div>            
        </div>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            challan_no: "",
            tab: "doctor",
            verfied: false,
            specialization_field: null,
            specialization_institute: null,
            mmbs: null,
            password_visible: null,
            email: null,
            password: null,
            username: null,
            terms: false,
            keywords: null,
            condition: [],
            duplicate: [
                { title: "Dissocitive Identify Disorder", },
                { title: "Ideopathic palmonary fibrosis", },
                { title: "Tendinis", },
                { title: "Restless leg syndrome", },
            ]
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
            if(!this.username) {
                this.alertmsg("Please Enter username", "danger")
                return
            }
            if(!this.terms) {
                this.alertmsg("Please read the terms and condition", "danger")
                return
            }
            

            if (!this.verfied && this.tab == 'doctor') return

            this.alertmsg("Creating an Account", "info")
            this.signup_with_email_password(this.email, this.password, (res) => {
                if(res.login) {
                    let uid = res.uid
                    this.alertmsg("Creating User Profile", "info")
                    let ref = "users",
                        child = uid,
                        obj = {
                            email: this.email,
                            password: this.password,
                            username: this.username,
                            specialization_field: this.specialization_field,
                            specialization_institute: this.specialization_institute,
                            mmbs: this.mmbs,
                            type: this.tab
                        }
                    this.firebase_put_db({ ref, child, obj }, (res) => {
                        this.alertmsg("Account Created Successfully", "success")
                        this.setCookie("mywebsite.registration", {
                            uid,
                            email: this.email,
                            password: this.password,
                            username: this.username,
                        })

                        this.$router.push("/member/home")                        

                    })
                }
                else {
                    this.alertmsg(res, "danger")
                }
            })

        },
        highlight(str) {
            return str.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            let $this = this
            this.condition = this.duplicate.filter(function(el) {
                return el.title.includes($this.keywords)
            })
        }
    }

}
</script>

<style>

</style>