<?php 
    $servername = "10.49.182.166";
    $username = "root";
    $password = "root";
    $dbname = "rover2022";

    try {
        $pdo = new PDO('mysql:host='.$servername.';dbname='.$dbname, $username, $password);

        // set the PDO error mode to exception
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e)
    {
        $pdo = null;
    }     
?>
