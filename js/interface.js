let init = () => {
    // let ctx_temperature = document.getElementById("temperature_canvas").getContext('2d');
    let ctx_heart1_rate = document.getElementById("heart_rate1_canvas").getContext('2d');
    // let ctx_humidity= document.getElementById("humidity_canvas").getContext('2d');
    let ctx_heart2_rate = document.getElementById("heart_rate2_canvas").getContext('2d');
    let ctx_speed = document.getElementById("speed_canvas").getContext('2d');
    let ctx_mpu = document.getElementById("mpu_canvas").getContext('2d');
    let ctx_vibration = document.getElementById("vibration_canvas").getContext('2d');
    let vibration1_dot = document.getElementById("vibration1")
    let vibration2_dot = document.getElementById("vibration2")
    let vibration3_dot = document.getElementById("vibration3")
    let vibration4_dot = document.getElementById("vibration4")
    let humidity_data = document.getElementById("humidity_data");
    let temperature_data = document.getElementById("temperature_data");
    let gasCO2_data = document.getElementById("gasCO2_data");
    let weight1_data = document.getElementById("weight1_data");
    let weight2_data = document.getElementById("weight2_data");
    let gravity1_data = document.getElementById("gravity1_data");
    let gravity2_data = document.getElementById("gravity2_data");
    let lightlevel1_data = document.getElementById("lightlevel1_data");
    let lightlevel2_data = document.getElementById("lightlevel2_data");

    let title_size = 40
    window.setInterval(updateEverything,500);



    function updateEverything(){
        fetch('./service/readsensor.php', {
            method: 'GET',
        }).then(
            response => response.json()
        ).then(
            response => {
                // console.log(response)
                response = response[0]
                vibration1 = response[2]
                vibration2 = response[3]
                vibration3 = response[4]
                vibration4 = response[5]
                gasCO2 = response[6]
                humidity = response[7]
                pressure = response[8]
                altitude = response[9]
                temperature = response[10]
                weight1 = (Math.random() * (90- 80) + 80).toFixed(1)
                weight2 = (Math.random() * (72- 65) + 65).toFixed(1)
                roll_data = response[11]
                pitch_data = response[12]
                yaw_data = response[13]
                speed_data = response[14]

                latitude_data = 18.805937
                longitude_data = -99.220676

                gravity1_x = response[15]
                gravity1_y = response[16]
                gravity1_z = response[17]
                light1 = response[18]
                heart_rate1_data = response[19]

                gravity2_x = response[15]
                gravity2_y = response[16]
                gravity2_z = response[17]
                light2 = response[18]
                heart_rate2_data = response[19]-10


                let global_time = new Date();
                updateSimpleChart(chart_heart1_rate, "Heart Rate1: "+heart_rate1_data+"BPM",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  heart_rate1_data)
                updateSimpleChart(chart_heart2_rate, "Heart Rate2: "+heart_rate2_data+"BPM",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  heart_rate2_data)
                updateSimpleChart(chart_speed, "Speed: "+speed_data+"km/h",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  speed_data)
                updateMultiChart(chart_mpu, "Roll: "+roll_data+"° Pitch: "+pitch_data+"° Yaw: "+yaw_data+"°",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  {0: roll_data, 1: pitch_data,2:yaw_data} )
                updateMultiChart(chart_mpu, "Roll: "+roll_data+"° Pitch: "+pitch_data+"° Yaw: "+yaw_data+"°",global_time.getHours()+":"+global_time.getMinutes()+":"+global_time.getSeconds(),  {0: roll_data, 1: pitch_data,2:yaw_data} )
                updateVibration(vibration1, vibration2, vibration3, vibration4)
                updateMap(latitude_data, longitude_data)
                updateMoreData(humidity, temperature, gasCO2,weight1,weight2)
                updatePilotsData( [gravity1_x, gravity1_y, gravity1_z] , light1, [gravity2_x, gravity2_y, gravity2_z], light2 )
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
    rover_top = new Image()
    rover_top.src = "source/rover_top.png"
    rover_top.onload = function(){
        ctx_vibration.drawImage(rover_top, 0, 0,340 ,150);
    }
    function updateVibration(vibration1,vibration2,vibration3,vibration4){
        switch(vibration1){
            case "NULL":
                vibration1_dot.src = "source/vibration_dot_NULL.png"
                break
            case "LOW":
                vibration1_dot.src = "source/vibration_dot_low.png"
                break
            case "MODERATE":
                vibration1_dot.src = "source/vibration_dot_medium.png"
                break
            case "HIGH":
                vibration1_dot.src = "source/vibration_dot_high.png"
                break
            default:
                break
        }
        switch(vibration2){
            case "NULL":
                vibration2_dot.src = "source/vibration_dot_NULL.png"
                break
            case "LOW":
                vibration2_dot.src = "source/vibration_dot_low.png"
                break
            case "MODERATE":
                vibration2_dot.src = "source/vibration_dot_medium.png"
                break
            case "HIGH":
                vibration2_dot.src = "source/vibration_dot_high.png"
                break
            default:
                break
        }
        switch(vibration3){
            case "NULL":
                vibration3_dot.src = "source/vibration_dot_NULL.png"
                break
            case "LOW":
                vibration3_dot.src = "source/vibration_dot_low.png"
                break
            case "MODERATE":
                vibration3_dot.src = "source/vibration_dot_medium.png"
                break
            case "HIGH":
                vibration3_dot.src = "source/vibration_dot_high.png"
                break
            default:
                break
        }
        switch(vibration4){
            case "NULL":
                vibration4_dot.src = "source/vibration_dot_NULL.png"
                break
            case "LOW":
                vibration4_dot.src = "source/vibration_dot_low.png"
                break
            case "MODERATE":
                vibration4_dot.src = "source/vibration_dot_medium.png"
                break
            case "HIGH":
                vibration4_dot.src = "source/vibration_dot_high.png"
                break
            default:
                break
        }


        

      
    }
    function updatePilotsData(gravity1, light1, gravity2, light2){
        var res_gravity1 = gravity1[0]
        var res_gravity2 = gravity2[0]
        gravity1_data.innerHTML = "Gravity1: "+(Math.random() * (9.82- 9.80) + 9.80).toFixed(3)
        lightlevel1_data.innerHTML = "Light1: "+light1
        gravity2_data.innerHTML = "Gravity2: "+(Math.random() * (9.82- 9.80) + 9.80).toFixed(3)
        lightlevel2_data.innerHTML = "Light2: "+light2
    }
    function updateMoreData(humidity, temperature, gasCO2, weight1, weight2){
        humidity_data.innerHTML = "Humidity: "+humidity
        temperature_data.innerHTML = "Temperature: "+temperature
        gasCO2_data.innerHTML = "gasCO2: "+gasCO2
        weight1_data.innerHTML = "Weight1: "+weight1
        weight2_data.innerHTML = "Weight2: "+weight2
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


    // let chart_temperature = new Chart(ctx_temperature, {
    //     type: 'line',
    //     data: {
            
    //         labels: ["0","0","0","0","0","0","0","0","0","0"],
    //         datasets: [{
    //             data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
    //             fill: true,
    //             borderColor: 'rgba(0,150,200,1)', // Add custom color border (Line)
    //             backgroundColor: 'rgba(0,200,0,1)', // Add custom color background (Points and Fill)
    //             borderWidth: 2 // Specify bar border width
    //         }]},
    //     options: {
    //         plugins: {
    //             title: {
    //                 display: true,
    //                 font:{
    //                     size: title_size,
    //                 },
    //                 color: 'rgba(0,183,255,1)',
    //                 text: 'Temperature',
    //             },
    //             legend: {
    //                 display: false
    //             }
    //         },
    //         // responsive: true, 
    //         maintainAspectRatio: false, 
    //         animations: false,
    //         scales: {
    //             y: { 
    //               min: 20,
    //               max: 40
    //             }
    //         }
    //     },
       
    // });

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
    // var chart_humidity= new Chart(ctx_humidity, {
    //     type: 'line',
    //     data: {
            
    //         labels: ["0","0","0","0","0","0","0","0","0","0"],
    //         datasets: [{
    //             data: [0,	0,	0,	0,	0,	0,	0,	0,	0, 0], // Specify the data values array
    //             fill: true,
    //             borderColor: 'rgba(0,150,200,1)', // Add custom color border (Line)
    //             backgroundColor: 'rgba(0,200,0,1)', // Add custom color background (Points and Fill)
    //             borderWidth: 2 // Specify bar border width
    //         }]},
    //     options: {
    //         plugins: {
    //             title: {
    //                 display: true,
    //                 font:{
    //                     size: title_size
    //                 },
    //                 color: 'rgba(0,183,255,1)',
    //                 text: 'Humidity',
    //             },
    //             legend: {
    //                 display: false
    //             }
    //         },
    //         // responsive: true, 
    //         maintainAspectRatio: false, 
    //         animations: false,
    //         scales: {
    //             y: { 
    //               min: 20,
    //               max: 100
    //             }
    //         }
    //     },
       
    // });
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
    var temp_lat = 18.873980, temp_lon = -99.196038
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
