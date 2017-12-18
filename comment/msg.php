<?php
$con = mysqli_connect('59.110.55.120', 'bdm256727651', 'hjw123456');
if(! $con )
{
    die('连接失败: ' . mysqli_error($con));
}
mysqli_select_db($con,'bdm256727651_db');
mysqli_query($con,"set names utf8");
$sql=" INSERT INTO Messages (name,messages,time)
VALUES('$_POST[name]','$_POST[messages]','$_POST[time]') ";
mysqli_query($con,$sql);
echo "发表成功";	

mysqli_close($con)
?>