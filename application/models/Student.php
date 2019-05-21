<?php

/**
 * Created by PhpStorm.
 * User: chou6
 * Date: 2017-08-16
 * Time: 오후 3:30
 */
class Student extends CI_Model
{
    function __construct() {
        parent::__construct();
    }
    function insert($name, $pwd, $random_hash){

        try {
            $sql = "SELECT email FROM activation where email = ?";
            $stmt = $this->db->query($sql, array($name));
            if ($stmt->num_rows() > 0)
            {
                echo "email_exists";
                return false;
            }else{
                $sql = "INSERT INTO student (username, password, enabled) VALUES (?, ? ,0)";
                $stmt = $this->db->query($sql, array($name,$pwd));
                $sql = "INSERT INTO activation (email, code) VALUES (?,?)";
                $stmt = $this->db->query($sql, array($name,$random_hash));
            }

            echo "success";
        }
        catch(Exception $e)
        {
            echo "doPdo failed: " . $e->getMessage();
            return false;
        }

    }
    public function update_activation_code($name,$hash){
        $servername = "35.200.55.14";
        $username = "root";
        $password = "diamond!";
        try{
            $conn = new PDO("mysql:host=$servername;dbname=hycube", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

            $stmt = $conn->prepare("SELECT username, enabled FROM student where username = :name");
            $stmt->execute(array(':name' => $name));
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($result){
                if($result[0]["enabled"]==1){
                    echo "email_registered\n";
                    return false;
                }else{
                    $stmt = $conn->prepare("UPDATE activation SET code = :code WHERE email = :name");
                    $stmt->execute(array(':code'=>$hash,':name' => $name));
                }

            }else{
                echo "no_email\n";
                return false;
            }

        }catch(PDOException $e)
        {
            echo "doPdo failed: " . $e->getMessage();
            return false;
        }
        return true;
    }

    public function select($name, $pwd){
        $servername = "35.200.55.14";
        $username = "root";
        $password = "diamond!";
        try{
            $conn = new PDO("mysql:host=$servername;dbname=hycube", $username, $password);
            // set the PDO error mode to exception
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $stmt = $conn->prepare("SELECT username, enabled FROM student where username = :name and password = :pwd");
            $stmt->execute(array(':name' => $name, ':pwd'=>$pwd));
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if($result){
                $_SESSION["username"] = $result[0]["username"];
                $_SESSION["enabled"] = $result[0]["enabled"];
            }else{
                echo "no";
                return false;
            }

        }catch(PDOException $e)
        {
            echo "doPdo failed: " . $e->getMessage();
            return false;
        }
        return true;
    }
}