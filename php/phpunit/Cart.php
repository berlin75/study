<?php

class Cart{
    private $products = [
        [
            'name'     => 'iPhone 6 (16G)',
            'quantity' => 0,
            'price'    => 199,
            'subtotal' => 0,
        ],
        [
            'name'     => 'iPhone 6 (64G)',
            'quantity' => 0,
            'price'    => 299,
            'subtotal' => 0,
        ],
        [
            'name'     => 'iPhone 6 (128G)',
            'quantity' => 0,
            'price'    => 399,
            'subtotal' => 0,
        ],
        [
            'name'     => 'iPhone 6 Plus (16G)',
            'quantity' => 0,
            'price'    => 299,
            'subtotal' => 0,
        ],
        [
            'name'     => 'iPhone 6 Plus (64G)',
            'quantity' => 0,
            'price'    => 399,
            'subtotal' => 0,
        ],
        [
            'name'     => 'iPhone 6 Plus (128G)',
            'quantity' => 0,
            'price'    => 499,
            'subtotal' => 0,
        ],
        [
            'name'     => '运费',
            'quantity' => 0,
            'price'    => 20,
            'subtotal' => 0,
        ]
    ];

    const FREIGHT_KEY = 6;

    private $total = 0;

    public function getProducts(){
        return $this->products;
    }

    public function getTotal(){
        return $this->total;
    }

    public function setQuantity($key, $qty){
        $this->products[$key]['quantity'] = $qty;
        $this->products[$key]['subtotal'] = $this->products[$key]['quantity'] * $this->products[$key]['price'];
    }

    public function updateQuantities($quantities){
        foreach ($quantities as $key => $qty) {
            if (!is_numeric($qty) || (int) $qty < 0) {
                throw new CartException("数量不正确，请输入 0 或 0 以上的整数", 1);
            }
            $this->setQuantity($key, $qty);
        }

        $this->total = 0;
        foreach ($this->products as $key => $product) {
            $this->total += $product['subtotal'];
        }
        if ($this->total > 0 && $this->total < 500) {
            $this->setQuantity(self::FREIGHT_KEY, 1);
            $this->total += $this->products[self::FREIGHT_KEY]['subtotal'];
        } else {
            $this->setQuantity(self::FREIGHT_KEY, 0);
        }
        
    }

    public function __sleep(){
        return ['products', 'total'];
    }
}


class CartException extends Exception{

}

// 測試碼
if (isset($argv[1]) && 'test' === strtolower($argv[1])) {

    $cart = new Cart();

    // Test 1
    $quantities = [
        1, 0, 0, 0, 0, 0,
    ];
    $cart->updateQuantities($quantities);
    if (199 !== $cart->getTotal()) {
        echo "Test 1 failed!\n";
    } else {
        echo "Test 1 OK!\n";
    }

    // Test 2
    $quantities = [
        1, 0, 0, 2, 0, 0,
    ];
    $cart->updateQuantities($quantities);
    if (797 !== $cart->getTotal()) {
        echo "Test 2 failed!\n";
    } else {
        echo "Test 2 OK!\n";
    }
}