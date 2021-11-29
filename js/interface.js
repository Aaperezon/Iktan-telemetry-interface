let init = () => {
    let ctx_temperature = document.getElementById("temperature_canvas").getContext('2d');
    let ctx_heart1_rate = document.getElementById("heart_rate1_canvas").getContext('2d');
    let ctx_humidity= document.getElementById("humidity_canvas").getContext('2d');
    let ctx_heart2_rate = document.getElementById("heart_rate2_canvas").getContext('2d');
    let ctx_speed = document.getElementById("speed_canvas").getContext('2d');
    let ctx_mpu = document.getElementById("mpu_canvas").getContext('2d');
    let title_size = 40
    window.setInterval(updateCharts,1000);
    function updateCharts(){
        let global_time = new Date();
        var temporal_data1 = Math.round(Math.random()* (30 - 25) + 25)
        updateSimpleChart(chart_temperature, "Temperature: "+temporal_data1+"°C",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  temporal_data1)
        var temporal_data2 = Math.round(Math.random()* (80 - 70) + 70)
        updateSimpleChart(chart_humidity, "Humidity: "+temporal_data2+"",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  temporal_data2)
        var temporal_data3 = Math.round(Math.random()* (130 - 70) + 70)
        updateSimpleChart(chart_heart1_rate, "Heart Rate1: "+temporal_data3+"BPM",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  temporal_data3)
        var temporal_data4 = Math.round(Math.random()* (130 - 70) + 70)
        updateSimpleChart(chart_heart2_rate, "Heart Rate2: "+temporal_data4+"BPM",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  temporal_data4)
        var temporal_data5 = Math.round(Math.random()* (26 - 0) + 0)
        updateSimpleChart(chart_speed, "Speed: "+temporal_data5+"Km/h",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  temporal_data5)
        
        var temporal_data6 = Math.round(Math.random()* (180 - 0) + 0)
        var temporal_data7 = Math.round(Math.random()* (180 - 0) + 0)
        var temporal_data8 = Math.round(Math.random()* (180 - 0) + 0)
        updateMultiChart(chart_mpu, "Roll: "+temporal_data6+"° Pitch: "+temporal_data7+"° Roll: "+temporal_data8+"°",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  {0: temporal_data6, 1: temporal_data7,2:temporal_data8} )

    }
    function updateMultiChart(chart, title, label, data) {
        chart.options.plugins.title.text = title;

        chart.data.labels.push(label);
        (chart.data.datasets).forEach((dataset,index) => {
            dataset.data.push(data[index]);

        });
        chart.data.labels.shift();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
        chart.update();
    }1
    function updateSimpleChart(chart, title, label, data) {
        chart.options.plugins.title.text = title;

        chart.data.labels.push(label);
        chart.data.datasets.forEach((dataset) => {
            dataset.data.push(data);
        });
        chart.data.labels.shift();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.shift();
        });
        chart.update();
    }


    let chart_temperature = new Chart(ctx_temperature, {
        type: 'line',
        data: {
            
            labels: ["0","0","0","0","0","0","0","0","0","0"],
            datasets: [{
                data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(0,150,200,1)', // Add custom color border (Line)
                backgroundColor: 'rgba(0,200,0,1)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            }]},
        options: {
            plugins: {
                title: {
                    display: true,
                    font:{
                        size: title_size,
                    },
                    color: 'rgba(0,183,255,1)',
                    text: 'Temperature',
                },
                legend: {
                    display: false
                }
            },
            // responsive: true, 
            maintainAspectRatio: false, 
            animations: false,
            scales: {
                y: { 
                  min: 20,
                  max: 40
                }
            }
        },
       
    });

    var chart_heart1_rate = new Chart(ctx_heart1_rate, {
        type: 'line',
        data: {
            
            labels: ["0","0","0","0","0","0","0","0","0","0"],
            datasets: [{
                data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(0,150,200,1)', // Add custom color border (Line)
                backgroundColor: 'rgba(0,200,0,1)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            }]},
        options: {
            plugins: {
                title: {
                    display: true,
                    font:{
                        size: title_size
                    },
                    color: 'rgba(0,183,255,1)',
                    text: 'Heart Rate1',
                },
                legend: {
                    display: false
                }
            },
            // responsive: true, 
            maintainAspectRatio: false, 
            animations: false,
            scales: {
                y: { 
                  min: 65,
                  max: 135
                }
            }
        },
       
    });
    var chart_humidity= new Chart(ctx_humidity, {
        type: 'line',
        data: {
            
            labels: ["0","0","0","0","0","0","0","0","0","0"],
            datasets: [{
                data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(0,150,200,1)', // Add custom color border (Line)
                backgroundColor: 'rgba(0,200,0,1)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            }]},
        options: {
            plugins: {
                title: {
                    display: true,
                    font:{
                        size: title_size
                    },
                    color: 'rgba(0,183,255,1)',
                    text: 'Humidity',
                },
                legend: {
                    display: false
                }
            },
            // responsive: true, 
            maintainAspectRatio: false, 
            animations: false,
            scales: {
                y: { 
                  min: 20,
                  max: 100
                }
            }
        },
       
    });
    var chart_heart2_rate = new Chart(ctx_heart2_rate, {
        type: 'line',
        data: {
            
            labels: ["0","0","0","0","0","0","0","0","0","0"],
            datasets: [{
                data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(0,150,200,1)', // Add custom color border (Line)
                backgroundColor: 'rgba(0,200,0,1)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            }]},
        options: {
            plugins: {
                title: {
                    display: true,
                    font:{
                        size: title_size
                    },
                    color: 'rgba(0,183,255,1)',
                    text: 'Heart Rate2',
                },
                legend: {
                    display: false
                }
            },
            // responsive: true, 
            maintainAspectRatio: false, 
            animations: false,
            scales: {
                y: { 
                  min: 65,
                  max: 135
                }
            }
        },
       
    });
    var chart_speed = new Chart(ctx_speed, {
        type: 'line',
        data: {
            
            labels: ["0","0","0","0","0","0","0","0","0","0"],
            datasets: [{
                data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(0,150,200,1)', // Add custom color border (Line)
                backgroundColor: 'rgba(0,200,0,1)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            }]},
        options: {
            plugins: {
                title: {
                    display: true,
                    font:{
                        size: title_size
                    },
                    color: 'rgba(0,183,255,1)',
                    text: 'Speed',
                },
                legend: {
                    display: false
                }
            },
            // responsive: true, 
            maintainAspectRatio: false, 
            animations: false,
            scales: {
                y: { 
                  min: 0,
                  max: 26
                }
            }
        },
       
    });
    var chart_mpu = new Chart(ctx_mpu, {
        type: 'line',
        data: {
            labels: ["0","0","0","0","0","0","0","0","0","0"],
            datasets: 
            [{
                data: [50,	0,	0,	0,	0,	0,	0,	10,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(0,150,200,.33)', // Add custom color border (Line)
                backgroundColor: 'rgba(0,200,0,.33)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            },{
                data: [0,	0,	0,	10,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(100,150,200,.33)', // Add custom color border (Line)
                backgroundColor: 'rgba(100,200,0,.33)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            },{
                data: [0,	30,	0,	10,	0,	0,	30,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(200,150,200,.33)', // Add custom color border (Line)
                backgroundColor: 'rgba(200,200,0,.33)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    font:{
                        size: title_size
                    },
                    color: 'rgba(0,183,255,1)',
                    text: 'Roll Pitch Yaw',
                },
                legend: {
                    display: false
                }
            },
            // responsive: true, 
            maintainAspectRatio: false, 
            animations: false,
            scales: {
                y: { 
                  min: 0,
                  max: 180
                }
            }
        },
       
    });


}
addEventListener("DOMContentLoaded", init)
