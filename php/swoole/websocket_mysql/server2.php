<?php
class Server{
	private $server;
	private $pdo;
	public function __construct(){
		$this->server = new swoole_websocket_server("0.0.0.0", 9501);
		$this->server->set([
			'worker_num' => 8,
			'dispatch_mode' => 2,
			'daemonize' => 0
		]);
		$this->server->on('open', [$this, 'update']);
		$this->server->on('message', [$this, 'onMessage']);
		$this->server->on('workerstart', [$this, 'onWorkerStart']);
		// $this->server->on('handshake', [$this, 'user_handshake']);
		$this->server->start();
	}
	public function onWorkerStart(swoole_server $server, $worker_id){
		if($worker_id == 0) $this->server->tick(500, [$this, 'onTask']);
		// 每个worker都绑定pdo连接
		$this->pdo = new PDO("mysql:host=127.0.0.1;dbname=my_db01","root","", [
			PDO::MYSQL_ATTR_INIT_COMMAND => "SET　NAMES UTF8;",
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_PERSISTENT => true
		]);
	}
	public function user_handshake(swoole_http_request $request, swoole_http_response $response){
		// 自定义握手规则,没有设置则用系统内置的
		if(!isset($request->header['sec-websocket-key'])){
			// bad protocol implementation
			$response->end();
			return false;
		}
		if(0 === preg_match('#^[+/0-9a-zA-Z]{21}[AQgw]==$#', $request->header['sec-websocket-key']) || 16 !== strlen(base64_decode($request->header['sec-websocket-key'])){
			// header sec-websocket-key is illegal
			$response->end();
			return false;
		}
		$key = base64_encode(sha1($request->header['sec-websocket-key'].'258EAFA-E914-47DA-95CA-C5ABBDC85B11', true));
		$headers = [
			'Upgrade' => 'websocket',
			'Connection' => 'Upgrate',
			'Sec-Websocket-Accept' => $key,
			'Sec-Websocket-Version' => '13',
			'KeepAlive' => 'off'
		];
		foreach($headers as $key=>$val){
			$response->header($key, $val);
		}
		$response->status(101);
		$response->end();
		return true;
	}
	public function onMessage(swoole_websocket_server $server, $frame){
		// $this->update();
	}
	public function update(){
		// ['user'=>['username','age'], 'test'=>['id','name']]
		global $cfg_tables;
		$result = [];
		foreach($cfg_tables as $table => $fields){
			$result[$table] = $this->select($table, $feilds);
		}
		var_dump($result);
		foreach($this->server->connections as $connection){
			$this->server->>push($connection, json_encode($result));
		}
	}
	public function select($table, $fields){
		$field_list = implode(',', $fields);
		$sql = "select {$field_list} from {$table}";
		try{
			$stmt = $this->pdo->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetchAll(PDO::FETCH_ASSOCC);
			return $result?:[];
		}catch(Exception $e){
			return [];
		}
	}
	public function onTick(){
		$sql = "select is_update from tmp_recode limit 1";
		$update = "update tmp_recode set is update = 0";
		try {
			$stmt = $this->pdo->prepare($sql);
			$stmt->execute();
			$result = $stmt->fetch(PDO::FETCH_ASSOCC);
			if($result === false) return;
			if($result['is_update'] == 1) $this->update();
			$stmt = $this->pdo->prepare($update);
			$stmt->execute();
		} catch (Exception $e) {
			$this->pdo = new PDO("mysql:host=127.0.0.1;dbname=my_db01","root","", [
				PDO::MYSQL_ATTR_INIT_COMMAND => "SET　NAMES UTF8;",
				PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
				PDO::ATTR_PERSISTENT => true
			]);
		}
	}
}

new Server;