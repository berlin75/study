var i=0;
function timeCount(){
	i++;
	postMessage(i);                     //向HTML页面传回一段消息
	setTimeout("timeCount()",1000);
}
timeCount();
