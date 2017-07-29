<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassUsers.php";
$email =  $_POST['email'];//"ab@cd.com";//
$pass = $_POST['pass'];//'abcd';//
$user_name =  $_POST['email']; //"ab@cd.com";//
$Error = array('Error'=>'No User was Found');
$OneUser = (new USER( $user_name, $pass, $email))->checkUser();
//var_dump($allfood);
if(count($OneUser)>0){
echo json_encode($OneUser[0]);
}else{
echo json_encode($Error);
}
?>