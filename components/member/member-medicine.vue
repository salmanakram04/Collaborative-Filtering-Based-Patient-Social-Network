<template>
    <div class="p-5 mt-5 box-shadow bg-white bd-radius-5 w-75 mx-auto">
        <p v-if="loading" class="p-5 text-center">{{ msg }}</p>
        <figure class="highcharts-figure">
            <div id="container"></div>
            <p class="highcharts-description">
            </p>
        </figure>
    </div>
</template>

<script>
const axios = require("axios")
export default {
    head: {
        script: [    
        ]
    },
    data() {

        return {
            msg: "Loading...",
            loading: true,
            user: {
                username: "Q"
            },         
            conditions: [],
            recommended: []  
        }
    },

    methods: {

        generateChart(recommended) {
                
            Highcharts.chart('container', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Recommended Medicines Based on your Conditions. December, 2020'
                },
                subtitle: {
                    text: ''
                },
                accessibility: {
                    announceNewData: {
                        enabled: true
                    }
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Total Occurance of Symptoms'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },

                tooltip: {
                    headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },

                series: [
                    {
                        name: "Browsers",
                        colorByPoint: true,
                        data: recommended
                    }
                ],
            });

            this.loading = false


        }

    },
    mounted() {
        
        if(this.getCookie("mywebsite.registration")) {
            let u = this.getCookie("mywebsite.registration") 
                if(u.username) {
                    this.firebase_get_one('users/'+u.uid, (res) => {
                        this.user = res

                        if (!this.user.conditions) {

                            this.msg = "You Do not have any conditions"
                            return
                        }

                        this.conditions = this.user.conditions

                        axios.get("https://api.fda.gov/drug/label.json?count=openfda.brand_name.exact&limit=10000")
                        .then(response => {

                            let medicines = response.data.results
                            
                            for (let i=0; i< this.conditions.length; i++) {

                                let condition = this.conditions[i]

                                let recommended = medicines.filter(medicine => condition.toLowerCase().includes(medicine.term.toLowerCase()))

                                if (recommended.length > 0) {

                                    for (let j=0; j<recommended.length; j++) {

                                        let data = {
                                            name: recommended[j].term,
                                            y: recommended[j].count,
                                            drilldown: recommended[j].term
                                        }
                                        this.recommended.push(data)
                                    }
                                }

                            }
                            
                            this.generateChart(this.recommended)

                        })



                    })
                }            
        }

        // Create the chart
        }
}
</script>

<style>
.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}


</style>