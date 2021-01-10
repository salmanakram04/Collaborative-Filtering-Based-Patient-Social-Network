<template>
<div class="container">
  <form action="/action_page.php">

    <div>
        <p>Body</p>
        <div class="form-group">
            <textarea cols="30" rows="10" class="w-100" v-model="body"></textarea>
        </div>
    </div>

    <button v-if="!update" type="button" @click="upload()" class="btn btn-primary">Add</button>
    <button v-else type="button" @click="updateRecord()" class="btn btn-primary">Update</button>
  </form>

    <div class="w-100 mt-4" v-if="symptoms.length > 0">
        <div class="w-100 p-2 bd-bottom d-flex justify-content-between align-items-center" v-for="(symptom, i) in symptoms" :key="i">
            <p>{{i}}</p>
            <div>
                <button @click="key = symptom.key, body = symptom.body, update = true" class="btn p-0 mdi mdi-pencil"></button>
                <button @click="deleteSymptom(symptom)" class="btn p-0 mdi mdi-delete"></button>
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
            body: null,
            symptoms: [],
            update: false,
            key: null,
        }
    },
    methods: {
        updateRecord() {
            let ref = 'symptoms-home/' + this.key,
                object = {
                    body: this.body
                }
            this.firebase_update({ ref, object}, (res) => {
                let notification = {
                    title: 'Symptom Updated Successfully',
                    description: 'Your Symptom Has been Updated successfully, try refreshing your page to see the changes.' 
                }
                this.alertnotification(notification, 'success')                    
            })            
        },
        deleteSymptom(symptom) {
            this.firebase_remove_one('symptoms-home/'+symptom.key, (res) => {
                let notification = {
                    title: 'symptom Deleted Successfully',
                    description: 'Your symptom Has been deleted successfully, try refreshing your page to see the changes.' 
                }
                this.alertnotification(notification, 'success')                     
            })            
        },        
        upload() {
            if(this.body) {
                let obj = {
                    body: this.body
                }
                this.firebase_push_db({ ref: "symptoms-home", obj }, (res) => {
                    this.alertmsg("Symptom Added Succsessfully", "success")
                    console.log(res, 'my response.')
                })
            }
            else {
                this.alertmsg("Fill the field", "danger")
            }
        }
    },
    mounted() {
        this.firebase_get("symptoms-home", (symptoms) => {
            this.symptoms = symptoms
        })        
    }
}
</script>

<style>

</style>