<?php 
$conn=new Mysqli($servername, $username, $password,dbname) 
if(!$conn){  
    echo "数据库连接错误!";exit;  
}  
mysqli_query($conn,"set names utf8");
$page=$_POST['page']; //获取前台请求的记录
$size=10;//每次请求的数据条数 
$start=($page-1)*10;//从几条开始求数据
$count=$conn->query("select id from foods")->num_rows;//记录总条数
$totalPage=ceil($count/$size);//记录可以请求的总次数
$result=$conn->query("select * from foods limit $start,$size");
while($row=mysqli_fetch_array($result)){  
    $datas[] = array("id"=>$row['id'],"title"=>$row['title'],"pic"=>$row['pic'],"price"=>$row['price'],"num"=>$row['num'],"count"=>$count,"totalPage"=>$totalPage);
}
echo json_encode($datas);
mysqli_close($conn);
?>