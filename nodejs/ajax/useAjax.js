var ajax = require('./ajax');
var setting = {
	url:'http://127.0.0.1:8888/api/v4/questions/34937418/answers?include=data%5B*%5D.is_normal%2Cadmin_closed_comment%2Creward_info%2Cis_collapsed%2Cannotation_action%2Cannotation_detail%2Ccollapse_reason%2Cis_sticky%2Ccollapsed_by%2Csuggest_edit%2Ccomment_count%2Ccan_comment%2Ccontent%2Ceditable_content%2Cvoteup_count%2Creshipment_settings%2Ccomment_permission%2Ccreated_time%2Cupdated_time%2Creview_info%2Cquestion%2Cexcerpt%2Crelationship.is_authorized%2Cis_author%2Cvoting%2Cis_thanked%2Cis_nothelp%2Cupvoted_followees%3Bdata%5B*%5D.mark_infos%5B*%5D.url%3Bdata%5B*%5D.author.follower_count%2Cbadge%5B%3F(type%3Dbest_answerer)%5D.topics&offset=3&limit=20&sort_by=default',
    data:null,  //parameters  
    dataType:"JSON",    //JSON | string  
    headers: {},    //Content-Type ...  
    statusCode:{},  //500 | 404 | 200  
    type:"GET", // GET | POST  
    timeout:10, //request timeout threshold  
    beforeSend: function (req) {},  //bofore send request  
    complete: function (req) {},    //requset completely  
    success: function (data) {console.log(data)},   //request successfully  
    error:function(data){}  //request failed  
};
ajax.ajax(setting);