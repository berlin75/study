<?php
//namespace.php

namespace animal\dog;
class Life{
    function __construct(){
            echo 'dog life<br/>';
        }
}

namespace animal\cat;
class Life{
    function __construct(){
            echo 'cat life<br/>';
        }
}


//按照代码执行顺序，这里默认animal\cat这个命名空间
new Life();              // cat life
new \animal\dog\Life();  // dog life

use animal\dog;  
new dog\Life();          // dog life

use animal\dog as d;     // dog life
new d\Life();