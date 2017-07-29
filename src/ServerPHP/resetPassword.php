<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassUsers.php";
$email =  $_POST['email'];//"ab@cd.com";//
$pass = $_POST['pass'];//"abcd";//
$user_name = $_POST['email'];//"ab";//
$result = (new USER( $user_name, $pass, $email))->Update_Password();
echo json_encode($result);
?>