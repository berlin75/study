window.addEventListener('load', () => {	
	// 子菜单点击展开
	document.querySelectorAll('ol>li').forEach(node => {
		node.onclick = () => {
			let child = node.querySelector('ul')
			if(child) child.style.maxHeight = child.style.height > 0 ? '0px' : '800px'
		}
	})
	// 子菜单点击展开

	// 侧边导航与内容联动 /////////////
	function related(){
		let mainEle = document.querySelector('main')
		let h = window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight; //浏览器可视区域高度
		let ids = []; 
		for(let ele of mainEle.querySelectorAll('div[id]')){ 
			if(ele.getBoundingClientRect().top < h) ids.unshift(ele.id)  // 检测元素是否在浏览器视口内部
		}
		
		let olEle = document.querySelector('ol')
		olEle.querySelectorAll('a').forEach(node => node.style.color = '') // 所有连接去掉颜色
		olEle.querySelectorAll('ul').forEach(node => node.style.maxHeight = '0px') // 所有子菜单折叠
		
		let currentA = olEle && olEle.querySelector(`[href="#${ids[0]}"`)
		if(currentA){
			currentA.style.color = 'rgba(9,136,233,1)'
			if(currentA.parentNode.parentNode.tagName === 'UL'){
				currentA.parentNode.parentNode.style.maxHeight = '800px'
			}
			if(currentA.nextElementSibling && currentA.nextElementSibling.tagName === 'UL'){
				currentA.nextElementSibling.style.maxHeight = '800px'
			}
		}
	}
	related();
	var timer;
	window.addEventListener('scroll', () => {
		clearTimeout(timer)
		timer = setTimeout(related, 300)
	})
	// 侧边导航与内容联动

	// textarea高度自适应
  document.querySelectorAll('textarea').forEach(textarea => {
    // textarea.scrollTop = 0; //防抖动
    textarea.style.height = textarea.scrollHeight + 'px';
	})
})


/*
$(document).ready(function(){
  //返回顶部动画代码
  $('body').append('<div id="totop" title="返回顶部"></div>');
  var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight; //浏览器可视区域高度
  $('#totop').css({
    'width': '47px', 'height': '78px','cursor': 'pointer',
    'position': 'fixed', 'right': '10px', 'top': '500px',
    'background': 'url(./image/top.png) no-repeat'
  }).hover(function(){
    $(this).css('background-image', 'url(./image/top-hover.gif)');
  },function(){
    $(this).css('background-image', 'url(./image/top.png)');
  }).click(function(){
    $(this).animate({top:'-100px'});
    $("body").stop().animate({scrollTop: 0 });
  });

  function totopanimate(){
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop; //滚动距离：可视区上面页面的高度
    if(scrollTop > 100) { //滚动高度可调
        $('#totop').stop().css('background-image', 'url(./image/top.png)').animate({top: '500px'});
    } else {
        $('#totop').stop().css('background-image', 'url(./image/top-hover.gif)').animate({top: '-100px'});
    };
    //返回顶部动画代码结束
  }

  // 侧边导航点击一级菜单
  $('ol>li').click(function(){
    var child = $(this).children('ul'); //console.log(child.height())
    child.height() > 0 ? child.css({'max-height': '0px'}) : child.css({'max-height': '800px'});
  })

  // 侧边导航高度自适应
  function sidenavheight(){
    var h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;
    $('ol').eq(0).height(h-50).css({'overflow-y':'scroll', 'overflow-x':'hidden'})
  }
  sidenavheight();

  $(window).resize(function() {
    sidenavheight();
  })

  // 检测元素是否在浏览器视口内部 /////////////////////// 
  function checkShow(obj) {
      var scrollTop = $(window).scrollTop();  // 即页面向上滚动的距离
      var windowHeight = $(window).height();  // 浏览器自身的高度
      var objOffsetTop = $(obj).offset().top;    // obj相对于document顶部的位置,包含border
      var objHeight = $(obj).outerHeight(true);  // 图片高度包括内外边距
      //在2个临界状态之间的就为出现在视野中的
      if(objOffsetTop < (scrollTop + windowHeight) && objOffsetTop + objHeight > scrollTop)
      return $(obj).attr("id");
  }

  // 侧边导航与内容联动 /////////////////////// 
  function related(){
    //获取main元素内所有含有id属性的元素集合
    //遍历集合中所有元素，选取所有在可视区内部的元素
    //选取离窗口最近的元素的id属性，映射侧边导航栏中对应的链接
    $('ol>li>ul').css('max-height', '0px');
    var ids = [];
    for(var ele of $('main div[id]')){
      var checkresult = checkShow(ele);
      checkresult && ids.push(checkresult);
    }
    // console.log(ids, ids[0])
    $('ol a[href!="#'+ ids[0] +'"]').css('color', '');
    var target = $('ol a[href="#'+ ids[0] +'"]').css('color', 'rgba(9,136,233,1)');
    var parent = target.parents('ul')[0];
    if(parent){  // 是二级导航的链接
      $(parent).css({'max-height': '800px'});
      $(parent).parent().siblings("li").children("ul").css({'max-height': '0px'});
    }else{
      $(target).parent().siblings("li").children("ul").css({'max-height': '0px'});
      $(target).siblings("ul").css({'max-height': '800px'});
    }
  }

  related();

  function scrollfn(){
    totopanimate()
    related();
  }

  var timer;
  $(window).scroll(function() {
    clearTimeout(timer);
    timer = setTimeout(scrollfn, 300);

  })

  // textarea高度自适应
  document.querySelectorAll('textarea').forEach(textarea => {
    // css代码
    // textarea.style.width = "100%";
    // textarea.style.height = 'auto';
    textarea.scrollTop = 0; //防抖动
    textarea.style.height = textarea.scrollHeight + 'px';
  })
})
*/
