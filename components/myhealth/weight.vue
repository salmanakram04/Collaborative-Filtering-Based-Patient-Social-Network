<template>
<div class="container">
    <div class="d-flex justify-content-between align-items-center">
        <h2 class="font-weight-normal">
            {{ kg ? 'Has your Weight changed?' : 'Enter your First Weight.'}}
        </h2>
        <div class="position-relative">
            <button class="btn btn-info text-white bd-radius-5 box-shadow pl-4 pr-4" @click="weightPopup = true"> 
                {{ kg ? 'Update' : 'Add'}}
                Your Weight</button>
            <div  v-if="weightPopup" class="position-absolute bg-white box-shadow" style="right:0px;z-index:10000;width:350px;">
                <button @click="weightPopup = false" class="btn material-icons btn-block text-right text-md bd-radius-5 p-3">clear</button>
                <div class="p-4">
                    <p class="text-sm">Weight <strong>(Kg)</strong></p>
                    <div class="form-group">
                        <input type="number" class="form-control" v-model="kg">
                    </div>                    
                    <p class="text-sm">Date</p>
                    <p class="small">Enter your best estimate of the year, month and day if you can’t remember the exact date.</p>
                    <div class="d-flex">
                        <select class="custom-select mr-2" v-model="year">
                            <option value="">Year</option>
                            <option :value="y" v-for="(y, i) in years" :key="i">{{y}}</option>
                        </select>                        
                        <select class="custom-select mr-2" v-model="month">
                            <option value="">Month</option>
                            <option :value="m" v-for="(m, i) in months" :key="i">{{m}}</option>
                        </select>                        
                        <select class="custom-select" v-model="day">
                            <option value="">Day</option>
                            <option :value="d" v-for="(d, i) in days" :key="i">{{d}}</option>
                        </select>                        
                    </div>
                    <p class="text-sm mt-5">Height <strong>(cm)</strong></p>
                    <div class="form-group">
                        <input type="number" class="form-control" v-model="height">
                    </div>                    
                    <div class="mt-4 w-100 text-right">
                        <button @click="saveInformation(), weightPopup = false" class="btn btn-info box-shadow bd-round pl-4 pr-4" :disabled="!day || !month || !year || !kg || !height">Save</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <p>Your Weight can fluctuate as a result of your condition or treatment side effects. Seeing these changes over time can give you insight into your overall health.</p>
    <div class="p-5 mt-5 box-shadow bg-white bd-radius-5">
        <p>Showing Aug 15, 2020 - Oct 28, 2020</p>
        <div class="shadow">
            <!--       Chart.js Canvas Tag -->
            <canvas id="multiLineChart"></canvas>
        </div>        
        <div class="d-flex">
            <table class="w-75 flex-shrink-0">
                <thead>
                    <td class="w-25"></td>
                    <td class="bg-light-grey  w-25"></td>
                    <td class="bg-light-grey p-2 small w-25">Sep 2020</td>
                    <td class="bg-light-grey p-2 small w-50">Oct</td>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ul>
                                <li class="text-sm">Weight (kg)</li>
                            </ul>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="bd-left text-sm p-2">{{parseInt(height) + 60}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="bd-left text-sm p-2">{{parseInt(height) + 40}}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td class="bd-left text-sm p-2">{{parseInt(height) + 20}}</td>
                    </tr>
                    <tr>
                        <td class="bd-right"></td>
                        <td class="bd-left text-sm p-2 bd-bottom">{{height}}</td>
                        <td class="bd-bottom"></td>
                        <td class="bd-bottom"></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            <p class="small w-25 align-self-end flex-shrink-0" v-if="kg">
                Latest Result
                <br>
                <strong>{{kg}} kg</strong>
                <br>
                <strong>{{month}} {{day}}, {{year}}</strong>
            </p>
        </div>
        <div class="bd-top pt-4 mt-4">
            <h2>More about Height and Weight</h2>
            <p>Your height and weight are currently displayed using centimeters and kilograms. You can change your display preferences in account settings.</p>
            <br>
            <p>If you enter your height in addition to your weight, we can calculate and track your BMI. Yes, I'd like to enter my height.</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            kg: null,
            allKg: [],
            height: null,
            day: null,
            allDay: [],
            month: null,
            year: null,
            weightPopup: false,
            days: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            months: ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            years: [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020],
            myears: [2016, 2017, 2018, 2019, 2020],
            user: {
                username: "Q"
            },
            condition: [], duplicate: [],
            keywords: null          
        }
    },
    methods: {
        saveInformation() {
            if (this.allKg.constructor === Array) {

                this.allKg.push(this.kg)

            } else {
                this.allKg = [ this.kg ]
            }

            if (this.allDay.constructor === Array) {
                this.allDay.push(this.day)

            } else {
                this.allDay = [ this.day ]
            }

            let obj = {
                kg: this.allKg,
                height: this.height,
                day: this.allDay,
                year: this.year,
                month: this.month
            },            
            { uid } = this.user
            
            this.firebase_put_db({ ref: 'users/'+uid, child: 'weight', obj }, (res) => {
                this.alertmsg("Weight Updated Successfully", "success")
            })
        },
        addCondition(condition) {
            let myConditions = this.user.conditions || [],
                { uid } = this.user
            
            if(!myConditions.includes(condition)) {
                myConditions.push(condition)
            }
            else {
                this.alertmsg("Condition Already Added", "info")
                return
            }

            this.firebase_put_db({ ref: 'users/'+uid, child: 'conditions', obj: myConditions }, (res) => {
                this.alertmsg("Condition Added Successfully", "success")
            })            
        },
        highlight(str) {
            return str.split(this.keywords).join("<mark>"+this.keywords+"</mark>")
        },
        search() {
            if(!this.keywords) {
                this.condition = []
                return
            }
            let $this = this
            this.condition = this.duplicate.filter(function(el) {
                return el.includes($this.keywords)
            })
        }
    },
    mounted() {
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.user = res
                        if(this.user.weight) {
                            let { kg, day, height, year, month } = this.user.weight
                            this.allKg = kg
                            this.allDay = day
                            this.day = day
                            this.height = height
                            this.year = year
                            this.month = month
                            
                            if (this.allDay.constructor !== Array) {
                                this.allDay = [day]
                            }

                            if (this.allKg.constructor !== Array) {
                                this.allKg = [kg]
                            }
                            // console.log(weight, 'weight...')
                            this.createCrossChart({
                                labels: this.allDay,
                                datasets: [{
                                    label: "Weight",
                                    data: this.allKg,
                                    borderColor: "#e53935",
                                    // backgroundColor: "rgba(183, 28, 28, 0.5)"
                                }, 
                                ]
                            }, true)        


                        }
                        console.log(this.user.weight, 'weight')
                    })
                }            
        }


              
    }    
}
</script>

<style>

</style>