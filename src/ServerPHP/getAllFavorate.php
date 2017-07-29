<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName="users_recipes";
$className="myUserRecipe";
$userId=  $_POST["user_id"];
$Error = array('Error'=>'No data Found');
$allFavorate=(new SubType())->getAllFav($tableName,$className,$userId);
//var_dump($allIngridients);
if(count($allFavorate)>0){
echo json_encode($allFavorate);
}else{
echo json_encode($Error);
}
?>