<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$tableName="images";
$className="myImage";
$allImages=(new SubType())->getAllStuff($tableName,$className);
echo json_encode($allImages);
?>