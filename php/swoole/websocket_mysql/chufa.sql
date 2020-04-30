DELIMITER $$
/*更新触发器*/
DROP TRIGGER IF EXISTS swoole_test_is_update;
$$
CREATE TRIGGER swoole_test_is_update AFTER UPDATE ON swoole_test FOR EACH ROW
BEGIN
  UPDATE `is_update`
  SET    is_update = 1
  WHERE  TABLE_NAME = 'swoole_test';
END;
$$
/*添加触发器*/
DROP TRIGGER IF EXISTS swoole_test_is_insert;
$$
CREATE TRIGGER swoole_test_is_insert AFTER UPDATE ON swoole_test FOR EACH ROW
BEGIN
  UPDATE `is_update`
  SET    is_update = 1
  WHERE  TABLE_NAME = 'swoole_test';
END;
$$
/*删除触发器*/
DROP TRIGGER IF EXISTS swoole_test_is_delete;
$$
CREATE TRIGGER swoole_test_is_delete AFTER UPDATE ON swoole_test FOR EACH ROW
BEGIN
  UPDATE `is_update`
  SET    is_update = 1
  WHERE  TABLE_NAME = 'swoole_test';
END;
$$
DELIMITER ;
