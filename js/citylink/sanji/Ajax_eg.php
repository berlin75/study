<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>省市区三级</title>
<script src="../../../vendors/jquery-3.1.1.js"></script>
</head>
<style>
.sanji{ margin-left: 550px; margin-top: 150px; }
</style>
<body>

<div id="sanji"> </div>

<script>
$(document).ready(function(e) {
	//加载三个下拉列表
	$("#sanji").html("<select id='sheng'></select><select id='shi'></select><select id='qu'></select>");
	LoadSheng();
	LoadShi();
	LoadQu(); 

	//当省份选中变化，重新加载市和区
	$("#sheng").change(function(){ 
		LoadShi();
		LoadQu();
	});

	//当市选中变化，重新加载区
	$("#shi").change(function(){
		LoadQu();
	});
});

function LoadSheng(){
	//取父级代号
	var pcode ="0001";
	//根据父级代号查数据
	$.ajax({
		//取消异步，也就是必须完成上面才能走下面
		async:false,
		url:"load.php",
		data:{pcode:pcode},
		type:"POST",
		dataType:"json",
		success: function(data){ 
			var str="";
			for(var k in data){ 
				str += "<option value='"+data[k][1]+"'>"+data[k][2]+"</option>";
			}
			$("#sheng").html(str);
		}
	});
}

function LoadShi(){
	//取父级代号
	var pcode =$("#sheng").val();
	//根据父级代号查数据
	$.ajax({
		//取消异步，也就是必须完成上面才能走下面
		async:false,
		url:"load.php",
		data:{pcode:pcode},
		type:"POST",
		dataType:"json",
		success: function(data){
			var str="";
			for(var k in data){
				str=str+"<option value='"+data[k][1]+"'>"+data[k][2]+"</option>";
			}
			$("#shi").html(str);
		}
	});
}

//加载区信息
function LoadQu(){
	//取父级代号
	var pcode =$("#shi").val();
	//根据父级代号查数据
	$.ajax({
		//不需要取消异步
		url:"load.php",
		data:{pcode:pcode},
		type:"POST",
		dataType:"json",
		success: function(data){
			var str="";
			for(var k in data){
				str=str+"<option value='"+data[k][1]+"'>"+data[k][2]+"</option>";
			}
			$("#qu").html(str);
		}
	});
}

</script>

<pre>
mysql> select * from chinastates;
+----+----------+----------+----------------+
| id | AreaCode | AreaName | parentareacode |
+----+----------+----------+----------------+
|  1 | 0001     | 中国     | 0000           |
|  2 | 11       | 北京     | 0001           |
|  3 | 1101     | 北京市辖 | 11             |
|  4 | 110101   | 东城区   | 1101           |
|  5 | 110102   | 西城区   | 1101           |
|  6 | 110103   | 崇文区   | 1101           |
|  7 | 110104   | 宣武区   | 1101           |
|  8 | 110105   | 朝阳区   | 1101           |
|  9 | 110105   | 朝阳区   | 1101           |
| 10 | 110106   | 丰台区   | 1101           |
| 11 | 110107   | 石景山区 | 1101           |
| 12 | 110108   | 海定区   | 1101           |
| 13 | 110109   | 房山区   | 1101           |
| 14 | 12       | 湖南省   | 0001           |
| 15 | 1201     | 娄底市   | 12             |
| 16 | 120101   | 娄星区   | 1201           |
| 17 | 120102   | 双峰县   | 1201           |
| 18 | 120103   | 涟源市   | 1201           |
| 19 | 120104   | 冷水江市 | 1201           |
| 20 | 120105   | 新化县   | 1201           |
| 21 | 1202     | 长沙市   | 12             |
| 22 | 120201   | 雨花区   | 1202           |
+----+----------+----------+----------------+
</pre>
</body>
</html>