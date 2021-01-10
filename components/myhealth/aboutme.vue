<template>
<div class="p-2">
    <h1 class="font-weight-normal">Help us get to know you</h1>
    <p>Tell the community about yourself so they can get to know you better.</p>
    <div class="w-100 row m-0">
        <div class="col-md-6 p-2">
            <div class="p-4 box-shadow bg-white bd-radius-5">
                <h4 class="font-weight-normal mb-5">Profile Photo</h4>
                <div class="d-flex align-items-center">
                    <div class="flex-shrink-0">
                        <button style="width:120px;height:120px;border-radius:50%" :class="!user.profile ? 'btn-info' : ''" class="overflow-hidden d-flex align-items-center justify-content-center btn text-white mr-4 flex-shrink-0 text-lg text-center font-dancing-script"><span v-if="!user.profile">{{user.username[0].toUpperCase()}}</span>
                        <img :src="user.profile" alt="" v-if="user.profile" class="w-100" style="transform:scale(2)">
                        </button>
                    </div>
                    <button @click="addPhoto()" class="btn pl-4 pr-4 btn-outline-secondary">Add a Photo</button>
                </div>
            </div>
            <div class="p-4 box-shadow bg-white bd-radius-5 mt-4">
                <h4 class="font-weight-normal mb-5">Basic Demographics</h4>
                <div class="row">
                    <div class="col-md-11 p-2 pl-3">
                        <div class="mb-5">
                            <p class="mb-1"><strong>Sex</strong></p>
                            <input v-model="sex" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="mb-5">
                            <p class="mb-1"><strong>Gender Identity</strong></p>
                            <input v-model="gender" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="mb-5">
                            <p class="mb-1"><strong>Pronoun</strong></p>
                            <input v-model="pronoun" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="mb-5">
                            <p class="mb-1"><strong>Birthday</strong></p>
                            <input v-model="birthday" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="w-100 text-right">
                            <button class="btn btn-info pl-4 pr-4" @click="saveUserInfo()" :disabled="!birthday || !pronoun || !gender || !sex">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="col-md-6 p-2">
            <div class="p-4 box-shadow bg-white bd-radius-5">
                <h4 class="font-weight-normal mb-5">Share your story</h4>
                <p>Help the community get to know you. Your story will be visible on your profile page.</p>
                <textarea v-model="story" class="w-100 bd-none bg-light-grey p-3 text-sm" placeholder="Write something about yourself" cols="30" rows="10"></textarea>
                <div class="w-100 text-right mt-2">
                    <button class="btn btn-info pl-4 pr-4" :disabled="!story" @click="saveUserInfo()">Add to my Profile</button>
                </div>
            </div>

            <div class="p-4 box-shadow bg-white bd-radius-5 mt-4">
                <h4 class="font-weight-normal mb-5">Location</h4>
                <div class="row">
                    <div class="col-md-11 p-2 pl-3">
                        <div class="mb-4">
                            <p class="mb-1"><strong>Country</strong></p>
                            <input v-model="country" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="mb-4">
                            <p class="mb-1"><strong>State/Province</strong></p>
                            <input v-model="state" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="mb-4">
                            <p class="mb-1"><strong>City</strong></p>
                            <input v-model="city" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="mb-4">
                            <p class="mb-1"><strong>Zip code</strong></p>
                            <input v-model="zip" type="text" placeholder="Not Specified" class="bd-none border w-100 ml-2 bd-round bg-light-grey p-2 pl-4 pr-4">                                                
                        </div>
                        <div class="w-100 text-right">
                            <button class="btn btn-info pl-4 pr-4" @click="saveUserInfo()" :disabled="!zip || !city || !state || !country">Save</button>
                        </div>
                    </div>
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
            user: {
                username: "Q",
                profile: "",
            },         
            story: null,
            sex: null,
            gender: null,
            pronoun: null,
            birthday: null,
            country: null,
            state: null,
            city: null,
            zip: null   

        }
    },
    methods: {
        saveUserInfo() {
            let obj = {
                story: this.story, sex: this.sex,
                gender: this.gender, pronoun: this.pronoun,
                birthday: this.birthday, country: this.country,
                state: this.state, city: this.city, zip: this.zip
            }
            this.firebase_put_db({ ref: 'users/'+this.user.uid, child: 'info', obj }, (res) => {
                this.alertmsg("User Information Saved Successfully", "success")
            })

        },
        addPhoto() {
            this.uploadImgFile((src) => {
                this.firebase_put_db({ ref: 'users/'+this.user.uid, child: 'profile', obj: src }, (res) => {
                    this.user.profile = src
                    this.alertmsg("Profile Changed Successfully", "success")
                })
            })            
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.user = res
                        if(this.user.info) {
                            let { story, zip, country, sex, gender, pronoun, birthday, state, city } = this.user.info 
                            this.story = story
                            this.sex = sex
                            this.gender = gender
                            this.pronoun = pronoun
                            this.birthday = birthday
                            this.country = country
                            this.state = state
                            this.city = city
                            this.zip = zip
                        }
                    })
                }            
        }        
    }
}
</script>

<style>

</style>