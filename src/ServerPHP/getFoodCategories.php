<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$foodid= $_POST["food_id"];
$allCategories=(new SubType())->getFoodCategory($foodid);
// var_dump($allCategories);
echo json_encode($allCategories);
?>