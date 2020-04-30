<?php
$serv = new swoole_http_server("127.0.0.1", 9501);
$serv->set(['worker_num' => 1]);
$serv->on('Start', function(){
    swoole_set_process_name('route_master');
});
$serv->on('ManagerStart', function(){
    swoole_set_process_name('route_manager');
});
$serv->on('WorkerStart', function(){
    swoole_set_process_name('route_worker');
    var_dump(spl_autoload_register(function($class){
        $classPath = __DIR__ . '/' . str_replace("\\", DIRECTORY_SEPARATOR, $class) . '.php';
        if(is_file($classPath)){
            require "{$classPath}";
            return;
        }
    }));
});
$serv->on('Request', function($request, $response){
    if ($request->server["request_uri"] == "/favicon.ico") {
        $response->end();
        return;
    }
    $path_info = explode('/', $request->server['path_info']);
    if(isset($path_info[1]) && !empty($path_info[1])){
        $ctrl = 'ctrl\\'.$path_info[1];
    }else{
        $ctrl = 'ctrl\\Index';
    }
    if(isset($path_info[2])){
        $action = $path_info[2];
    }else{
        $action = "index";
    }
    $result = "ctrl not found";
    if(class_exists($ctrl)){
        $class = new $ctrl;
        $result = "action not found";
        if(method_exists($class, $action)){
            $result = $class->$action($request);
        }
    }
    $response->end($result);
});
$serv->start();