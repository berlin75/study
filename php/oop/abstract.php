<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>abstract</title>
</head>

<body>
<h2>利率查询</h2>
<form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
	<p>存入的本金：<input type="number" name="number" value="10000" min="1" onFocus="this.value=''"></p>
    <p>选择的银行：<input type="radio" name="bank" value="ABC" checked>ABC
    			<input type="radio" name="bank" value="ICBC">ICBC
    </p>
    <p><input type="submit" value="查询"></p>
</form>
<hr>
    
<?php
abstract class Account{
    protected $principal;  //本金
	protected $interest;  //利息
	
	public function __construct($principal){    //获取本金
		echo '存入的本金：'.$principal.'<br>';
		return $this->principal=$principal;
	}
	
	public function getInterest(){    //获取利息
		$this->interest=$this->principal*$this->getInterestRate();
		echo '获取的年利息：'.$this->interest.'<hr>';
	}
	
	abstract function getInterestRate();   //获取利率
}

class ABC extends Account{
	function getInterestRate(){
		echo '农业银行的活期年利率结算方式：0.0035<br>';
		return 0.0035;
	}
}

class ICBC extends Account{
	function getInterestRate(){
		echo '工商银行银行的活期年利率结算方式：0.004<br>';
		return 0.004;
	}
}

if(!empty($_POST['number'])&&!empty($_POST['bank'])){
	if($_POST['bank']=='ABC'){
		$p1=new ABC($_POST['number']);
		$p1->getInterest();
	}
	
	if($_POST['bank']=='ICBC'){
		$p1=new ICBC($_POST['number']);
		$p1->getInterest();
	}
}
echo '<hr><h2>abstract</h2>';
$p1=new ABC(10000);
$p1->getInterest();

$p1=new ICBC(10000);
$p1->getInterest();

?>
</body>
</html>