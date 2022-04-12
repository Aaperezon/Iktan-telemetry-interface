<?php
    $bindings = [];
    $result=null;
    $parameters = ['accelerometer_x', 'accelerometer_y', 'accelerometer_z', 'gravity_x', 'gravity_y', 'gravity_z', 'gyroscope_x', 'gyroscope_y', 'gyroscope_z', 'heart_rate', 'light_level', 'linear_acceleration_x', 'linear_acceleration_y', 'linear_acceleration_z', 'pressure']; echo($_GET);
    // $received = print_r($_GET['accelerometer_x']);


    foreach ($parameters as $parameter){
        if(!isset( $_GET[$parameter]) ){
            $result =  "Parameter '".$parameter."' missing";
            break;
        }else{
            $bindings[] = $_GET[$parameter];
        }
    }

    print_r($bindings);
   
    
    
    
?>



