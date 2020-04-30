addEventListener("message",function(event){
	var r=0;
	for(var n=0;n<=event.data;n++){
		r+=n;
	}
	postMessage(r);
},false);												
