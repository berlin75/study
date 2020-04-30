<?php
print "<h1>上传文件</h1>";
echo <<<_END
<form method="post" action="" enctype="multipart/form-data">
    <p>上传文件：<input type="file" name="photo[]" size="2" multiple></p>
    <p><input type="submit" value="提交"></p>
</form>
_END;

if($_FILES) {
    foreach($_FILES['photo']['type'] as $key=>$value) {
        switch ($value) {
            case 'image/jpeg': $ext = 'jpg'; break;
            case 'image/png': $ext = 'png'; break;
            case 'image/gif': $ext = 'gif'; break;
            default: $ext = ''; break;
        }
        if($ext) {
            $name = 'upload/'.date('Ymd',time()).'_'."$key.$ext";
            move_uploaded_file($_FILES['photo']['tmp_name'][$key], $name);

echo <<<_END
    <img src ="$name">
_END;
        }
    }
}