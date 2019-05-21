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
            return true;
        }
        catch(Exception $e)
        {
            echo "doPdo failed: " . $e->getMessage();
            return false;
        }

    }
    public function update_activation_code($name,$hash){
        try{

            $sql= "SELECT username, enabled FROM student where username = ?";
            $stmt = $this->db->query($sql, array($name));
            if($stmt->num_rows()>0){
                $row = $stmt->row();
                if($row->enabled==1){
                    echo "email_registered\n";
                    return false;
                }else{
                    $sql= "UPDATE activation SET code = ? WHERE email = ?";
                    $this->db->query($sql, array($hash,$name));
                    return true;
                }
            }else{
                echo "no_email\n";
                return false;
            }
        }catch(Exception $e)
        {
            echo "doPdo failed: " . $e->getMessage();
            return false;
        }
    }

    public function select($name, $pwd){
        try{

            $sql = "SELECT username, enabled FROM student where username = ? and password = ?";
            $stmt = $this->db->query($sql,array($name,$pwd));
            if($stmt->num_rows()>0){
                $row = $stmt->row();
                $_SESSION["username"] = $row->username;
                $_SESSION["enabled"] = $row->enabled;
            }else{
                echo "no";
                return false;
            }

        }catch(Exception $e)
        {
            echo "doPdo failed: " . $e->getMessage();
            return false;
        }
        return true;
    }
}