DROP DATABASE IF EXISTS rover2022;
CREATE DATABASE rover2022;
USE rover2022;



CREATE TABLE watch(
	id INT AUTO_INCREMENT PRIMARY KEY,
    time timestamp,
    heart_rate1 INT,
    heart_rate2 INT
    
    
);


CREATE TABLE rover(
	id INT AUTO_INCREMENT PRIMARY KEY,
    time timestamp,
    temperature INT,
    humidity INT,
    speed INT,
    roll INT,
    pitch INT,
    yaw INT,
    latitude FLOAT,
    longitude FLOAT
    
    
);


CREATE TABLE allsensors(
	id INT AUTO_INCREMENT PRIMARY KEY,
    time timestamp,
	heart_rate1 INT,
    heart_rate2 INT,
	temperature INT,
    humidity INT,
    speed INT,
    roll INT,
    pitch INT,
    yaw INT,
    latitude FLOAT,
    longitude FLOAT
    
);


