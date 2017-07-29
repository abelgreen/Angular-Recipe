<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$foodName= $_POST['foodname'];
$Error = array('Error'=>'No data Found');
$allfood = (new SubType())->getFoodsByName($foodName);
//var_dump($allfood);
if(count($allfood)>0){
echo json_encode($allfood);
}else{
echo json_encode($Error);
}
?>