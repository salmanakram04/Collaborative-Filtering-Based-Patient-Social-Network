<template>
<div class="container">
    <div class="w-100 pt-5 d-flex justify-content-center">
        <button @click="tab='make_appointment'" :class="tab == 'make_appointment' ? 'text-primary font-weight-bold' : ''" class="btn text-lg px-5 transition border-right border-radius-0">Make Appointment</button>
        <button @click="tab=null" class="btn text-lg px-5"  :class="tab != 'make_appointment' ? 'text-primary font-weight-bold' : ''" >My Appointment</button>
    </div>
    <div v-if="tab=='make_appointment'" class="p-5 mt-5 box-shadow bg-white bd-radius-5 w-75 mx-auto">
        <div class="w-100 mb-5" v-if="!user.conditions">
            <h2>Hi {{ user.username}},</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque dignissimos culpa quasi minima nobis sapiente fugiat libero. Laboriosam odit, accusantium, ducimus, praesentium fugit ea pariatur dolorem at magnam vitae facere.</p>
        </div>
        <div class="input-group d-flex mb-4">
            <input type="text" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="First Name" v-model="first_name">
            <input type="text" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="Last Name" v-model="last_name">
        </div>
        <div class="input-group d-flex mb-4">
            <input type="number" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="Age" v-model="age">
            <input type="number" class="form-control mr-4 bg-light-grey border bd-round pl-4" placeholder="Weight (Kg)" v-model="weight">
        </div>
        <div class="d-flex mb-3">
            <textarea name="" id="" cols="30" rows="10" placeholder="Disease History" class="w-50 m-2 p-2 bg-light-grey border bd-radius-5" v-model="disease_history"></textarea>
            <textarea name="" id="" cols="30" rows="10" placeholder="Family history About Disease" class="w-50 p-2 m-2 bg-light-grey border bd-radius-5" v-model="family_history"></textarea>
        </div>
        <div class="d-flex mb-4">
            <textarea name="" id="" rows="5" placeholder="Allergies (Seperated by commas)" class="w-100 p-2 m-2 bg-light-grey border bd-radius-5" v-model="allergies"></textarea>
        </div>
        <br>
        <p>Appointment Date & Time</p>
        <div class="input-group d-flex mb-4">
            <input type="date" class="form-control mr-4 bg-light-grey border bd-round pl-4" v-model="mydate">
            <input type="time" class="form-control mr-4 bg-light-grey border bd-round pl-4" v-model="time">
        </div>
        <br>
        <p class="mb-1 font-weight-bold">
            {{ doctor ? 'Doctor Picked ('+doctor.username+')' : 'Pickup a Doctor'}}
        </p>
        <div class="input-group mb-3 bg-light-grey">
            <input @keyup="search()" type="text" class="form-control bg-none" placeholder="Start typing to see suggestions" v-model="keywords">
            <div class="input-group-append">
                <span class="input-group-text material-icons">search</span>
            </div>
        </div>    
        <div class="w-100 overflow-auto bg-light-grey box-shadow pt-2 pb-2" style="max-height:300px" v-if="doctors.length > 0">
            <button @click="doctor = item, doctors = [], keywords = item.username" class="btn btn-block text-left hov bd-radius-0 bd-bottom mb-0 mt-0 pt-2 pb-2" v-for="(item, i) in doctors" :key="i" v-html="highlight(item)"></button>
        </div>    
        <div class="w-100 text-right mt-5">
            <button @click="makeAnAppointment()" class="btn btn-info pl-4 pr-4 box-shadow bd-round" :disabled="!doctor || !mydate || !time || !allergies || !disease_history || !family_history || !age || !weight || !first_name || !last_name">Make Appointment</button>
        </div>
    </div>
    <div v-else>
        <div v-if="appointments.length > 0 && !loading">
            <br>
            <h2 class="font-weight-normal pt-5">My Appointments</h2>
            <p>Here is a list of all Appointments that patients has made with you. You can start conversation with these patients by clicking on the chat button</p>
            <div class="box-shadow bg-white bd-radius-5">
                <div class="w-100 mt-5 p-5" v-if="appointments.length > 0">
                    <table class="w-100">
                        <thead>
                            <th class="text-sm bd-bottom pb-2">Doctor Name</th>
                            <th class="text-sm bd-bottom pb-2">Date & Time</th>
                            <th class="text-sm bd-bottom pb-2">Weight</th>
                            <th class="text-sm bd-bottom pb-2">Age</th>
                            <th class="text-sm bd-bottom pb-2" colspan="3"></th>
                        </thead>
                        <tbody>
                            <tr v-for="(app, i) in appointments" :key="i">
                                <td class="p-2 bd-bottom pb-4 pt-4">
                                    <p class="d-flex align-items-center text-primary text-capitalize mb-0">
                                        <span class="text-sm font-weight-bold">{{ app.doctor.username }}</span> 
                                    </p>
                                </td>
                                <td class="bd-bottom">
                                    <button class="btn text-sm p-0">{{ app.date + " at " + app.time }}</button>
                                </td>
                                <td class="bd-bottom">
                                    <button class="btn text-sm p-0">{{ app.weight + ' kg' }}</button>
                                </td>
                                <td class="bd-bottom">
                                    <button class="btn text-sm p-0">{{ app.age + ' years old'}}</button>
                                </td>
                                <td class="bd-bottom pb-4 pt-4 pl-5">
                                    <button  @click="app.details = !app.details" class="btn p-2 bg-light-grey bd-round pl-4 pr-4 hov d-flex align-items-center">
                                        <span class="material-icons text-md text-danger mr-2">details</span>
                                        <span class="text-sm">View Details</span>
                                    </button>
                                    <div class="position-relative animate__animated  animate__fadeInUp animate__faster" v-if="app.details">
                                        <div class="position-absolute bg-dark text-light-grey box-shadow mb-4 bd-radius-5" style="width:420px;z-index:1000">
                                            <div class="w-100 text-right pt-3 pr-3">
                                                <button @click="app.details = false" class="btn text-white material-icons bd-round bg-light-grey text-md bd-radius-5 p-2">clear</button>
                                            </div>
                                            <div class="pl-4 pr-4 pb-4">
                                                <h4 class="font-weight-normal text-white">Allergies</h4>
                                                <p class="text-sm bd-bottom pb-3 mb-2">{{ app.allergies }}</p>
                                                <h4 class="font-weight-normal text-white">Disease History</h4>
                                                <p class="text-sm bd-bottom pb-3 mb-2">{{ app.disease_history }}</p>
                                                <h4 class="font-weight-normal text-white">Family History About Disease</h4>
                                                <p class="text-sm pb-3">{{ app.family_history }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="p-2 bd-bottom pb-4 pt-4">
                                    <button v-if="app.status == 'REJECTED'" class="btn bg-light-grey bd-round px-4 shadow text-danger">Rejected</button>
                                    <button v-else-if="app.status == 'APPROVED'" class="btn bg-light-grey bd-round px-4 shadow text-success">Approved</button>
                                    <button v-else-if="app.status == 'PENDING'" class="btn bg-light-grey bd-round px-4 shadow text-info">Pending</button>
                                </td>
                                <td class="p-2 bd-bottom py-4">
                                    <button @click="deleteAppointment(app)" class="btn mdi mdi-close"></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        <div class="w-100 p-5 text-center" v-else-if="loading && appointments.length == 0">
            <p class="p-5 text-sm text-center">
                <span class="spinner-border spinner-border-sm mr-2 text-info"></span> Loading...
            </p>
        </div>
        <div class="w-100 p-5 text-center" v-else>
            <p class="w-100 p-5 text-center">No Appointments Yet!</p>
        </div>

    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            tab: 'make_appointment',
            user: {
                username: "Q"
            },
            appointments: [],      
            keywords: null,
            duplicate: [],
            doctor: null,
            mydate: null,
            time: null,
            allergies: null,
            disease_history: null,
            family_history: null,
            age: null,
            weight: null,
            first_name: null, last_name: null,
            doctors: [],
            loading: true          
        }
    },
    methods: {
        deleteAppointment(appointment) {
            this.firebase_remove_one('appointments/'+appointment.key, (res) => {
                let notification = {
                    title: 'Appointment Deleted Successfully',
                    description: 'Your Appointment Has been deleted successfully, try refreshing your page to see the changes.' 
                }
                this.alertnotification(notification, 'success')     
            })            
        },
        makeAnAppointment() {
            let obj = {
                user: this.user,
                fname: this.first_name, lname: this.last_name,
                doctor: this.doctor,
                date: this.mydate,
                time: this.time,
                allergies: this.allergies,
                disease_history: this.disease_history,
                family_history: this.family_history,
                age: this.age,
                weight: this.weight,
                status: "PENDING"
            }

            let alreadyAppointment = this.appointments.filter(appointment => appointment.date == obj.date)

            if (alreadyAppointment.length > 0) {
                let notification = {
                    title: 'Already Have an Appointment',
                    description: `Dr. <strong>${this.doctor.username}</strong> already have an appointment on this day, try selecting another day and time, Thank you!` 
                }
                this.alertnotification(notification, 'danger')               

                return
            }
            this.firebase_push_db({ ref: 'appointments', obj }, (res) => {
                let notification = {
                    title: 'Appointment Made Successfully',
                    description: `Your Appointment has been made with Dr. <strong>${this.doctor.username}</strong>. The Doctor will respond to you via email soon.` 
                }
                this.alertnotification(notification, 'success')               
                this.appointments.push(obj)
     
            })             
        },
        highlight(str) {
            return 'Dr. ' + str.username.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            if(!this.keywords) {
                this.doctors = []
                return
            }
            let $this = this
            this.doctors = this.duplicate.filter(function(el) {
                return el.username.includes($this.keywords)
            })
        },
        init() {
            if(this.getCookie("mywebsite.registration")) {
                let u = this.getCookie("mywebsite.registration") 
                    if(u.username) {
                        this.firebase_get_one('users/'+u.uid, (res) => {
                            this.user = res
                            console.log(this.user, 'my users...')
                        })
                    }            
            }
            this.firebase_get("users", (res) => {
                if(res) {
                    for(let i=0; i<res.length; i++) {
                        let doctor = res[i]
                        if(doctor.type == "doctor") {
                            this.duplicate.push(doctor)
                        }
                    }
                }
            }) 
            
            if(this.getCookie("mywebsite.registration")) {
                let u = this.getCookie("mywebsite.registration"),
                    { uid } = u
                    this.firebase_get('appointments', (res) => {
                        if(res) {
                            for(let i=0; i<res.length; i++) {
                                let appointment = res[i]
                                if(appointment.user.uid == uid) {
                                    this.appointments.push({...appointment, details: false })
                                }
                            }
                            this.loading = false
                            console.log(this.appointments, 'my appointments')
                        }
                    })
            }        

        }
    },
    mounted() {
        this.init()
    }    
}
</script>

<style>

</style>