//ajax封装函数
function ajax(method,url,data){
	if(window.XMLHttpRequest){        //XMLHttpRequest作为window的属性，不存在时返回undefined
		var request=new XMLHttpRequest();
	}  
	else {
		var request=new ActiveXObject("Microsoft.XMLHTTP");
	}
	if(method.toUpperCase()=="POST"){
		request.open("POST",url,ture);
		request.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		request.send(data);
	}else if(method.toUpperCase()=="GET"){
		request.open("GET",url+"?t="+new Date().getTime(),ture);
		request.send();
	}
	request.onreadystatechange=function(){
		if(request.readyState===4){
			if(request.status===200){
				return request.responseText;
			}else{
				alert("发生错误："+request.status);
			}
		}
	}
}