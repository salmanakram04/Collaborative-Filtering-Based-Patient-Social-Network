<template>
<div class="container">
    <h2 class="font-weight-normal">My symptoms</h2>
    <p>Use this tool to keep track of the symptoms you're experiencing. For a fuller picture of your health, complete your MonthlyMe questionnaire regularly in your health checklist.</p>
    <div class="p-5 mt-5 box-shadow bg-white bd-radius-5">
        <div class="w-100 mb-5">
            <h4>Tracking symptom data</h4>
            <p>If you also want to figure out what might trigger or help particular symptoms and side effects, you can use the tools below to track them daily.</p>
        </div>
        <p class="mb-2">Add a new symptom</p>
        <div class="input-group mb-3 bg-light-grey">
            <input @keyup="search()" type="text" class="form-control bg-none" placeholder="Start typing to see suggestions" v-model="keywords">
            <div class="input-group-append">
                <span class="input-group-text material-icons">search</span>
            </div>
        </div>    
        <div class="position-relative">
            <div class="w-100 position-absolute overflow-auto bg-white bd-radius-5 box-shadow pt-2 pb-2" style="max-height:300px;z-index:10000" v-if="condition.length > 0">
                <button class="btn btn-block text-left hov bd-radius-0 bd-bottom mb-0 mt-0 pt-2 pb-2" v-for="(item, i) in condition" :key="i" v-html="highlight(item)"></button>
            </div>    
        </div>
        <div class="w-100">
            <table class="table table-bordered table-sm">
                <thead>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th class="text-sm">Symptoms</th>
                    <th class="w-25 text-sm">Relevant Conditions</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(symptom, i) in symptoms" :key="i">
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td class="text-right">
                            <button class="btn p-0" @click="symptom.today = !symptom.today">
                                
                                <span v-if="symptom.type == 'Severe'" class="btn p-0 btn-severe"></span>
                                <span v-else-if="symptom.type == 'Moderate'" class="btn p-0 btn-moderate"></span>
                                <span v-else-if="symptom.type == 'Mild'" class="btn p-0 btn-mild"></span>
                                <span v-else-if="symptom.type == 'None'" class="btn p-0 btn-none"></span>
                                <span v-else class="text-secondary text-md material-icons">add_circle</span>
                            </button>
                            <div class="position-relative" v-if="symptom.today">
                                <div class="position-absolute bg-white box-shadow bd-radius-5" style="width:220px; top:0px;">
                                    <button class="btn btn-block text-right material-icons p-2 text-sm" @click="symptom.today = false">clear</button>
                                    <div class="p-4">
                                        <button :class="symptom.type == stype ? 'btn-primary box-shadow' : 'border hov'" @click="symptom.type = stype, symptom.today = false" class="btn btn-block mb-1 mt-0" v-for="(stype, j) in symptomsTypes" :key="j">{{stype}}</button>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 w-75 bd-none bd-bottom">
                            <a href="javascript:void(0)">{{symptom.$}}</a>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>         
            <div class="text-right">
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
            symptomsTypes: ["None", "Mild", "Moderate", "Severe"],
            user: {
                username: "Q"
            },
            condition: [], duplicate: [],
            keywords: null,
            symptoms: [
                { $: "Anxious mood" , today: false, type: ""},
                { $: "Depressed mood" , today: false, type: "" },
                { $: "Fatigue" , today: false, type: "" },
                { $: "Increased rate of sppech" , today: false, type: "" },
                { $: "Pain" , today: false, type: "" },
                { $: "Rapid speech" , today: false, type: "" },
                { $: "Rashes (redness, swelling)" , today: false, type: "" },
                { $: "Stress", today: false, type: ""}
            ]          
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
.btn-severe {
    width: 20px !important;
    height: 20px !important;
    border-radius: 50%;
    background-color: #e36468 !important;
}
.btn-moderate {
    width: 16px !important;
    height: 16px !important;
    border-radius: 50%;
    background-color: #eb888b !important;
}
.btn-mild {
    width: 12px !important;
    height: 12px !important;
    border-radius: 50%;
    background-color: #ffb3b5 !important;
}
.btn-none {
    width: 8px !important;
    height: 8px !important;
    border-radius: 50%;
    border: 1px solid black;
    background-color: white !important;
}
</style>