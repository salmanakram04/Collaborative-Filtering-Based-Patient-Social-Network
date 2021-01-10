<template>
<div class="container">
    <h2 class="font-weight-normal">My treatments</h2>
    <p>Changed dosage or treatments? Keep your information up to date to see how well your treatments are working over time. It’s also important to enter treatments you have used in the past.</p>
    <div class="box-shadow bg-white bd-radius-5">
        <div class="bg-light-grey p-4 box-shadow">
            <p>Add a new treatment</p>
            <div class="input-group mb-3 bg-white border">
                <input @keyup="search()" type="text" class="form-control bg-none text-italic" placeholder="Start typing to see suggestions" v-model="keywords">
                <div class="input-group-append">
                    <span class="input-group-text material-icons">search</span>
                </div>
            </div>    
            <div class="w-100 overflow-auto bg-white bd-radius-5 box-shadow pt-2 pb-2" style="max-height:300px" v-if="treatments.length > 0">
                <button @click="addTreatment(item)" class="btn btn-block text-left hov bd-radius-0 bd-bottom mb-0 mt-0 pt-2 pb-2" v-for="(item, i) in treatments" :key="i" v-html="highlight(item)"></button>
            </div>    
        </div>
        <div class="w-100 mt-5 p-5" v-if="user.treatments">
            <table class="w-100">
                <thead>
                    <th class="text-sm bd-bottom pb-2">Prescription drug</th>
                    <th class="text-sm bd-bottom pb-2">Dosage</th>
                    <th class="text-sm bd-bottom pb-2">Purpose</th>
                    <th class="text-sm bd-bottom pb-2 d-none">Your Evaluation</th>
                </thead>
                <tbody>
                    <tr v-for="(treatment, i) in user.treatments" :key="i">
                        <td class="p-2 bd-bottom pb-4 pt-4">
                            <p class="d-flex align-items-center text-primary font-weight-bold mb-0">
                                <span class="text-md">{{ treatment.title }}</span> 
                                <span class="ml-1 material-icons text-danger text-md">error_outline</span></p>
                            <p class="small">Last Updated at 10/20/2020</p>
                        </td>
                        <td class="p-2 bd-bottom pb-4 pt-4">
                            <button class="btn p-0 d-flex align-items-center" @click="!treatment.dosage.msg ? treatment.dosage.visible = !treatment.dosage.visible : null">
                                <span v-if="!treatment.dosage.msg">
                                    <span class="material-icons text-md">add</span>
                                    <span class="text-sm">Add Dosage</span>
                                </span>
                                <span v-else class="text-sm"> {{ treatment.dosage.msg }}</span>
                            </button>
                            <div class="position-relative" v-if="treatment.dosage.visible">
                                <div class="position-absolute bg-white box-shadow" style="width:420px;z-index:1000">
                                    <button @click="treatment.dosage.visible = false" class="btn material-icons btn-block text-right text-md bd-radius-5 p-3">clear</button>
                                    <div class="p-4">
                                        <p class="text-sm">Are you currently Taking Any Dosage ?</p>
                                        <div class="w-100">
                                            <button  @click="treatment.dosage.taking = true, treatment.dosage.visible = false, updateDosage(treatment)" class="btn pl-4 pr-4" :class="treatment.dosage.taking ? 'btn-info' : 'btn-outline-secondary ' ">Yes</button>
                                            <button @click="treatment.dosage.taking = false, treatment.dosage.visible = false, updateDosage(treatment)" class="btn pl-4 pr-4" :class="!treatment.dosage.taking ? 'btn-info' : 'btn-outline-secondary' ">No</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 bd-bottom pb-4 pt-4">
                            <button  @click="!treatment.purposeMsg ?  treatment.purpose = !treatment.purpose : null" class="btn p-0 d-flex align-items-center">
                                <span v-if="!treatment.purposeMsg">
                                    <span class="material-icons text-md">add</span>
                                    <span class="text-sm">Add a Purpose</span>
                                </span>
                                <span v-else class="text-danger text-sm font-weight-bold">{{ treatment.purposeMsg }}</span>
                            </button>
                            <div class="position-relative" v-if="treatment.purpose && !treatment.purposeMsg">
                                <div class="position-absolute bg-white box-shadow" style="width:420px;z-index:1000">
                                    <button @click="treatment.purpose = false" class="btn material-icons btn-block text-right text-md bd-radius-5 p-3">clear</button>
                                    <div class="p-4">
                                        <p class="text-sm">Why did you start using No treatments?</p>
                                        <br>
                                        <p class="text-sm">Choose from the most popular purposes</p>
                                        <div>
                                            <button @click="updatePurpose('General Health', treatment)" class="btn text-sm btn-info bd-round pl-4 pr-4 mb-3 mr-2 box-shadow">General Health</button>
                                            <button @click="updatePurpose('Multiple sclerosis', treatment)"  class="btn text-sm btn-info bd-round pl-4 pr-4 mb-3 mr-2 box-shadow">Multiple sclerosis</button>
                                            <button @click="updatePurpose('Fatigue', treatment)"  class="btn text-sm btn-info bd-round pl-4 pr-4 mb-3 mr-2 box-shadow">Fatigue</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="p-2 bd-bottom pb-4 pt-4 d-none">
                            <button class="btn btn-warning text-white box-shadow pl-4 pr-4 pt-2 pb-2" disabled>Evaluate</button>
                        </td>
                    </tr>
                </tbody>
            </table>
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
            duplicate: [],
            keywords: null,
            treatments: []        
        }
    },
    methods: {
        updatePurpose(purpose, treatment) {

            treatment['purposeMsg'] = purpose

            this.firebase_update({ ref: 'users/' + this.user.uid + "/treatments", object: this.user.treatments }, (res) => {
                this.alertmsg("updated", "success")
            })

        },
        updateDosage(treatment) {

            if (treatment.dosage.taking) {                
                treatment.dosage["msg"] = "Currently Taking Dosage"

            } else {
                treatment.dosage["msg"] = "Currently Taking No Dosage"
            }

            this.firebase_update({ ref: 'users/' + this.user.uid + "/treatments", object: this.user.treatments }, (res) => {
                this.alertmsg("updated", "success")
            })

            console.log(treatment, 'treatment.')
        },
        addTreatment(treatment) {
            let myTreatments = this.user.treatments || [],
                { uid } = this.user
            
            if(!myTreatments.includes(treatment)) {
                myTreatments.push({ title: treatment, dosage: { taking: false, visible: false }, purpose: false })
            }
            else {
                this.alertmsg("Condition Already Added", "info")
                return
            }

            this.firebase_put_db({ ref: 'users/'+uid, child: 'treatments', obj: myTreatments }, (res) => {
                this.alertmsg("Treatment Added Successfully", "success")
                this.treatments = []
            })            
        },
        highlight(str) {
            return str.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            if(!this.keywords) {
                this.treatments = []
                return
            }
            let $this = this
            this.treatments = this.duplicate.filter(function(el) {
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
        this.firebase_get("treatments", (res) => {
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