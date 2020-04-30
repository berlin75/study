 <form action="<?php echo BASE_URL ?>/item/update" method="post">
  <input type="text" name="item_name" value="<?php echo $item['item_name'] ?>">
  <input type="hidden" name="id" value="<?php echo $item['id'] ?>">
  <input type="submit" value="修改">
</form>

<p><a class="big" href="<?php echo BASE_URL ?>/item/index">返回</a></p>