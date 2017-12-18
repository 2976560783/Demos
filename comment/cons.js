
$(document).ready(function(){

var text=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/

    $.getJSON("data.php", function(json) {  
	function sort(a,b){
	return a.int-b.int;
	}
	json.sort(sort);
        $.each(json, function(index, array) {
            var data ="<li><p>" + "用户" + array["name"] + ":" + "</p><span>" + array["messages"] + "</span><a>" + array["time"] + "</a></li>";
            $(".ul").append(data);  
        });
    });
    
    $(".con .name").blur(function(){
        if(!text.test($(".con .name").val())){
            $(".con small").css("color","red")
        }else{
            $(".con small").css("color","#999")
        }
    })

    $(".btn").click(function(){

        function p(s) {
            return s < 10 ? '0' + s : s;
        }
        var myDate = new Date();
        var year=myDate.getFullYear();
        var month=myDate.getMonth()+1;
        var date=myDate.getDate(); 
        var h=myDate.getHours();
        var m=myDate.getMinutes();
        var s=myDate.getSeconds();  
        var now=year+'-'+p(month)+"-"+p(date)+" "+p(h)+':'+p(m)+":"+p(s);

        if(!text.test($(".con .name").val())){
            
            }else if($(".box .text").val().length == 0){
                alert("请说出您宝贵的意见和建议")
            }else{

                $.ajax({
                    type:"POST",
                    url:"msg.php",
                    data:{"name":$(".con .name").val(),"messages":$(".box .text").val(),"time":now},
                    success:function(data){
                        var str= "<li><p>" + "用户" + $(".con .name").val() + ":" + "</p><span>" + $(".box .text").val() + "</span><a>" + now + "</a></li>";
                            
                            $(".ul").append(str);
                            alert(data);
                        
                    },
                    error:function(){  
                        console.log("失败，请稍后再试！");  
                    },
                });      
            }          
        })  
    })

