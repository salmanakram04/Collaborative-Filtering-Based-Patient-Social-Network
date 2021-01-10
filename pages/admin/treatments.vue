<template>
<div class="container">
  <form action="/action_page.php">
    <div class="form-group">
      <label for="email">Treatment Title:</label>
      <input type="email" class="form-control" v-model="title">
    </div>

    <div>
        <p>Treatments (Seperate by commas)</p>
        <div class="form-group">
        <textarea cols="30" rows="10" class="w-100" v-model="symptoms"></textarea>
        </div>
    </div>

    <div>
        <p>Body</p>
        <div class="form-group">
            <textarea cols="30" rows="10" class="w-100" v-model="body"></textarea>
        </div>
    </div>

    <button v-if="!update" type="button" @click="upload()" class="btn btn-primary">Add</button>
    <button v-else type="button" @click="updateRecord()" class="btn btn-primary">Update</button>
  </form>

    <div class="w-100 mt-4" v-if="treatments.length > 0">
        <div class="w-100 p-2 bd-bottom d-flex justify-content-between align-items-center" v-for="(treatment, i) in treatments" :key="i">
            <p>{{treatment.title}}</p>
            <div>
                <button @click="key = treatment.key, title = treatment.title, symptoms = treatment.symptoms, body = treatment.body, update = true" class="btn p-0 mdi mdi-pencil"></button>
                <button @click="deleteSymptom(treatment)" class="btn p-0 mdi mdi-delete"></button>
            </div>
        </div>
    </div>
    <p v-else class="w-100 p-5 text-center">Please Wait...</p>

</div>
</template>

<script>
export default {
    data() {
        return {
            title: null,
            symptoms: null,
            body: null,
            treatments: [],
            update: false,
            key: null,
        }
    },
    methods: {
        updateRecord() {
            let ref = 'treatments/' + this.key,
                object = {
                    title: this.title,
                    symptoms: this.symptoms,
                    body: this.body
                }
            this.firebase_update({ ref, object}, (res) => {
                let notification = {
                    title: 'treatment Updated Successfully',
                    description: 'Your treatment Has been Updated successfully, try refreshing your page to see the changes.' 
                }
                this.alertnotification(notification, 'success')                    
            })            
        },
        deleteSymptom(treatment) {
            this.firebase_remove_one('treatments/'+treatment.key, (res) => {
                let notification = {
                    title: 'Treatment Deleted Successfully',
                    description: 'Your Treatment Has been deleted successfully, try refreshing your page to see the changes.' 
                }
                this.alertnotification(notification, 'success')                     
            })            
        },        
        upload() {
            if(this.title && this.symptoms && this.body) {
                let obj = {
                    title: this.title,
                    symptoms: this.symptoms,
                    body: this.body
                }
                this.firebase_push_db({ ref: "treatments", obj }, (res) => {
                    this.alertmsg("Treatment Added Succsessfully", "success")
                    console.log(res, 'my response.')
                })
            }
            else {
                this.alertmsg("Fill the field", "danger")
            }
        }
    },
    mounted() {
        this.firebase_get("treatments", (treatments) => {
            this.treatments = treatments
        })        
    }
}
</script>

<style>

</style>