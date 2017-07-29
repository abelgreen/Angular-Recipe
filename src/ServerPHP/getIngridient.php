<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName="ingridients";
$className="myIngridient";
$allIngridients=(new SubType())->getAllStuff($tableName,$className);
//var_dump($allIngridients);
echo json_encode($allIngridients);
?>