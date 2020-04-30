<?php
$str = 'abc';
$str1 = substr($str, 0, 2);

function xx($a, $b){
	$x = array();
	array_push($x, $a);
	array_push($x, $b);
	yy();
	return $x;
}

function yy(){
	print_r(123);
}