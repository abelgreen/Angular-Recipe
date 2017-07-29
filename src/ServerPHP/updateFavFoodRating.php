<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName = "users_recipes";
$className = "myUserRecipe";
$user_id= $_POST['user_id'];
$recipe_id= $_POST['recipe_id'];
$rating = $_POST['rating'];
$Error = array('Error'=>'No data Found');
$Result = (new SubType())->updateSomeFav($tableName, $className, $user_id, $recipe_id, $rating);
//var_dump($allfood);
echo json_encode($Result);
?>