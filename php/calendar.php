<title>calendar</title>
<?php
calendar(2017,1);
calendar(2017,2);
calendar(2017,3);
calendar(2017,4);
calendar(2017,5);
calendar(2017,6);
calendar(2017,7);
calendar(2017,8);
calendar(2017,9);
calendar(2017,10);
calendar(2017,11);
calendar(2017,12);


function calendar($year,$mouth){
	$firstdayint = mktime(0,0,0,$mouth,1,$year);  //6月1日的时间戳
	$dayinmouth = date('t',$firstdayint);         //当月总天数
	$firstday = date('w',$firstdayint);           //6月1日是星期几
	$weeks = ceil(($dayinmouth+$firstday)/7);     //6月周数
	$days = array();                              //二维数组保存日期，一维保存周数，二位保存日期
	$day_tmp = 0;

	for($i = 0; $i < $weeks; $i++){
		for($j = 0; $j < 7; $j++){
			if($i == 0 && $j >= $firstday || $i > 0 && $day_tmp < $dayinmouth){
				$day_tmp++;
				$days[$i][$j] = $day_tmp;
			}else{
				$days[$i][$j] = '';
		    }
		}
		
	}
	echo
	'<table border="1" style="text-align:center; border-collapse:collapse">
		<tr>
	    	<th colspan="7">'.$year.'年'.$mouth.'月'.'</th>
	    </tr>
	    <tr>
	    	<td>星期天</td>
	        <td>星期一</td>
	        <td>星期二</td>
	        <td>星期三</td>
	        <td>星期四</td>
	        <td>星期五</td>
	        <td>星期六</td>
	    </tr>';
	foreach($days as $weeks=>$weekDays){
		echo '<tr>';
		foreach($weekDays as $day){
			echo '<td>'.$day.'</td>';
		}
		echo '</tr>';
	}
	echo'</table><br>';
}
