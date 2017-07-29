<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName="recipes";
$className="myRecipe";
$allRecipes=(new SubType())->getAllRecipes();
//var_dump($allRecipes);
$prefix = '';
echo '[';
foreach($allRecipes as $row) {
  echo $prefix, json_encode($row);
  $prefix = ',';
}
echo ']';
//echo json_encode($allRecipes);
?>