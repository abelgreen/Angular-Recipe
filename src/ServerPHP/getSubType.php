<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName="food_sub_type";
$className="mySubType";
$allSubType=(new SubType())->getAllStuff($tableName,$className);
echo json_encode($allSubType);
?>