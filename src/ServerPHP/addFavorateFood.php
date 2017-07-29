<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$user_id = $_POST['user_id'];//
$recipe_id = $_POST['recipe_id'];//
$rating = $_POST['rating'];//
$rate_date = $_POST['rate_date'];
$OneFav = (new SubType())->createNewFavorateAndReturn($user_id,$recipe_id ,$rating,$rate_date);
//var_dump($OneUser);
if(isset($OneFav["Error"])){
echo json_encode($OneFav);
}else{
echo json_encode($OneFav[0]);
}
?>
