<?php
header("Access-Control-Allow-Origin: *");
include "./classes/ClassSubType.php";
$subid=$_POST['sub_id'];
$catid=$_POST['category_id'];
//echo $subid;
//echo $catid;
$Error = array('Error'=>'No data Found');
$allfood = (new SubType())->getAllFood($subid,$catid);
//var_dump($allfood);
if(count($allfood)>0){
echo json_encode($allfood);
}else{
echo json_encode($Error);
}
?>