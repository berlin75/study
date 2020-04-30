<?php
var_dump(filter_list());
echo filter_id('int').'<br>';

$int=12.3;
if(!filter_has_var(INPUT_GET, 'email')){
	echo "no email";
}else{
	if(!filter_input(INPUT_GET, 'email', FILTER_VALIDATE_EMAIL)){
		echo "email error";
	}else{
		echo "ok";
	}
}

if(!filter_has_var(INPUT_GET, "url")){
    echo("没有 url 参数");
}else{
    $url = filter_input(INPUT_GET, "url", FILTER_SANITIZE_URL);
    echo $url;
}
