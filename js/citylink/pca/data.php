<?php
    $provincecode=isset($_GET['provincecode'])?$_GET['provincecode']:'';//接收省键值
    $citycode=isset($_GET['citycode'])?$_GET['citycode']:'';//接收城市键值
    $conn=mysqli_connect('localhost','root','','pca');
    mysqli_query($conn, "set names utf8");
    if($provincecode!=""){
        $sql="select * from city where provincecode=$provincecode";
        $result=mysqli_query($conn, $sql);
        $responsedata = '<select onchange="query(this.options[this.selectedIndex].value, 2)">';
        $responsedata .= "<option value='-1' selected>请选择城市</option>";
        while($row=mysqli_fetch_row($result)){ 
            $responsedata .= "<option value='$row[1]'>$row[2]</option>";
        }
        $responsedata .= "</select>";
        echo $responsedata;
    }

    if($citycode!=""){
        $sql="select * from area where citycode=$citycode";
        $result=mysqli_query($conn, $sql);
        echo "<select>";
        echo "<option value='-1' selected>请选择县</option>";
        while($row=mysqli_fetch_row($result)){
            echo "<option value='$row[1]'>$row[2]</option>";
        }
        echo "</select>";
    }

