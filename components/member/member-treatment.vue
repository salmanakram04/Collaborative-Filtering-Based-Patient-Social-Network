<template>
<div class="container p-4">
    <!-- The Modal -->
    <div class="modal fade" id="myModal3">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
        </div>

        <!-- Modal body -->
        <div class="modal-body p-4">
            <h2 class="modal-title">{{ preview.title }}</h2>
            <p class="w-100 small">{{ preview.symptoms }}</p>
            <div v-if="preview.body" v-html="preview.body">
            </div>
            <p v-else class="w-100 p-4 mt-5 text-center small bd-top">No Content Available for this symptom</p>
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
        </div>

        </div>
    </div>
    </div>       
    <br>
    <h3 class="font-weight-normal ls-1 mb-4">Treatments</h3>
    <div class="border w-100 p-3 bg-white">
        <div class="mb-4 bd-bottom">
            <div class="form-group mb-4 d-flex align-items-center justify-content-between w-100">
                <input @keyup="search()" @blur="hideResult()" class="form-control w-50 bd-radius-5" placeholder="Start typing to see suggestions..." v-model="keywords">
                <button @click="collapsed = !collapsed" :class="!collapsed ? 'btn-secondary shadow' : 'btn-info text-md box-shadow'" data-toggle="collapse" data-target="#recommended" class="btn transition text-white d-flex px-4"> <span class="mdi mdi-thumb-up pr-3"></span> Recommended</button>

            </div>    
            <div v-if="keywords" class="position-relative w-100 animate__animated animate__fadeInUp animate__faster">
                <div class="position-absolute overflow-auto w-100 bg-white shadow p-4 bd-radius-5 my-2" style="left:0px;top:0px;max-height:500px">
                    <div v-if="filterSearch.length > 0">
                        <button @click="preview = item" data-toggle="modal" data-target="#myModal3" class="bd-bottom bd-radius-0 hov my-0 py-2 btn btn-block text-left" v-for="(item, i) in filterSearch" :key="i">
                            <h6 v-html="highlight(item.title)"></h6>
                            <p class="small" v-html="highlight(item.symptoms)"></p>
                        </button>

                    </div>
                    <p v-else class="small text-center w-100">No Result Found!</p>
                </div>
            </div>                
            <div id="recommended" class="collapse">
                <p class="w-100 text-center text-sm p-5" v-if="!user.treatments">
                    <span class="mdi mdi-emoticon-poop text-secondary mdi-36px"></span> <br>
                    You have not added any Treatments yet!
                </p>
                <div v-else class="shadow py-4 px-4 bg-light-grey transition overflow-auto" style="max-height:500px">
                    <ul>
                        <li v-for="(item, i) in recommended" :key="i" class="mb-4 pb-4 bd-bottom">
                            <h5>{{ item.title }} <button data-toggle="modal" data-target="#myModal3"  @click="preview = item" class="btn px-0 text-sm text-primary"><u>
                                <span class="mdi mdi-information-variant"></span></u> <span class="text-sm">Details</span></button></h5>
                            <ul>
                                <li v-for="(symptom, j) in item.symptoms" :key="j">
                                    <mark v-if="user.treatments.includes(symptom.trim())">{{symptom}}</mark>
                                    <span v-else>{{symptom}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
        <h4 class="font-weight-bold">Community treatment reports</h4>
        <p>Click on a treatment to see what patients have to say about side-effects, perceived effectiveness, advice, burden, dosages and cost .</p>
        <br>
        <div class="d-flex flex-wrap" v-if="treatments.length > 0">
            <div v-for="(item, i) in treatments" :key="i" class="w-50 p-3">
                <button @click="preview = item" data-toggle="modal" data-target="#myModal3"  class="btn btn-block text-info text-left text-lg px-0"><i>{{item.title}}</i></button>
                <button class="btn w-100 d-flex justify-content-between bd-bottom bd-radius-0">
                    <span class="text-sm text-dark font-weight-bold">Treatments</span>
                    <span class="text-sm text-dark font-weight-bold">Patients</span>
                </button>
                <button @click="open(nested) ? preview = open(nested) : alertMsg()"  :data-toggle="open(nested) ? 'modal' : ''" data-target="#myModal3"  class="btn w-100 text-left bd-bottom d-flex justify-content-between bd-radius-0" v-for="(nested, j) in item.symptoms" :key="j">
                    <span>{{nested}}</span>
                    <span>0</span>
                </button>
            </div>
        </div>
        <div class="w-100" v-else>
            <p class="w-100 text-center text-sm">
                Please wait...
            </p>
        </div>

    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            collapsed: false,
            search_results: [],
            filterSearch: [],
            treatments: [],
            keywords: null,
            preview: {
                symptoms: []
            },            
            user: {},
            recommended: []
        }
    },
    methods: {
        alertMsg()
        {
            let notification = {
                title: 'Condition Not Found',
                description: 'This treatment does not have any conditions. Try looking for something else' 
            }
            this.alertnotification(notification, 'info')                
        },
        getRecommended() {


            for(let i=0; i < this.user.treatments.length; i++) {
                let treatment = this.user.treatments[i].title

                for(let j=0; j<this.treatments.length; j++) {
                    if (this.treatments[j].symptoms.filter( el => el.trim() == treatment).length > 0  && this.recommended.filter( el => el.title == this.treatments[j].title ).length == 0 ) {
                        this.recommended.push(this.treatments[j])
                    }
                }
            }  

        },        
        hideResult() {
            setTimeout(() => {
                this.keywords = null
            
            }, 500);
        },
        highlight(str) {
            return str.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            let $this = this
            this.filterSearch = this.search_results.filter(function(el) {
                return el.title.includes($this.keywords)
            })
        }, 
        open(title) {

            let treatment = this.search_results.filter(function(el) {
                return el.title.trim().toLowerCase() ==(title.trim().toLowerCase())
            })

            if (treatment.length > 0) {
                return treatment[0]                

            } else {
                return false
            }
            
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
            if(u.username) {
                this.firebase_get_one('users/'+u.uid, (res) => {
                    this.user = res
                })
            }            
        }

        this.firebase_get("treatments", (res) => {
            if(res) {
                for(let i=0; i<res.length; i++) {
                    let symptoms = res[i].symptoms.split(",")
                    this.treatments.push({
                        title: res[i].title,
                        symptoms,
                        body: res[i].body
                    })
                }

                if (this.user.treatments) {
                    this.getRecommended()
                }                
            }
            console.log(this.treatments, 'my response')
        })

        this.firebase_get("conditions", (conditions) => {
            this.search_results = conditions

            this.firebase_get("treatments", (treatments) => {

                for(let i=0; i<treatments.length; i++) {
                    this.search_results.push(treatments[i])
                }
            })

        })              
    }
}
</script>

<style>

</style>