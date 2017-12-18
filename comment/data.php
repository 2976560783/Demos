<?php  
$con = mysqli_connect('localhost', 'username', 'password');
if(! $con )
{
    die('连接失败: ' . mysqli_error($con));
}

mysqli_select_db($con,'bdm256727651_db');
mysqli_query($con,"set names utf8");
$sql = "select * FROM Messages";
$result = mysqli_query($con,$sql );

while($row=mysqli_fetch_array($result)){
	$datas[] = array("int"=>$row['int'],"name"=>$row['name'],"messages"=>$row['messages'],"time"=>$row['time']);
}

echo json_encode($datas);//以json格式编码 


