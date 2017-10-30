<?php

/**
 * Created by PhpStorm.
 * User: chou6
 * Date: 2017-08-16
 * Time: 오후 5:17
 */
class Check
{
    function check_input($name, $pwd){
        if(!preg_match('/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/',$name)){
            echo "email";
            return false;
        }
        else if(!preg_match('/^(?=.*[0-9])(?=.*[a-z])(?=.*[!@#$%^&+=])(?=\S+$).{8,}$/',$pwd)){
            echo "password";
            return false;
        }
        return true;
    }
    function check_id($name){
        if(!preg_match('/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(\.[a-zA-Z]+)*$/',$name)){
            echo "email";
            return false;
        }
        return true;
    }
    function check_hash($hash){
        if(preg_match('/^(?=.*[0-9])(?=.*[a-z]).{16}$/',$hash)){
            return true;
        }
        else{
            return false;
        }
    }


}