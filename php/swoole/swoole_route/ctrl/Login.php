<?php
namespace ctrl;
class Login{
	public function login($request){
		$post = $request->post ?? [];
		return "login sucess";
	}
}