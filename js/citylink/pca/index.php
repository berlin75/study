<!doctype html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>省市区数据库</title>
<script>
    function query(citycode,type){
        var request=new XMLHttpRequest();
        url = "data.php?"+(type == 1?"provincecode":"citycode")+"="+citycode+'&n='+Math.random();
        request.open("GET", url, true);
        request.send();
        request.onreadystatechange=function(){ console.log(request.readyState+" : "+request.status);
            if(request.readyState===4){
                if(request.status===200){
                    if(type == 1){
                        document.getElementById("city").innerHTML=request.responseText;
                    }else if(type == 2){
                        document.getElementById("area").innerHTML=request.responseText;
                    }
                }else{
                    alert("发生错误："+request.status);
                }
            }
        }
    }
</script>
</head>
<body>
    <p>数据库pca -> province city area;天津市数据错误，直辖市数据不完善</p>
    <p>ajax实时查询数据库，PHP动态生成下级数据</p>
    <from id='form1'>
        <select id='province' onchange="query(this.options[this.selectedIndex].value, 1)">
            <option value='-1' selected>请选择省份</option>
            <?php
                $conn=mysqli_connect('localhost','root','','pca');
                mysqli_query($conn, "set names utf8");
                $sql='select * from province';
                $result=mysqli_query($conn, $sql);
                while($row=mysqli_fetch_row($result)){ 
                    echo "<option value='$row[1]'>$row[2]</option>";
                }
            ?>
        </select>
        
        <span id='city'>
            <select>
                <option value='-1' selected>请选择城市</option>
            </select>
        </span>
        <span id='area'>
            <select>
                <option value='-1' selected>请选择县</option>
            </select>
        </span>
    </form>
</body>
</html>