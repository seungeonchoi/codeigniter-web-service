<?php

/**
 * Created by PhpStorm.
 * User: chou6
 * Date: 2017-08-15
 * Time: 오후 3:35
 */
class Main extends CI_Controller {

    public function index()
    {
        $this->load->view('home');
    }
    public function register(){
        $name = $_POST["username"];
        $pwd = $_POST["password"];
        $this->load->model("Util");
        $this->load->model("Check");
        $this->load->model("Student");
        $hash = $this->Util->hash();
        $pass = $this->Check->check_input($name,$pwd);
        if(!$pass){
            return false;
        }
        $pass = $this->Student->insert($name, $pwd, $hash);
        if(!$pass){
            return false;
        }
        $this->load->library('hycubemail');
        $pass = $this->hycubemail->send($name, $hash);
        if(!$pass){
            return false;
        }
        echo "success";

    }
    public function login()
    {
        session_start();
        $name = $_POST["username"];
        $pwd = $_POST["password"];
        $this->load->model("Check");
        $this->load->model("Student");
        $pass = $this->Check->check_input($name,$pwd);
        if(!$pass){
            return false;
        }
        $pass = $this->Student->select($name, $pwd);
        if(!$pass){
            return false;
        }
        echo "success";
    }
    public function logout(){
        session_start();
        session_destroy();
        echo "success";
        exit();
    }
    public function activate(){
        $hash = $this->uri->segment('3');
        $this->load->model("Check");
        $this->load->model("Activation");
        if($this->Check->check_hash($hash)){
            $str = $this->Activation->activate($hash);
            $data['code'] = $str;
            $this->load->view("activation",$data);
        }else{
            $data['code'] = $hash;
            $this->load->view("activation",$data);
        }

    }
    public function send(){
        $this->load->model("Check");
        $this->load->model("Util");
        $this->load->model("Student");
        $name = $_POST["username"];
        $hash = $this->Util->hash();
        if($this->Check->check_id($name)){

            $pass=$this->Student->update_activation_code($name,$hash);
            if(!$pass){
                echo "email_registered or no mail exists";
                return false;;
            }
            $this->load->library('hycubemail');
            $pass = $this->hycubemail->send($name, $hash);
            if(!$pass){
                echo "send_error";
                return false;;
            }

        }else{
            echo "input_error";
            return false;
        }
        echo "success";
        return true;
    }
    public function notepad(){
        $this->load->view("notepad");
    }
    public function regex(){
        $name = "aaba@aa.aa.a!a";
        $str = "1a2a3a4a5a6a7a8";
        if(preg_match('/^(?=.*[0-9])(?=.*[a-z]).{15}$/',$str)){
            echo "hash";
        };
        if(!preg_match('/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/',$name)){
            echo "1";

        }

        if(!preg_match('/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\./',$name)){
            echo "2";

        }
        if(!preg_match('/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+/',$name)){
            echo "3";

        }
        if(!preg_match('/^[a-zA-Z0-9_.+-]+@/',$name)){
            echo "4";

        }
        if(!preg_match('/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/',$name)){
            echo "email";
        }


    }
}