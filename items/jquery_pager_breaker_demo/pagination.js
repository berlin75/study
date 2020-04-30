var pageObj={
    ID: null,      //分页层容器的id
    contentCount: 0,  //每页显示数据的条数
    showNum: 0,    //显示带数字的按钮个数
    NUM: 0,        //实际带数字的按钮个数
    clickNum: 0,   //上一页下一页按钮点击的次数
    clickPage: 1,  //页面的点击默认为第一页
    DATA: null,    //保存传过来的数据

    init: function(options){  
        this.ID = options.id;
        this.contentCount = options.contentCount;
        this.showNum = options.shownum;
        this.DATA = options.data; 
        this.NUM = Math.ceil(this.DATA.length/this.contentCount); //向上取整
        this.viewPage(options);
        this.addPageNum(options);
        this.clickPre(options);
        this.clickNext(options);
        this.clickStart(options);
        this.clickEnd(options);
        this.clickSpan(options);
    },
    //页面显示功能
    viewPage: function(options){ console.log(this.clickPage + '/' + this.NUM);
        if(this.clickPage == this.NUM){ //最后一个数字按钮
            var result = this.DATA.slice((this.clickPage-1)* this.contentCount); //范围,参数1开始不包括参数2
            options.callback(result);
        }
        else{
            var result = this.DATA.slice((this.clickPage-1)*this.contentCount, (this.clickPage-1)*this.contentCount+this.contentCount);
            options.callback(result);
        }
    },
    //设置分页按钮及显示按钮的个数
    addPageNum: function(){
        var html = '<span id="start">首页</span>';
        html +='<span id="pre">上一页</span><div id="mid">';

        for(var i = 0;i<this.NUM;i++){
            if(i==0){
                html += "<span i='"+(i+1)+"' class='btnnum active'>"+(i+1)+"</span>";
            }else{
                html += "<span i='"+(i+1)+"' class='btnnum'>"+(i+1)+"</span>";
            }
        }

        html += '</div><span id="next">下一页</span>';
        html += '<span id="end">尾页</span>';

        $("#"+this.ID).html(html);
        var width = parseInt(this.showNum)*(parseInt($("#mid>span").css("width"))+10);//10位span的margin值
        $("#mid").css("width",width);
    },
    //点击上一页按钮
    clickPre: function(options){
        var me = this;
        $("#pre").click(function(){
            me.clickNum>0 ? me.clickNum-- : me.clickNum=0;
            $("#mid>span:eq("+me.clickNum+")").show().attr("class","active").siblings().removeClass();
            me.clickPage = me.clickNum+1;
            me.viewPage(options);
        });
    },
    //点击下一页按钮
    clickNext: function(options){
        var me=this;
        $("#next").click(function(){
            me.clickNum < me.NUM - me.showNum && me.clickNum++;
            if(me.clickNum>0){
                $("#mid>span:eq("+ (me.clickNum-1)+")").hide();
                $("#mid>span:eq("+ (me.clickNum)+")").show().attr("class","active").siblings().removeClass();
            }
            me.clickPage = me.clickNum+1;
            me.viewPage(options);
        });
    },
    //点击首页
    clickStart: function(options){
        var me = this; 
        $("#start").click(function(){
            me.clickNum = 0;
            $("#mid>span").show();
            $("#mid>span:eq("+0+")").attr("class","active").siblings().removeClass();
            me.clickPage = 1;
            me.viewPage(options);
        })
    },
    //点击尾页
    clickEnd: function(options){
        var me = this;
        $("#end").click(function(){
            me.clickNum = me.NUM- me.showNum;
            for(var k=0;k<me.clickNum;k++){
                $("#mid>span:eq("+k+")").hide();
            }
            $("#mid>span:eq("+(me.NUM-1)+")").show().attr("class","active").siblings().removeClass();
            me.clickPage = me.NUM;
            me. viewPage(options);
        })
    },
    //点击分页数字
    clickSpan: function(options){
        var me = this;
        $("#mid>span").click(function(){
            $(this).attr("class","active").siblings().removeClass();
            me.clickPage = $(this).attr("i");
            me. viewPage(options);
        })
    },
};