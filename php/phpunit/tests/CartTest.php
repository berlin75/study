<?php
require_once __DIR__."/../Cart.php";

class CartTest extends PHPUnit_Framework_TestCase{
	private $cart = null;

	// 每個測試方法執行之前都會先執setUp方法；而結束之後則會執行tearDown方法
	// 初始化 fixture
	public function setUp(){    
		$this->cart = new Cart();
	}

	// 清除 fixture 所佔用的内存
	public function tearDown(){
		$this->cart = null;
	}

	/**
	 * DocBlock
	 * @dataProvider provider
	 * @group update
	 */
	 public function testUpdateQuantitiesAndGetTotal($quantities, $expected){
        $this->cart->updateQuantities($quantities);
        $this->assertEquals($expected, $this->cart->getTotal());
    }

    public function provider(){
    	return [
    		[[1, 0, 0, 0, 0, 0,], 199+20],
    		[[1, 0, 0, 2, 0, 0,], 797],
    		[[0, 0, 0, 0, 0, 0], 0],
    	];
    }

    /**
	 * 测试异常
     * @expectedException CartException
     * @group update
     * @group exception
     */
    public function testUpdateQuantitiesWithException(){
        $quantities = [ -1, 0, 0, 0, 0, 0 ];
        $this->cart->updateQuantities($quantities); // 預期會產生一個 Exception
    }

    /**
     * @depends testUpdateQuantitiesAndGetTotal
     * 测试的依赖
     * @group get
     */
    public function testGetProducts(){
        $products = $this->cart->getProducts();
        $this->assertEquals(7, count($products));
        $this->assertEquals(0, $products[3]['quantity']);
    }
}