
window.onload = function(){
	//运行瀑布流主函数,默认加载
	PBL('wrap','box');	

	var page=1;

	window.onscroll = function(){
		
	 if( getCheck() ) {

		if(page>5){
				return false;
			}else{
				page++;
				getAjax(page);		
			
			}
		}

	}
			
}	
		
function getAjax(page){
	$.ajax({
		type: 'POST',
		data:{'page':page},
		url: 'fall.php',
		dataType:'json',
		success:function(data){
		console.log(data);

		var wrap = document.getElementById('wrap');
		for(i in data){
			//创建box
			var box = document.createElement('div');
			box.className = 'box';
			wrap.appendChild(box);
			//创建info
			var info = document.createElement('div');
			info.className = 'info';
			box.appendChild(info);
			//创建pic
			var pic = document.createElement('div');
			pic.className = 'pic';
			info.appendChild(pic);
			//创建img
			var img = document.createElement('img');
			img.src =data[i].pic;
			img.style.height = 'auto';
			pic.appendChild(img);
			//创建title
			var title = document.createElement('div');
			title.className = 'title';
			info.appendChild(title);
			//创建a标记
			var a = document.createElement('a');
			a.innerHTML = data[i].title;
			title.appendChild(a);
			//创建div
			var sale= document.createElement('div');
			sale.className='sale';
			info.appendChild(sale);
			//创建价格
			var label1= document.createElement('label');
			label1.innerHTML="价格：";
			sale.appendChild(label1);
			var span1= document.createElement('span');
			span1.innerHTML=data[i].price;
			sale.appendChild(span1);
			//创建库存
			var label2= document.createElement('label');
			label2.innerHTML="库存：";
			sale.appendChild(label2);
			var span2= document.createElement('span');
			span2.innerHTML=data[i].num;
			sale.appendChild(span2);
			//创建购买btn
			var btn= document.createElement('button');
			btn.innerHTML="购买";
			sale.appendChild(btn);
				
		}
		PBL('wrap','box');
		
		},
		error:function(){
			alert("数据加载出错")

		}


	});	

}
	
//瀑布流主函数
function PBL(wrap,box){
	//	获得外层以及每一个box
	var wrap = document.getElementById(wrap);
	var boxs  = getClass(wrap,box);
	//	获得屏幕可显示的列数
	var boxW = boxs[0].offsetWidth;
	var colsNum = Math.floor(document.documentElement.clientWidth/boxW);
	wrap.style.width = boxW*colsNum+'px';//为外层赋值宽度
	//	循环出所有的box并按照瀑布流排列
	var everyH = [];//定义一个数组存储每一列的高度
	for (var i = 0; i < boxs.length; i++) {
		if(i<colsNum){
			everyH[i] = boxs[i].offsetHeight;
		}else{
			var minH = Math.min.apply(null,everyH);//获得最小的列的高度
			var minIndex = getIndex(minH,everyH); //获得最小列的索引
			getStyle(boxs[i],minH,boxs[minIndex].offsetLeft,i);
			everyH[minIndex] += boxs[i].offsetHeight;//更新最小列的高度
		}
	}

}

//获取类元素,储存数组

function getClass(wrap,className){
	var obj = wrap.getElementsByTagName('*');
	var arr = [];
	for(var i=0;i<obj.length;i++){
		if(obj[i].className == className){
			arr.push(obj[i]);
		}
	}
	return arr;
}

// 获取最小列的索引

function getIndex(minH,everyH){
	for(index in everyH){
		if (everyH[index] == minH ) 
		return index;
	}
}

// 数据请求检验

function getCheck(){
	var scrollHeight = document.documentElement.scrollHeight //可视区的高度加上滚动的高度
	var clientHeight = document.documentElement.clientHeight //可视区的高度
	var scrollTop = document.documentElement.scrollTop //滚动条在Y轴上的滚动距离
	return scrollHeight == clientHeight + scrollTop ? true:false;
}

// 设置加载样式

var getStartNum = 0;//设置请求加载的条数的位置
function getStyle(box,top,left,index){
    if (getStartNum>=index) return;
    $(box).css({
    	'position':'absolute',
        'top':top,
        "left":left,
        "opacity":"0"
    });
    $(box).stop().animate({
        "opacity":"1"
    },999);
    getStartNum = index;//更新请求数据的条数位置
}













