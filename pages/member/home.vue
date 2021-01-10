<template>
<div>
    <site-header @tab="tab_changed($event)" @makeAppointment="appointmentTaken($event)" />
    <member-home v-if="tab=='HOME'" />
    <member-myhealth v-else-if="tab=='MYHEALTH'" />
    <member-conditions v-if="tab=='CONDITIONS'" />
    <member-treatment v-else-if="tab=='TREATMENTS'" />
    <member-symptoms v-else-if="tab=='SYMPTOMS'" />
    <make-appointment v-else-if="tab=='APPOINTMENTS'" />
    <appointments v-else-if="tab=='MY APPOINTMENTS'" />
    <member-medicine v-else-if="tab=='MEDICINE'" />
    <conversations v-else-if="tab=='CONVERSATION'" :appointment="otherData" />
    <site-footer />
</div>
</template>

<script>
import site_header from '@/components/website/member-header.vue'
import site_footer from '@/components/website/footer.vue'
import member_conditions from '@/components/member/member-conditions.vue'
import member_treatment from '@/components/member/member-treatment.vue'
import member_symptoms from '@/components/member/member-symptoms.vue'
import member_home from '@/components/member/member-home.vue'
import member_myhealth from '@/components/member/member-myhealth.vue'
import make_appointment from '@/components/member/make-appointment.vue'
import appointments from '@/components/member/appointments.vue'
import conversations from '@/components/member/conversations.vue'
import MemberMedicine from '../../components/member/member-medicine.vue'

export default {
    layout: "member",
    components: {
        "site-header": site_header,
        "member-conditions": member_conditions,
        "site-footer": site_footer,
        "member-treatment": member_treatment,
        "member-symptoms": member_symptoms,
        "member-home": member_home,
        "member-myhealth": member_myhealth,
        "make-appointment": make_appointment,
        "appointments": appointments,
        conversations,
        MemberMedicine
    },
    data() {
   
        return {
            tab: 'HOME',
            otherData: null
        }
    },
    methods: {
        tab_changed(tab) {
            this.tab = tab
        },
        appointmentTaken(data) {
            this.otherData = data
        }
    }
}
</script>

<style>

</style>