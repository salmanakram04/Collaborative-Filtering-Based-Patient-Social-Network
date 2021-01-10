<template>
<div class="container p-4">
    <!-- The Modal -->
    <div class="modal fade" id="myModal2">
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
    <h3 class="font-weight-normal ls-1 mb-4">Featured Conditions at <b>CFBPSN</b></h3>
    <div class="border w-100 p-3 bg-white">
        <div class="mb-4 bd-bottom">
            <div class="form-group mb-4 d-flex align-items-center justify-content-between w-100">
                <input @keyup="search()" @blur="hideResult()" class="form-control w-50 bd-radius-5" placeholder="Look up for conditions" v-model="keywords">
                <button @click="collapsed = !collapsed" :class="!collapsed ? 'btn-secondary shadow' : 'btn-info text-md box-shadow'" data-toggle="collapse" data-target="#recommended" class="btn transition text-white d-flex px-4"> <span class="mdi mdi-thumb-up pr-3"></span> Recommended</button>
            </div>    
            <div v-if="keywords" class="position-relative w-100 animate__animated animate__fadeInUp animate__faster">
                <div class="position-absolute overflow-auto w-100 bg-white shadow p-4 bd-radius-5 my-2" style="left:0px;top:0px;max-height:500px">
                    <div v-if="filterSearch.length > 0">
                        <button @click="preview = item" data-toggle="modal" data-target="#myModal2" class="bd-bottom bd-radius-0 hov my-0 py-2 btn btn-block text-left" v-for="(item, i) in filterSearch" :key="i">
                            <h6 v-html="highlight(item.title)"></h6>
                            <p class="small" v-html="highlight(item.symptoms)"></p>
                        </button>

                    </div>
                    <p v-else class="small text-center w-100">No Result Found!</p>
                </div>
            </div>                
            <div id="recommended" class="collapse">
                <p class="w-100 text-center text-sm p-5" v-if="!user.conditions || this.recommended.length == 0">
                    <span class="mdi mdi-emoticon-poop text-secondary mdi-36px"></span> <br>
                    You have not added any conditions yet!
                </p>
                <div v-else class="shadow py-4 px-4 bg-light-grey transition overflow-auto">
                    <ul>
                        <li v-for="(item, i) in recommended" :key="i" class="mb-4 pb-4 bd-bottom">
                            <h5>{{ item.title }}</h5>
                            <ul>
                                <li v-for="(symptom, j) in item.symptoms" :key="j">
                                    <mark v-if="user.conditions.includes(symptom.trim())">{{symptom}}</mark>
                                    <span v-else>{{symptom}}</span>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <h4>Members are tracking more than 2,800 conditions on CFBPSN. See what they’re saying about yours...</h4>
        <br>
        <div class="d-flex flex-wrap" v-if="condition.length > 0">
            <div v-for="(item, i) in condition.slice(0, 5)" :key="i" class="w-50 p-3">
                <button @click="preview = item" data-toggle="modal" data-target="#myModal2"  class="btn btn-block text-left text-lg px-0"><u>{{item.title}}</u></button>
                <p class="d-inline text-info" v-for="(nested, j) in item.symptoms" :key="j">{{nested}},</p>
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
            condition: [],
            keywords: null,
            preview: {
                symptoms: []
            },
            user: {},
            recommended: []
        }
    },
    methods: {
        getRecommended() {

            for(let i=0; i < this.user.conditions.length; i++) {
                let condition = this.user.conditions[i]

                // console.log(condition, 'condition', i, this.condition)
                for(let j=0; j<this.condition.length; j++) {
                    if (this.condition[j].symptoms.filter( el => el.trim() == condition).length > 0  && this.recommended.filter( el => el.title == this.condition[j].title ).length == 0 ) {
                        this.recommended.push(this.condition[j])
                        break
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

        this.firebase_get("conditions", (res) => {
            if(res) {
                for(let i=0; i<res.length; i++) {
                    let symptoms = res[i].symptoms.split(",")
                    this.condition.push({
                        title: res[i].title,
                        symptoms,
                        body: res[i].body
                    })
                }
                if (this.user.conditions) {
                    this.getRecommended()
                }
                

            }

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