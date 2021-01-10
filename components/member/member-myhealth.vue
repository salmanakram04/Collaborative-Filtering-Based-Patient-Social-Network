<template>
<div class="container">
    <div class="row mt-4">
        <div class="col-md-3 bg-white box-shadow border p-0 pt-4 pb-4 align-self-start">
            <button @click="active=item.title" class="btn transition btn-block text-left hov p-3 mb-0 mt-0" v-for="(item, i) in links" :key="i" :class="item.title == active ? 'bd-left-blue bg-light text-lg' : ''">
                {{item.title}}
            </button>
        </div>
        <div class="col-md-9">
            <my-health v-if="active == 'About me'" />
            <conditions v-if="active == 'My Conditions'" />
            <symptoms v-if="active == 'My Symptoms'" />
            <treatments v-if="active == 'My Treatments'" />
            <weight v-if="active == 'Weight'" />
            <charts v-if="active == 'My Charts'" />
            <test-reports v-if="active == 'Test Reports'" />
        </div>
    </div>
</div>
</template>

<script>
import myhealth from '@/components/myhealth/aboutme.vue'
import conditions from '@/components/myhealth/conditions.vue'
import symptoms from '@/components/myhealth/symptoms.vue'
import treatments from '@/components/myhealth/treatments.vue'
import weight from '@/components/myhealth/weight.vue'
import charts from '@/components/myhealth/charts.vue'
import testReports from '@/components/myhealth/test-reports.vue'
export default {
    components: {
        "my-health": myhealth,
        "conditions": conditions,
        "symptoms": symptoms,
        "treatments": treatments,
        "test-reports": testReports,
        weight, charts
    },
    data() {
        return {
            active: "About me",
            links: [
                { title: "About me"},
                { title: "Test Reports"},
                { title: "My Charts"},
                { title: "My Conditions"},
                { title: "My Symptoms"},
                { title: "My Treatments"},
                { title: "Weight"},
            ]
        }
    }
}
</script>

<style>

</style>