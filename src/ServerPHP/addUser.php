<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassUsers.php";
$email =  $_POST['email'];//"ab@cd.com";//
$pass = $_POST['pass'];//"abcd";//
$user_name = $_POST['user_name'];//"ab";//
$OneUser = (new USER( $user_name, $pass, $email))->CreateAndReturnUser();
//var_dump($OneUser);
if(isset($OneUser["Error"])){
echo json_encode($OneUser);
}else{
echo json_encode($OneUser[0]);
}
?>