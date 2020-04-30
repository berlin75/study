<?php
// 生成验证码 
class Captcha{
    private $_width  = 100;
    private $_height = 25;
    private $_number = 4;  //显示的验证码的字符个数
    private $_font   = 15; //验证码字体大小
    private $_fontfile = 'simkai.ttf';
    //创建验证码图像
    public function makeImage(){
        $image = imagecreatetruecolor($this->_width,$this->_height);
        $color = imagecolorallocate($image,mt_rand(100,255),mt_rand(100,255),mt_rand(100,255));
        imagefill($image,0,0,$color);
        # 2.绘制文字
        $code = $this -> makeCode();   //随机生成验证码文字 ab3g
        $color = imagecolorallocate($image,mt_rand(0,100),mt_rand(0,100),mt_rand(0,100));
        for($i=0;$i<$this->_number;$i++){
            imagettftext($image,$this->_font,mt_rand(-30,30),$i*($this->_width/$this->_number)+5,20,$color,$this->_fontfile,$code[$i]);
        }
        # 3.绘制干扰线条
        for($i = 0; $i < 10; $i++){
            $color = imagecolorallocate($image,mt_rand(100,150),mt_rand(100,150),mt_rand(100,150));
            imageline($image,mt_rand(0,$this->_width),mt_rand(0,$this->_height),mt_rand(0,$this->_width),mt_rand(0,$this->_height),$color);
        }

        # 4.设置100个干扰像素点
        for($i = 0; $i < 100; $i++){
            imagesetpixel($image,mt_rand(0,$this->_width),mt_rand(0,$this->_height),$color);
        }

        # 5.将验证码保存起来吗，便于后面再其他地方使用,只能使用session来存储
        session_start();
        $_SESSION['captcha'] = $code;

        //在浏览器输出、显示一下
        header("Content-Type:image/png");
        imagepng($image);
        imagedestroy($image);
    }

    // 随机产生随机数
    public function makeCode(){
        $lower  = range('a','z');  
        $upper  = range('A','Z'); 
        $number = range(0,9);     
        $code   = array_merge($lower,$upper,$number);
        shuffle($code);
        //随机从上面的数组中筛选出n个字符,需要通过下标来取数组的元素
        $str = '';
        for($i=0; $i < $this->_number; $i++){
            $str .= $code[$i];
        }       
        return $str;
    }

    // 验证用户输入的验证码和生产的验证码是否一致
    public function checkCode($code){
        session_start();        
        return strtolower($code) == strtolower($_SESSION['captcha']);
    }
}