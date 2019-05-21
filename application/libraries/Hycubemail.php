<?php
if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * Created by PhpStorm.
 * User: chou6
 * Date: 2017-08-17
 * Time: 오전 9:30
 */
class Hycubemail
{
    function send($name, $random_hash){
        /**
         * This example shows settings to use when sending via Google's Gmail servers.
         */
        define('PATH', dirname(__FILE__));

        //SMTP needs accurate times, and the PHP time zone MUST be set
        //This should be done in your php.ini, but this is how to do it if you don't have access to that
        date_default_timezone_set('Asia/Seoul');

        require "PHPMailer-master/PHPMailerAutoload.php";

        //Create a new PHPMailer instance
        $mail = new PHPMailer;
        $mail->SMTPSecure = 'ssl';

        //Tell PHPMailer to use SMTP
        $mail->isSMTP();

        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 2;

        //Ask for HTML-friendly debug output
        $mail->Debugoutput = 'html';

        //Set the hostname of the mail server
        $mail->Host = '	smtp.gmail.com';

        //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
        $mail->Port = 465;

        //Set the encryption system to use - ssl (deprecated) or tls

        //Whether to use SMTP authentication
        $mail->SMTPAuth = true;

        //Username to use for SMTP authentication - use full email address for gmail
        $mail->Username = "hycubewinter@gmail.com";

        //Password to use for SMTP authentication
        $mail->Password = "diamond!";

        //Set who the message is to be sent from
        $mail->setFrom('hycubewinter@gmail.com', 'Hycube');

        //Set an alternative reply-to address
        $mail->addReplyTo('hycubewinter@gmail.com', 'Hycube');

        //Set who the message is to be sent to
        $mail->addAddress($name, 'Customer');
//        $mail->addAddress('chou610@gmail.com', 'Customer');
        //Set the subject line
        $mail->Subject = 'Confirm your Hycube account';

        //Read an HTML message body from an external file, convert referenced images to embedded,
        //convert HTML into a basic plain-text alternative body
        $mail->msgHTML("abcd", dirname(__FILE__));

        //mail body
        $mail->Body = '<p>Dear Customer,</p><p><br></p><p>To confirm you e-mail, please go to following link :</p><div align=""><a href="'.base_url().'index.php/main/activate/'.$random_hash.'">'.base_url().'index.php/main/activate/'.$random_hash.'</a>&nbsp;</div><p><br></p><p>Hycube</p><p>Information Security of Hanyang University&nbsp;</p>';

        //Replace the plain text body with one created manually
        $mail->AltBody = 'This is a plain-text message body';

        //Attach an image file

        //send the message, check for errors
        if (!$mail->send()) {
            return false;
        } else {
            return true;
        }
    }
}