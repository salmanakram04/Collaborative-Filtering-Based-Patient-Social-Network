<template>
<div class="container">
    <div v-if="appointments.length > 0 && !loading">
        <h2 class="font-weight-normal pt-4">My Appointments</h2>
        <p>Here is a list of all Appointments that patients has made with you. You can start conversation with these patients by clicking on the chat button</p>
        <div class="box-shadow bg-white bd-radius-5">
            <div class="w-100 mt-5 p-5" v-if="appointments.length > 0">
                <table class="w-100">
                    <thead>
                        <th class="text-sm bd-bottom pb-2">Full Name</th>
                        <th class="text-sm bd-bottom pb-2">Date & Time</th>
                        <th class="text-sm bd-bottom pb-2">Weight</th>
                        <th class="text-sm bd-bottom pb-2">Age</th>
                        <th class="text-sm bd-bottom pb-2" colspan="3"></th>
                    </thead>
                    <tbody>
                        <tr v-for="(app, i) in appointments" :key="i">
                            <td class="p-2 bd-bottom pb-4 pt-4">
                                <p class="d-flex align-items-center text-info font-weight-bold mb-0">
                                    <span class="text-md">{{ app.fname + " " + app.lname }}</span> 
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
                                <div v-if="app.status == 'PENDING'">
                                    <button @click="app.status = 'APPROVED', updateAppointmentStatus(app)" class="btn btn-success mx-2 text-white box-shadow pl-4 pr-4 pt-2 pb-2">Approve</button>
                                    <button @click="app.status = 'REJECTED', updateAppointmentStatus(app)" class="btn btn-danger mx-2 text-white box-shadow pl-4 pr-4 pt-2 pb-2">Reject</button>
                                                        
                                </div>
                                <p v-else-if="app.status == 'REJECTED'" class="text-danger font-weight-bold">Rejected</p>
                                <div v-else>
                                    <button @click="message(app)" class="btn btn-warning text-white box-shadow pl-4 pr-4 pt-2 pb-2">Message</button>
                                </div>
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
</template>

<script>
import { EventBus } from '@/globals/event-bus.js'
export default {
    data() {
        return {
            user: {
                username: "Q"
            },
            loading: true,
            duplicate: [],
            keywords: null,
            treatments: [],
            appointments: []      
        }
    },
    methods: {
        deleteAppointment(appointment) {
            let ref = 'appointments/' + appointment.key,
                object = appointment

            object.doctor.key = null
            this.firebase_update({ ref, object}, (res) => {
                let notification = {
                    title: 'Appointment is been Deleted',
                    description: 'Appointment is been Deleted Successfully, Try refreshing the page to see the changes.' 
                }
                this.alertnotification(notification, 'success')                    

            })            

        },
        updateAppointmentStatus(appointment) {
            let ref = 'appointments/' + appointment.key,
                object = appointment
            this.firebase_update({ ref, object}, (res) => {
                if(appointment.status == "APPROVED") {
                    let notification = {
                        title: 'Appointment is been Updated',
                        description: 'Appointment is been made Successfully, Try refreshing the page to see the changes.' 
                    }
                    this.alertnotification(notification, 'success')                    

                } else {
                    let notification = {
                        title: 'Appointment is been Rejected',
                        description: 'Appointment is Rejected, Try refreshing the page to see the changes.' 
                    }                    
                    this.alertnotification(notification, 'danger')                    

                }
            })            
        },
        message(appointment) {
            EventBus.$emit('appointment', appointment)
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration"),
                { uid } = u
                this.firebase_get('appointments', (res) => {
                    if(res) {
                        for(let i=0; i<res.length; i++) {
                            let appointment = res[i]
                            if(appointment.doctor.key == uid) {
                                this.appointments.push({...appointment, details: false })
                            }
                        }
                        this.loading = false
                        console.log(this.appointments, 'my appointments')
                    }
                })
        }
    }    
}
</script>

<style>

</style>
