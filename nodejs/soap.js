var soap = require('soap');
var url = 'http://www.webxml.com.cn/WebServices/WeatherWebService.asmx?wsdl';
var args = { byProvinceName: '湖南'};
var args2 = {theCityName: '长沙'}
soap.createClient(url, function(err, client) {
  client.getSupportCity(args, function(err, result) {
    if (err) {
      console.log(err);
    }else {
      console.log(result);
    }  
  });
  client.getWeatherbyCityName(args2, function(err, result) {
    if (err) {
      console.log(err);
    }else {
      console.log(result, typeof result);
    }  
  });
});