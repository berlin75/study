<?php
class persons{
	public $name;
	public $age=28;
	public $city='loudi';
	function say(){ 
		echo 'my city is '.$this->city;
		$this->sayage();
	}
	function setage($age=22){
		$this->age=$age;
	}
	function sayage(){ 
		echo '.my age is '.$this->age.'<br>';
	}
}

$p1=new persons();
$p2=new persons();
print_r($p1);     // persons Object ( [name] => [age] => 28 [city] => loudi ) 
print_r($p2);     // persons Object ( [name] => [age] => 28 [city] => loudi ) 
var_dump($p1==$p2);   // true
var_dump($p1===$p2);  // false

$p2->name='liberlin';
print_r($p1);   // persons Object ([name]=> [age]=>28 [city]=>loudi ) 
print_r($p2);   // persons Object ([name]=>liberlin [age]=>28 [city]=>loudi )
var_dump($p1==$p2);   // false
var_dump($p1===$p2);  // false

echo '<br>'.$p1->age.'<br>'; // 28
$p1->name='berlin';
echo $p1->name.'<br>';       // berlin
$p1->age=18;
echo $p1->age.'<br>';        // 18

$p1->say();     // my city is loudi.my age is 18
$p1->setage();
$p1->say();     // my city is loudi.my age is 22
$p1->setage(25);
$p1->say();     // my city is loudi.my age is 25

$p3=$p2;
$p3->city='shuangfeng';
var_dump($p2==$p3);  // true
var_dump($p2===$p3); // true
var_dump($p2);
var_dump($p3);
/*
object(persons)[2]
  public 'name' => string 'liberlin' (length=8)
  public 'age' => int 28
  public 'city' => string 'shuangfeng' (length=10)
*/
