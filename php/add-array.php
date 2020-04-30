<?php
echo "<h1>三维数组forecach</h1>";

$wage = array(
    "大一" => array(
        array(1, '张', '班长', '19'),
        array(2, '李','学委','18'),
        array(3, '王','学生','19'),
    ),
    "大二" => array(
        array(1, '赵', '班长', '19'),
        array(2, '周','学委','18'),
        array(3, '郭','学生','19')
    ),
    "大三" => array(
        array(1, '孙' , '班长' , '19'),
        array(2, '鲁' , '学委' , '18'),
        array(3, '林' , '学生' , '19')
    )
);
foreach ($wage as $table) {
    echo '<table border="1"; width="600";align="center">';
    echo '<caption><h3>个人信息</h3></caption>';
    echo '<tr bgcolor="#DDDDDD">';
    echo '<td>编号</td><td>姓名</td><td>职位</td><td>年龄</td>';
    echo '</tr>';
    foreach ($table as $row) {
        echo '<tr>';
        foreach ($row as $col) {
            echo '<td>'.$col.'</td>';
        }
        echo '</tr>';
    }
    echo "</table>";
}

echo "<hr>";

$add=array(
	"北京市"=>array("朝阳区","海定区","东城区","中关村"),
	"湖南省"=>array(
		"长沙市"=>array("雨花区","开福区","岳麓区","暮云县"	),
		"娄底市"=>array("娄星区","双峰县","涟源市","新化县"	),
		"湘潭市"=>array("雨湖区","岳塘区","湘乡市","韶山市"	),
		"株洲市"=>array("天元区","荷塘区","石峰区","茶陵县"	,"炎陵县","株洲县"),
		"邵阳市"=>array("邵东县","双清区","大祥区","邵阳县"	,"洞口县")
	),
	"湖北省"=>array(
		"武汉市"=>array("江汉区","汉阳区","青山区","江夏区"	),
		"黄冈市"=>array("黄冈区","英山县","麻城市","罗田县"	)
	),
	"广东省"=>array(
		"广州市"=>array("白云区","黄浦区","番禺区","南沙区","增城区","花都区"	),
		"深圳市"=>array("福田区","罗湖区","宝安区","龙岗区"	,"龙华区"),
		"东莞市"=>array("莞出区","常平镇","万江区","虎门镇"	),
		"珠海市"=>array("狮山街道","吉大街道","湾仔街道","南屏镇"	),
		"惠州市"=>array("惠城区","惠阳区","惠东县","龙门县"	),
		"佛山市"=>array("南海区","顺德区","高明区","三水区"	)
	)
);

foreach($add as $key=>$value){
	echo "<table border=1>";
	echo "<caption><h3>".$key."</h3></caption>";
	
	foreach($value as $key=>$value){ 
		echo "<tr>";
		if(is_string($key)){
			echo "<td><b>".$key."</b></td>";
		}else{
			echo "<td>".$value."</td>";
            continue;
		}

		foreach($value as $key=>$value){
			echo "<td>".$value."</td>";
		}
		echo "</tr>";
	}
	echo "</table>";
}

?>

<div style="position:fixed;right:100px;top:50px;">
	<h2>json应用：select </h2>
	<select id="province">  
        <option>---省份---</option>  
    </select>  
    <select id="city">  
        <option>---城市---</option>  
    </select>  
	<p><a href="http://www.w3school.com.cn/jsref/met_select_add.asp">HTML DOM Option 对象  HTML DOM Select 对象</a></p>
</div>

<script>  
window.onload=function() {  
    var pro_json={"1":"北京", "2":"山东"}; // json字符串  
    var city_json={                        // json字符串, 同时对应的值是json串  
        "1":{"000":"海淀", "001":"朝阳", "002":"昌平"}, 
        "2":{"010":"济南", "020":"青岛", "030":"烟台"}
    }; 
    console.log("typeof: ", typeof pro_json);
    console.log("typeof: ", typeof city_json);
    var province=document.getElementById("province");  
    for(var i in pro_json)  province.add(new Option(pro_json[i], i)); 
    // json类似于Array, json格式冒号前面的字符串相当于数组的索引, json格式冒号后面的相当于数组的值  
    //new Option(显示的值, html option元素的value值,true,true)   两个true分别表示默认被选中和有效

    document.getElementById("province").onchange=function(){  
        var pro_value=document.getElementById("province").value;  
        if (pro_value == undefined) return;  

        var city_tmp = document.getElementById("city");  
        city_tmp.options.length = 1;  
        var city_select = city_json[pro_value];  
        console.info(city_select);  
        for (i in city_select)  city_tmp.add(new Option(city_select[i], i));  
    }  
} 
</script>  

