<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName = "users_recipes";
$className = "myUserRecipe";
$user_id=  $_POST['user_id'];
$recipe_ids=  $_POST['recipe_ids'];
// $Error = array('Error'=>'No data Found');
$Result = (new SubType())->deleteSomeFav($tableName, $className, $user_id, $recipe_ids);
//var_dump($allfood);
//echo json_encode(array('Status'=> $user_id,'Error'=> $recipe_ids));
echo json_encode($Result);
?>
