<template>
<div class="container">
    <h2 class="font-weight-normal">My Charts</h2>
    <div class="p-5 mt-5 box-shadow bg-white bd-radius-5">
        <div v-if="user.conditions">
            <button @click="conditions = !conditions" class="btn btn-block text-left bg-light-grey p-3 d-flex align-items-center">
                <span class="material-icons">{{ conditions ? 'arrow_drop_down' : 'arrow_right'}}</span>
                <span>Conditions</span>
            </button>
            <div class="p-4" v-if="conditions">
                <p v-for="(c, i) in user.conditions" :key="i" class="bg-light-grey p-1 text-primary bd-round pl-4 small">
                    {{c}}
                </p>
            </div>
            <div class="text-center">
                <button class="btn">
                    <span class="btn p-0 btn-none"></span>
                    <span>None</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-mild"></span>
                    <span>Mild</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-moderate"></span>
                    <span>Moderate</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-severe"></span>
                    <span>Severe</span>
                </button>
            </div>            
        </div>        
        <div class="mt-4" v-if="user.treatments">
            <button @click="treatments = !treatments" class="btn btn-block text-left bg-light-grey p-3 d-flex align-items-center">
                <span class="material-icons">{{ treatments ? 'arrow_drop_down' : 'arrow_right'}}</span>
                <span>Treatments</span>
            </button>
            <div class="p-4" v-if="treatments">
                <p v-for="(t, i) in user.treatments" :key="i" class="bg-light-grey p-1 text-primary bd-round pl-4 small">
                    {{t.title}}
                </p>
            </div>
            <div class="text-center">
                <button class="btn">
                    <span class="btn p-0 btn-none"></span>
                    <span>None</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-mild"></span>
                    <span>Mild</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-moderate"></span>
                    <span>Moderate</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-severe"></span>
                    <span>Severe</span>
                </button>
            </div>             
        </div>

        <div class="mt-4">
            <button @click="symptoms = !symptoms" class="btn btn-block text-left bg-light-grey p-3 d-flex align-items-center">
                <span class="material-icons">{{ symptoms ? 'arrow_drop_down' : 'arrow_right'}}</span>
                <span>Symptoms</span>
            </button>
            <div class="p-4" v-if="symptoms">
                <p v-for="(s, i) in mySymptoms" :key="i" class="bg-light-grey p-1 text-primary bd-round pl-4 small">
                    {{s}}
                </p>
            </div>
            <div class="text-center">
                <button class="btn">
                    <span class="btn p-0 btn-none"></span>
                    <span>None</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-mild"></span>
                    <span>Mild</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-moderate"></span>
                    <span>Moderate</span>
                </button>
                <button class="btn">
                    <span class="btn p-0 btn-severe"></span>
                    <span>Severe</span>
                </button>
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
                username: "Q"
            },
            condition: [],
            treatments: true,
            symptoms: true,
            conditions: true,
            mySymptoms: ["Anxious mood", "Depressed Mood", "Fatigue", "Pain", "Stress"],
        }
    },
    methods: {

    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.user = res
                        console.log(this.user)
                    })
                }            
        }
    }    
}
</script>

<style>

</style>