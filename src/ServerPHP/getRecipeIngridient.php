<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$recipeid = $_POST['recipe_id'];
//echo $recipeid;
//echo $catid;
$Error = array('Error'=>'No data Found');
$allIngRecp = (new SubType())->getAllIngRecp($recipeid);
//var_dump($allfood);
if(count($allIngRecp)>0){
echo json_encode($allIngRecp);
}else{
echo json_encode($Error);
}

?>