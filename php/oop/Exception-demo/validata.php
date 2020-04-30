<?php
class validata{
	static function validatauser(user $user){
		$un=$user->getun();
		$pw=$user->getpw();
		
		unset($_SESSION['validata_un'],$_SESSION['validata_pw']); //每次进入页面先清除session
		
		try{
			self::validataun($un);
		}catch(myException $me){
			$_SESSION['validata_un']=$me->getMessage();
		}
		
		try{
			self::validataun($pw);
		}catch(myException $me){
			$_SESSION['validata_pw']=$me->getMessage();
		}
		
	    if(isset($me)){   //存在异常则抛出异常
	    	throw $me;
	    }  
	}
	
//验证用户名和密码**********************************	
	static private function validataun($un){
		$len=strlen($un);
		if($len<3){
			//echo '用户名长度不能小于3位';  //不能直接输出错误信息，而是抛出异常
			throw new myException('用户名长度不能小于3位',E_USER_ERROR);
		}
		if($len>8){
			throw new myException('用户名长度不能大于8位',E_USER_ERROR);
		}
	}
	static private function validatapw($pw){
		$len=strlen($pw);
		if($len<3){
			throw new myException('密码长度不能小于3位',E_USER_ERROR);
		}
		if($len>8){
			throw new myException('密码长度不能大于8位',E_USER_ERROR);
		}
	}
	
}

