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
    <h3 class="font-weight-normal ls-1 mb-4">Symptoms</h3>
    <div class="border w-100 p-3 bg-white">
        <p><span class="text-info font-weight-bold">750000+</span> patients with <span class="text-info font-weight-bold">2,800+</span> conditions are sharing about their symptoms and how they manage them. See what they’re saying about yours…</p>
        <div class="mb-4">
            <div class="input-group mb-3 border bd-radius-5">
                <input @keyup="search()" @blur="hideResult()"  v-model="keywords" type="text" class="form-control bd-none" placeholder="Find my Symptoms">
                <div class="input-group-append">
                <span class="input-group-text material-icons bg-none bd-none">search</span>
                </div>
            </div>            
            <div v-if="keywords" class="position-relative w-100 animate__animated animate__fadeInUp animate__faster" style="z-index:100000">
                <div class="position-absolute overflow-auto w-100 shadow p-4 bd-radius-5 my-2" style="left:0px;top:0px;max-height:500px;z-index:100000;background-color:white">
                    <div v-if="filterSearch.length > 0">
                        <button @click="preview = item" data-toggle="modal" data-target="#myModal3" class="bd-bottom bd-radius-0 hov my-0 py-2 btn btn-block text-left" v-for="(item, i) in filterSearch" :key="i">
                            <h6 v-html="highlight(item.title)"></h6>
                        </button>

                    </div>
                    <p v-else class="small text-center w-100">No Result Found!</p>
                </div>
            </div>                

        </div>
        <div v-if="symptomsHome.body" v-html="symptomsHome.body"></div>
        <p v-else class="w-100 text-center small p-5">Loading...</p>
        <!-- <h4>Look from Patients like you</h4>
        <p>Check out the most commonly reported symptoms across all conditions:</p> -->
        <div class="w-100 d-none">
            <div class="w-100 d-flex align-items-center mb-3">
                <!-- <div class="w-25 d-inline">
                    <button class="btn">{{symptom.title}}</button>
                </div>
                <div class="w-50">
                    <div class="progress" style="height:25px;">
                        <div class="progress-bar bg-danger" :style="symptom.style"></div>
                    </div>                
                </div>
                <button class="btn text-md">{{symptom.style.width}}</button> -->
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            keywords: null,
            filterSearch: [],
            symptomsHome: {},
            preview: {},
            symptoms: []
        }
    },
    methods: {
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
            this.filterSearch = this.symptoms.filter(function(el) {
                return el.title.includes($this.keywords)
            })
        },  
    },
    mounted() {
        this.firebase_get("symptoms", (res) => {
            if(res) {
                this.symptoms = res
                console.log(this.symptoms)
            }
        })        
        this.firebase_get("symptoms-home", (res) => {
            console.log(res, 'my-reasasdasd')
            if(res) {
                this.symptomsHome = res[0]
            }
        })        
    }
}
</script>

<style>

</style>