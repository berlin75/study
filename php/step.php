<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>安装步骤</title>
<script type="text/javascript">
	console.log(location.pathname);
</script>
</head>
<body>
<div style="width:960px;margin:0 auto;">
    	<?php  
    	  if(!isset($_GET['step'])){
    	?>
				<button onclick='location.href=location.pathname+"?step=0"' >start</button>
    	<?php 
    		}else{
    			$step = (int)$_GET['step']; 
    			if($step==0){
    	?>
					>>>>>step0<<<<<< <br/><br/>
					<button onclick='location.href=location.pathname+"?step=1"' >goto step 1</button>
				<?php 
					}else if($step==1){
				?>
						>>>>>step1<<<<<< <br/><br/>
						<button onclick='location.href=location.pathname+"?step=2"' >goto step 2</button>
				<?php 
					}else if($step==2){
				?>
						>>>>>step2<<<<<< <br/><br/>
						<button onclick='location.href=location.pathname+"?step=1"' >goto step 1</button>
						<button onclick='location.href=location.pathname+"?step=0"' >goto step 0</button>
				<?php  
					}
			} 
	    ?>

</div>
</body>
</html>