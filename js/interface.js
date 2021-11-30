let init = () => {
    let ctx_temperature = document.getElementById("temperature_canvas").getContext('2d');
    let ctx_heart1_rate = document.getElementById("heart_rate1_canvas").getContext('2d');
    let ctx_humidity= document.getElementById("humidity_canvas").getContext('2d');
    let ctx_heart2_rate = document.getElementById("heart_rate2_canvas").getContext('2d');
    let ctx_speed = document.getElementById("speed_canvas").getContext('2d');
    let ctx_mpu = document.getElementById("mpu_canvas").getContext('2d');
    let title_size = 40
    window.setInterval(updateEverything,1000);



    function updateEverything(){
        var temperature_data, humidity_data, heart_rate1_data, heart_rate2_data, speed_data, 
        roll_data, pitch_data, yaw_data, latitude_data, longitude_data
        fetch('./service/readsensor.php', {
            method: 'GET',
        }).then(
            response => response.json()
        ).then(
            response => {
                temperature_data = response[0][4]
                humidity_data = response[0][5]
                heart_rate1_data = response[0][2]
                heart_rate2_data = response[0][3]
                speed_data = response[0][6]
                roll_data = response[0][7]
                pitch_data = response[0][8]
                yaw_data = response[0][9]
                latitude_data = response[0][10]
                longitude_data = response[0][11]
                let global_time = new Date();
                updateSimpleChart(chart_temperature, "Temperature: "+temperature_data+"°C",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  temperature_data)
                updateSimpleChart(chart_humidity, "Humidity: "+humidity_data+"g/m3",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  humidity_data)
                updateSimpleChart(chart_heart1_rate, "Heart Rate1: "+heart_rate1_data+"BPM",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  heart_rate1_data)
                updateSimpleChart(chart_heart2_rate, "Heart Rate2: "+heart_rate2_data+"BPM",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  heart_rate2_data)
                updateSimpleChart(chart_speed, "Speed: "+speed_data+"km/h",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  speed_data)
                updateMultiChart(chart_mpu, "Roll: "+roll_data+"° Pitch: "+pitch_data+"° Roll: "+yaw_data+"°",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  {0: roll_data, 1: pitch_data,2:yaw_data} )
               
                updateMap(latitude_data, longitude_data)
            }
        ).catch(
            error => console.log(error)
        )

        // var temperature_data = Math.round(Math.random()* (30 - 25) + 25)
        // var humidity_data = Math.round(Math.random()* (80 - 70) + 70)
        // var heart_rate1_data = Math.round(Math.random()* (130 - 70) + 70)
        // var heart_rate2_data = Math.round(Math.random()* (130 - 70) + 70)
        // var speed_data = Math.round(Math.random()* (26 - 0) + 0)
        // var roll_data = Math.round(Math.random()* (180 - 0) + 0)
        // var pitch_data = Math.round(Math.random()* (180 - 0) + 0)
        // var yaw_data = Math.round(Math.random()* (180 - 0) + 0)
        // latitude_data += Math.random()/10000
        // longitude_data += Math.random()/10000

     
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
                label: "Roll",
                data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(0,150,200,.33)', // Add custom color border (Line)
                backgroundColor: 'rgba(0,200,0,.33)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            },{
                label: "Pitch",
                data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
                fill: true,
                borderColor: 'rgba(100,150,200,.33)', // Add custom color border (Line)
                backgroundColor: 'rgba(100,200,0,.33)', // Add custom color background (Points and Fill)
                borderWidth: 2 // Specify bar border width
            },{
                label: "Yaw",
                data: [0,0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
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
                    display: true,
                    labels: {
                        color: 'rgba(0,0,0,1)'
                    }
                   
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

    var done_map_view = false
    var map, marker
    function updateMap(latitude, longitude){
        if (!done_map_view){
            if(temp_lat != null && temp_lon != null){
                map = L.map('map').setView([temp_lat,temp_lon], 19);
                var greenIcon = L.icon({
                    iconUrl: 'source/rover.jpg',
                    iconSize:     [38, 95], // size of the icon
                    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
                    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
                });
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    maxZoom: 18,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoiYTAxNDIyNTI0IiwiYSI6ImNrd2xlb3llcDIweHMydW1wc3B0anE3Z2gifQ.DS0R3LyBlPpgQNZ8zKr_BA'
                }).addTo(map);
                marker = L.marker([temp_lat,temp_lon], {icon: greenIcon}).addTo(map);
                done_map_view = true
            }
           
        }else{
            marker.setLatLng([latitude, longitude]).update();  // Updates your defined marker position
        }
    }  
    /* FOR THE NEXT FEW LINES: IMPLEMENTATION JUST FOR SIMULATION PURPOSES, THIS IS COMMING FROM A GPS SENSOR*/
    navigator.geolocation.getCurrentPosition((pos)=>{
        var crd = pos.coords;
        console.log('Latitude : ' + crd.latitude);
        console.log('Longitude: ' + crd.longitude);
        temp_lat = crd.latitude
        temp_lon = crd.longitude
    }, (err)=>{
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }, {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 0
    });
    /* ====================================================================================================== */ 
  
   
}
window.addEventListener('DOMContentLoaded', init)
