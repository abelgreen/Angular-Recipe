<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName="foods";
$className="myFood";
$allFoods=(new SubType())->getAllStuff($tableName,$className);
echo json_encode($allFoods);
?>