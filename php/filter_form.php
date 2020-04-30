<?php
    
    header('Content-type:text/html;charset=utf-8');

    //下拉菜单 value=>choice
    $choices = ['Eggs'=>'Eggs Benedict', 'toast'=>'Buttered Toast with jam', 'coffee'=>'piping hot coffee'];
    //单选按钮 choice=>value
    $sex = ['male'=>1, 'femail'=>2];
    $defaults['sex'] = 'male';
    //单个复选框
    $value = 'yes';
    //复选框组 choice=>value
    $sports = ['足球'=>'football', '跑步'=>'run', '壁球'=>'wall_ball'];

    if($_SERVER['REQUEST_METHOD'] == 'GET') {
?>

<form action="<?php echo htmlentities($_SERVER['SCRIPT_NAME']);?>" method="post">
    <br/>name:<input type="text" name="username">
    <br/>country:<input type="text" name="country">
    <br/>email:<input type="text" name="email">
    <br/>age:<input type="text" name="age">
    <br/>salary:<input type="text" name="salary">
    <br/>food:
        <?php echo "<select name='food'>\n";
            echo "<option value='0'>请选择喜欢的食物:</option>\n";
            foreach($choices as $key=>$choice) {
                echo "<option value='".$key."'>".$choice."</option>\n";
            }
            echo "</select>";
        ?>
    <br/>sex:
        <?php
            foreach($sex as $key=>$choice) {
                echo "<input type='radio' name='sex' value='".$choice."'";
                if($defaults['sex'] == $key) {
                    echo "checked='checked'";
                }
                echo ">".$key."\n";
            }
        ?>
    <br/><?php
            foreach($sports as $key=>$choice) {
                echo "<input type='checkbox' name='sports[]' value='".$choice."'>".$key."\n";
            }
        ?>    
    <br/>是否单身:
        <?php echo "<input type='checkbox' name='single' value='yes'>";?>
    <br/>工作起始时间:
        <input class="Wdate" type="date" name="time[]">至
        <input class="Wdate" type="date" name="time[]">
    <br/><input type="submit" value="提交">
</form>

<?php
    } else {
        // 验证必填域
        // filter_has_var函数在接收到了变量时对变量的值进行验证
        // 如果没有接收到变量$_POST['username'],例如该字段在表单中是单个的复选框,不勾选的话处理的页面是接收不到该字段的信息的
        //检查$_POST['username']长度之前首先确保它存在
        if(! (filter_has_var(INPUT_POST, 'username') && (strlen(filter_input(INPUT_POST, 'username')) > 0) )) {
            echo '请输入用户名';
            exit;
        }

        // 验证长度
        //$_POST['country']是可选的，不过如果提供了country字段，则保证在处理后要多于5个字符
        //FILTER_SANITIZE_STRING过滤器会去除HTML标记、删除二进制非ASCII字符、并对与字符编码（&）
        if(filter_has_var(INPUT_POST, 'country') && strlen(filter_input(INPUT_POST, 'country', FILTER_SANITIZE_STRING)) <=2) {
            echo 'country长度不小于2个字符';
            exit;
        }

        //验证邮箱
        $email = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        if($email === false) {
            echo '请输入正确的邮箱';
            exit;
        }

        //验证数组
        //确保$_POST['sports']存在且是一个数组
        if(! (filter_has_var(INPUT_POST, 'sports') && filter_input(INPUT_POST, 'sports', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY))) {
            echo '请选择一项运动';
            exit;
        }

        //验证复选框组
        //array_intersect 计算数组的交集
        if(array_intersect($_POST['sports'], array_values($sports)) != $_POST['sports']) {
            echo '请选择正确的运动';
            exit;
        }

        //验证单个复选框
        if(filter_has_var(INPUT_POST, 'single')) { 
            if($_POST['single'] == $value) {
                $single = true;
            } else {
                $single = false;
                echo '错误的提交';
                exit;
            }
        }

        //验证整数，如果填写了年龄则进行验证
        if(strlen(filter_input(INPUT_POST, 'age')) > 0) {
            $age = filter_input(INPUT_POST, 'age', FILTER_VALIDATE_INT);
            if($age === false) {
                echo '请输入正确的年龄';
                exit;
            }
        }

        //验证小数，如果填写了salary则进行验证
        if(strlen(filter_input(INPUT_POST, 'salary')) > 0) {
            $salary = filter_input(INPUT_POST, 'salary', FILTER_VALIDATE_FLOAT);
            if($salary === false) {
                echo '请输入正确的薪资';
                exit;
            }
        }

        //验证下拉菜单
        if(! (filter_has_var(INPUT_POST, 'food') && array_key_exists($_POST['food'], $choices))) {
            echo '请选择喜欢的食物';
            exit;
        }

        //单选按钮,验证性别
        if(! (filter_has_var(INPUT_POST, 'sex') && in_array($_POST['sex'], $sex))) {
            echo '请选择性别';
            exit;
        }

        //验证时间
        // 使用 checkdate 函数验证是否是正确的时间
        // php中的@作用是抑制代码报错,用户友好和防止报错时显示文件路径的安全问题
        if(filter_has_var(INPUT_POST, 'time')) {
            foreach($_POST['time'] as $time) {
                @list($year, $month, $day) = explode('-', $time);
                if(! @checkdate($month, $day, $year)) {
                    echo '时间错误';
                    exit;
                }
                //时间段验证（略）
            }
        }

        echo 'Hello, ',$_POST['username'];
        var_dump($_POST);
    }
?>