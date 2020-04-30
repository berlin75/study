<?php
/*
 * @category Sample
 * @package Test Suit
 * @copyright 2011, 2012 Dmitry Sheiko (http://dsheiko.com)
 * @license GNU
 */
define("BASE_PATH", dirname(__FILE__) );
define("APP_PATH", realpath(BASE_PATH . "/../../"));
require_once APP_PATH . "/App/Lib/Db.php";
require_once APP_PATH . "/App/Model/UserNotification.php";

$model = new Model_UserNotification(new Lib_Db(APP_PATH . "/App/config.php"));

$recipientUid = 1;
$displayedNotificationNum = (int)$model->fetchNumberByRecipientUid($recipientUid);
?>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Server-Side Event Demo</title>
<script type="text/javascript" src="../../../../../vendors/jquery-3.3.1.min.js"></script>
</head>
<body>
<p>Recipient id: <?= $recipientUid ?></p>
<p>Notifications: <input id="notificationNum" size="4" name="some" value="<?= $displayedNotificationNum ?>" /></p>
<p>Last event arrived at: <input id="time" size="12" name="some" value="0" /></p>

<script>
(function( $ ) {
  var UID = <?= $recipientUid ?>;

  NotifierSSE = (function() {
    var _stateNode = $('#notificationNum'),
      _timeNode = $('#time'),
      _src,
      _handler = {
        onMessage : function(event) {            
          var data = JSON.parse(event.data);
          _stateNode.val(data.updatedNotificationNum);
          _timeNode.val(data.time);
        }
      };
    return {
      init : function () {
        _src = new EventSource("server.php?recipientUid=" + UID);
        console.log(_src)
        _src.addEventListener('message', _handler.onMessage, false);
      }
    }
  }());

  setTimeout(NotifierSSE.init, 40); 
})( jQuery );

</script>
</body>
</html>