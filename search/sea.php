<?php
$con = mysqli_connect("localhost","username","password");
if(!$con){
	echo "数据库链接失败";
	exit;
}
mysqli_select_db($con,'jwhuang');
mysqli_query($con,'set names utf-8');
$text= isset($_GET['text']) ? trim($_GET['text']) : '';
$result=mysqli_query($con,"select * from search where sea LIKE '{$text}%' ");
$search=array();

while($row=mysqli_fetch_assoc($result)){
	//判断是否有对应的数据
	if(!$row){
		$search='';
		exit;
	}else{
		//对查询关键字进行标记
		$row['sea'] = str_replace($text, '<font color="red">' .$text. '</font>', $row['sea']);
		$search[]=$row;
		
	}
}
echo json_encode($search);
?>