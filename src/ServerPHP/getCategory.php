<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName="category";
$className="myCategory";
$allCategories=(new SubType())->getAllStuff($tableName,$className);
echo json_encode($allCategories);
?>