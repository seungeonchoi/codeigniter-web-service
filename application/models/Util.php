<?php

/**
 * Created by PhpStorm.
 * User: chou6
 * Date: 2017-08-16
 * Time: 오후 5:30
 */
class Util
{
    function hash(){
        return substr(md5(uniqid(rand(), true)), 16, 16);
    }
}