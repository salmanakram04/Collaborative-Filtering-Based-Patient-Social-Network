<template>
<div class="container">
  <h2>Stacked form</h2>
    <form action="/action_page.php">
        <div class="form-group">
            <label for="email">Condition Title:</label>
            <input type="email" class="form-control" v-model="title">
        </div>

        <div>
            <p>Symptoms (Seperate by commas)</p>
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

    <div class="w-100 mt-4" v-if="conditions.length > 0">
        <div class="w-100 p-2 bd-bottom d-flex justify-content-between align-items-center" v-for="(condition, i) in conditions" :key="i">
            <p>{{condition.title}}</p>
            <div>
                <button @click="key = condition.key, title = condition.title, symptoms = condition.symptoms, body = condition.body, update = true" class="btn p-0 mdi mdi-pencil"></button>
                <button @click="deleteSymptom(condition)" class="btn p-0 mdi mdi-delete"></button>
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
            conditions: [],
            update: false,
            key: null,
        }
    },
    methods: {
        updateRecord() {
            let ref = 'conditions/' + this.key,
                object = {
                    title: this.title,
                    symptoms: this.symptoms,
                    body: this.body
                }
            this.firebase_update({ ref, object}, (res) => {
                let notification = {
                    title: 'Condition Updated Successfully',
                    description: 'Your Condition Has been Updated successfully, try refreshing your page to see the changes.' 
                }
                this.alertnotification(notification, 'success')                    
            })            
        },
        deleteSymptom(condition) {
            this.firebase_remove_one('conditions/'+condition.key, (res) => {
                let notification = {
                    title: 'Condition Deleted Successfully',
                    description: 'Your Condition Has been deleted successfully, try refreshing your page to see the changes.' 
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
                this.firebase_push_db({ ref: "conditions", obj }, (res) => {
                    this.alertmsg("Condition Added Succsessfully", "success")
                    console.log(res, 'my response.')
                })
            }
            else {
                this.alertmsg("Fill the field", "danger")
            }
        }
    },
    mounted() {
        this.firebase_get("conditions", (conditions) => {
            console.log(conditions, 'cond')
            this.conditions = conditions
        })        
    }
}
</script>

<style>

</style>