<template>
<div class="container">
    <div class="w-100 bg-white box-shadow mt-5 pt-4 pb-5 pl-4 pr-4">
        <div>
            <div class="w-100">
                <h4 class="p-2 font-weight-normal">Create a new Test Report</h4>
                    <div class="w-100">
                        <div class="form-group bg-light-grey w-100 p-2 pb-4 border box-shadow" style="border-radius:25px 5px 5px 0px;">
                            <input type="text" class="form-control w-100 bd-none bg-none" placeholder="Add a Short description" v-model="content">
                            <div class="bd-top p-2" v-if="attach">
                                <div class="border d-inline-block position-relative">
                                    <img :src="attach" alt="" width="120px">
                                    <button @click="attach=null" class="btn btn-danger material-icons position-absolute p-2" style="border-radius:50%;bottom:-20px;right:-25px;">delete</button>                                
                                </div>
                            </div>
                        </div>     
                        <div class="w-100 d-flex justify-content-between">
                            <div>
                                <button v-if="!attach" @click="uploadImage()" class="btn material-icons border">attach_file</button>
                            </div>
                            <div>
                                <button @click="post = false" class="btn btn-outline-secondary pl-4 pr-4 mr-2 font-weight-bold">Cancel</button>
                                <button @click="createReport()" class="btn btn-success pl-4 pr-4 box-shadow font-weight-bold" :disabled="!content">
                                    <span v-if="loading" class="spinner-border spinner-border-sm"></span>
                                    <span v-else>Create</span>
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>

    <div class="w-100" v-if="testReports && testReports.length > 0">
        <br>
        <h4 class="font-weight-normal mt-5">My Test Reports ({{ testReports.length }})</h4>
        <div class="w-100  mt-4 p-4 bg-white box-shadow " v-for="(p, i) in testReports" :key="i">
            <div class="w-100">
                <div class="w-75 m-auto">
                    <img v-if="p.attachment" :src="p.attachment" class="w-100 bd-radius-5 box-shadow" alt="">
                </div>
                <br>
                <h4 class="font-gt-america">Details</h4>
                <p v-html="p.content" class="mt-3"></p>
            </div>
        </div>
    </div>
    <div class="w-100 p-5 text-center" v-else>
        <p class="w-100 p-5 text-center">No Reports Yet!</p>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            post: false,
            content: null,
            attach: null,
            loading: false,
            user: {
                username: "Q"
            },
            comment: null,
            testReports: []
        }
    },
    methods: {
        uploadImage() {
            this.uploadImgFile((src) => {
                this.attach = src
            })
        },
        createReport() {
            let obj = {
                content: this.content,
                attachment: this.attach,
                user: this.user,
                date: this.getDate()
            }
            this.loading = true
            this.content = null
            this.firebase_push_db({ ref: "test-reports", obj }, (res) => {
                this.alertmsg("Test Report Created Succsessfully", "success")
                this.loading = false
            })            
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.user = this.getCookie("mywebsite.registration")
                }            
        }
        this.firebase_get("test-reports", (res) => {
            if(res) {
                for(let i=0; i<res.length; i++) {
                    let report = res[i]
                    if(report.user.uid == this.user.uid) {
                        this.testReports.push(report)
                    }
                }
            }
        })        

    }
}
</script>

<style>

</style>