/* requestHandlers.js */
function start(response){ 
	console.log("Request handler 'start' was called."); 

	// sleep()阻塞了nodejs单进程,导致同时调用其他程序时阻塞,利用child_process的exec来实现简单又实用的非阻塞操
	// var exec = require("child_process").exec;      
 //  	exec("dir", function (error, stdout, stderr) {  
 //    	response.writeHead(200, {"Content-Type": "text/plain"});  
 //    	response.write(stdout);  
 //    	response.end();    
 //  	});
      
    !function sleep(milliSeconds){   
        var startTime=new Date().getTime();   
        while(new Date().getTime() < startTime+milliSeconds);   
    }(10000); 

    response.writeHead(200, {"Content-Type": "text/plain"});  
	response.write("Hello Start");  
	response.end();  
}   
function upload(response){   
    console.log("Request handler 'upload' was called.");  
	response.writeHead(200, {"Content-Type": "text/plain"});  
	response.write("Hello Upload");  
	response.end(); 
}   
  
exports.start=start;   
exports.upload=upload;