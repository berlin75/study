<?php
class user{
	private $un;
	private $pw;
	function __construct($un,$pw){
		$this->un=$un;
		$this->pw=$pw;
		//echo  'class user:'.$this->un.' '.$this->pw.'<hr>';
	}
	function getun(){
		return $this->un;
	}
	function getpw(){
		return $this->pw;
	}
	
}
