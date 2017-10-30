<?php

/**
 * Created by PhpStorm.
 * User: chou6
 * Date: 2017-08-17
 * Time: 오후 12:04
 */
class Activation
{
    function activate($code){
        $servername = "35.200.55.14";
        $username = "root";
        $password = "diamond!";
        try{
            $conn = new PDO("mysql:host=$servername;dbname=hycube", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $stmt = $conn->prepare("SELECT email FROM activation where code = :code");
            $stmt->execute(array(':code' => $code));
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($result){
                $email = $result[0]["email"];
                $stmt = $conn->prepare("DELETE FROM activation WHERE code=:code");
                $stmt->execute(array(':code' => $code));
                $stmt = $conn->prepare("UPDATE student SET enabled=1 WHERE username=:email");
                $stmt->execute(array(':email' => $email));
            }else{
                return "오류 : 해당 해쉬값이 존재하지 않습니다. : ".$code;
            }
        }
        catch (PDOException $e){
            return "doPdo failed: " . $e->getMessage();
        }
        return "success";
    }
}