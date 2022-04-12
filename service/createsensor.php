<?php 
    require "connection.php";
    $bindings = [];
    $result=null;
    if($pdo!=null){
        error_log("Connection is not null");
        $parameters = ['vibration1', 'vibration2', 'vibration3', 'vibration4', 'gasCO2', 'humidity', 'pressure', 'altitude', 'temperature', 'roll', 'pitch', 'yaw', 'speed', 'gravity1_x', 'gravity1_y', 'gravity1_z', 'light1', 'heart_rate1'];
        $received = json_decode(file_get_contents('php://input'),true);
        foreach ($parameters as $parameter){
            if(!isset( $received[$parameter]) ){
                $result =  "Parameter '".$parameter."' missing";
                break;
            }else{
                $bindings[] = $received[$parameter];
            }
        }
        if($result==null){
            $sql = 'INSERT INTO sensor( time, vibration1, vibration2, vibration3, vibration4, gasCO2, humidity, pressure, altitude, temperature, roll, pitch, yaw, speed, gravity1_x, gravity1_y, gravity1_z, light1, heart_rate1) VALUES 
                (CURRENT_TIMESTAMP,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
                
            $stmt = $pdo->prepare($sql);
            if($stmt->execute($bindings)){
                $result = "Insertion Success";
            }
            else{
                $result = "Insertion Error";
            }
        }
    }
    else{
        $result = "Connection Error";
    }
    echo json_encode($result);
?>
