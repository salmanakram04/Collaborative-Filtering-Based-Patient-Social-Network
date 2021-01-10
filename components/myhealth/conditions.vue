<template>
<div class="container">
    <h2 class="font-weight-normal">My Conditions</h2>
    <div class="p-5 mt-5 box-shadow bg-white bd-radius-5">
        <div class="w-100 mb-5" v-if="!user.conditions">
            <h2>Hi {{ user.username}},</h2>
            <p>There aren’t any conditions on your profile yet. Add one in the field above to start tracking your health, learning about your condition and connecting with others like you.</p>
        </div>
        <p>Add a condition</p>
        <div class="input-group mb-3 bg-light-grey">
            <input @keyup="search()" type="text" class="form-control bg-none" placeholder="Start typing to see suggestions" v-model="keywords">
            <div class="input-group-append">
                <span class="input-group-text material-icons">search</span>
            </div>
        </div>    
        <div class="w-100 overflow-auto bg-light-grey box-shadow pt-2 pb-2" style="max-height:300px" v-if="condition.length > 0">
            <button @click="addCondition(item)" class="btn btn-block text-left hov bd-radius-0 bd-bottom mb-0 mt-0 pt-2 pb-2" v-for="(item, i) in condition" :key="i" v-html="highlight(item)"></button>
        </div>    
        <div class="w-100 mt-5" v-if="user.conditions">
            <h4 class="font-gt-america mb-1">My Conditions</h4>
            <p class="text-sm text-info mb-4">({{user.conditions.length}}) conditions found</p>
            <button class="btn btn-block text-left pb-2 btn-hov bd-radius-0 bg-light-grey" v-for="(condition, j) in user.conditions" :key="j">
                <span>{{ condition }}</span>
            </button>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: "Q"
            },
            condition: [], duplicate: [],
            keywords: null          
        }
    },
    methods: {
        addCondition(condition) {
            let myConditions = this.user.conditions || [],
                { uid } = this.user
            
            if(!myConditions.includes(condition)) {
                myConditions.push(condition)
            }
            else {
                this.alertmsg("Condition Already Added", "info")
                return
            }

            this.firebase_put_db({ ref: 'users/'+uid, child: 'conditions', obj: myConditions }, (res) => {
                this.alertmsg("Condition Added Successfully", "success")
            })            
        },
        highlight(str) {
            return str.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            if(!this.keywords) {
                this.condition = []
                return
            }
            let $this = this
            this.condition = this.duplicate.filter(function(el) {
                return el.includes($this.keywords)
            })
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.user = res
                        console.log(this.user, 'my users...')
                    })
                }            
        }
        this.firebase_get("conditions", (res) => {
            if(res) {
                for(let i=0; i<res.length; i++) {
                    let symptoms = res[i].symptoms.split(",")
                    for(let j=0; j<symptoms.length; j++) {
                        this.duplicate.push(symptoms[j].trim())
                    }
                }
            }
        })                
    }    
}
</script>

<style>

</style>