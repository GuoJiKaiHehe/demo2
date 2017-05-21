

$(function (){
	// 切换搜索框
new Search().init();

	function Search(){
		//搜索类；
		this.init=function(){
			// var iNow = this.i
		
			this.tabChange();
			this.focus_blur();
			
			
			return this;
		};
		this.focus_blur=function(){
			var dom=this.dom;
			var _this=this;
			var data=this.data;
			dom.oText.focus(function (){
			if( $(this).val() == data.arrText[_this.iNow] ) {
				$(this).val('');
			}
			});
			dom.oText.blur(function (){
				if( $(this).val() == '' ) {
					dom.oText.val(data.arrText[_this.iNow]);
				}
			});
		}
		this.tabChange=function(){
			
			var _this=this;
			var dom=this.dom;
			var data=this.data;
			
			dom.oText.val(data.arrText[this.iNow]);
			dom.aLi.each(function ( index ){
				$(this).click(function (){
					$(this).siblings().attr('class', 'gradient');
					$(this).attr('class', 'active');
					
					_this.iNow = index;
					
					dom.oText.val(data.arrText[_this.iNow]);
				});
			});
		}
		this.iNow=0;
		this.data={
			arrText: [
			'例如：荷棠鱼坊烧鱼 或 樱花日本料理',
			'例如：昌平区育新站龙旗广场2号楼609室',
			'例如：万达影院双人情侣券',
			'例如：东莞出事了，大老虎是谁？',
			'例如：北京初春降雪，天气变幻莫测'
			]
		}

		this.dom={
			 oText : $('#search').find('.form .text'),
			 aLi   : $('#menu li'),
		}
 
	
	}
	

// console.log(Search==window)
	
	
	// update文字弹性滑动
	(function(){
			function Notice(){
			
			var _this=this;
			this.dom={
				 oDiv  : $('.update'),
				 oUl   : $('.update').find('ul'),
				 
				 oBtnUp : $('#updateUpBtn'),
				 oBtnDown : $('#updateDownBtn'),
			};
			this.data={
					 iH : 0,
					 arrData : [
					{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
					{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
					{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
					{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' },
					{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/' },
					{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯', 'url':'http://www.miaov.com/2013/#curriculum' },
					{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦', 'url':'http://www.miaov.com/2013/#about' },
					{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间', 'url':'http://www.miaov.com/2013/#message' }
				],
				iNow:0,
				timer:null
			}

			this.init=function(){
				this._action();
				this.autoPlay();
				return this;
			};

			
			this._action=function(){
				var _this=this;
				var dom=this.dom;
				var data=this.data;
				
				var str="";

				for ( var i=0; i<data.arrData.length; i++ ) {
				str += '<li><a href="'+ data.arrData[i].url +'"><strong>'+ data.arrData[i].name +'</strong> <span>'+ data.arrData[i].time +'分钟前</span> 写了一篇新文章：'+ data.arrData[i].title +'…</a></li>';
				}
				console.log(dom.oUl);
				dom.oUl.html( str );

				dom.oBtnUp.click(function (){
					_this.doMove(-1);
				});
				dom.oBtnDown.click(function (){

					_this.doMove(1);
				});

			}
			
			this.dom.oDiv.hover(function (){
				clearInterval( _this.timer );
			}, _this.autoPlay);
			
			this.autoPlay=function() {
				var _this=this;
				_this.timer = setInterval(function () {
					
					_this.doMove(-1);
				}, 3500);
			}
			
			
			this.doMove=function( num ) {
				var data=this.data;
				var dom=this.dom;

				data.iH = dom.oUl.find('li').height();
				//alert(this.data.iNow);
				data.iNow += num;
				if ( Math.abs(data.iNow) > data.arrData.length-1 ) {
					data.iNow = 0;
				}
				if ( data.iNow > 0 ) {
					data.iNow = -(data.arrData.length-1);
				}
				dom.oUl.stop().animate({ 'top': data.iH*data.iNow }, 2200, 'elasticOut');
			}
		}
		return	new Notice().init();
	})();
	

	
	// options 选项卡切换
	(function (){
		
		fnTab( $('.tabNav1'), $('.tabCon1'), 'click' );
		fnTab( $('.tabNav2'), $('.tabCon2'), 'click' );
		fnTab( $('.tabNav3'), $('.tabCon3'), 'mouseover' );
		fnTab( $('.tabNav4'), $('.tabCon4'), 'mouseover' );
		
		function fnTab( oNav, aCon, sEvent ) {
			var aElem = oNav.children();
			aCon.hide().eq(0).show();
			
			aElem.each(function (index){
				
				$(this).on(sEvent, function (){
					aElem.removeClass('active').addClass('gradient');
					$(this).removeClass('gradient').addClass('active');
					aElem.find('a').attr('class', 'triangle_down_gray');
					$(this).find('a').attr('class', 'triangle_down_red');
					
					aCon.hide().eq( index ).show();
				});
				
			});
		}
	})();
	
	// 自动播放的焦点图
	(function (){
		var oDiv = $('#fade');
		var aUlLi = oDiv.find('ul li');
		var aOlLi = oDiv.find('ol li');
		var oP = oDiv.find('p');
		var arr = [ '爸爸去哪儿啦~', '人像摄影中的光影感', '娇柔妩媚、美艳大方' ];
		var iNow = 0;
		var timer = null;
		
		fnFade();
		
		aOlLi.click(function (){
			iNow = $(this).index();
			fnFade();
		});
		oDiv.hover(function (){ clearInterval(timer); }, autoPlay);
		
		function autoPlay() {
			timer = setInterval(function () {
				iNow++;
				iNow%=arr.length;
				fnFade();
			}, 2000);
		}
		autoPlay();
		
		function fnFade() {
			aUlLi.each(function (i){
				if ( i != iNow ) {
					aUlLi.eq(i).fadeOut().css('zIndex', 1);
					aOlLi.eq(i).removeClass('active');

				} else {
					aUlLi.eq(i).fadeIn().css('zIndex', 2);
					aOlLi.eq(i).addClass('active');
				}
			});
			oP.text(arr[iNow]);
		}
	})();
	
	//日历提示说明
	(function (){
		var aSpan = $('.calendar h3 span');
		var aImg = $('.calendar .img');
		var oPrompt = $('.today_info');
		var oImg = oPrompt.find('img');
		var oStrong = oPrompt.find('strong');
		var oP = oPrompt.find('p');
		
		aImg.hover(function (){
			var iTop = $(this).parent().position().top - 30;
			var iLeft = $(this).parent().position().left + 55;
			var index = $(this).parent().index()%aSpan.size();
			
			// console.log( $(this).parent().index()%aSpan.size() );
			
			oPrompt.show().css({ 'left': iLeft, 'top': iTop });
			oP.text($(this).attr('info'));
			oImg.attr('src', $(this).attr('src'));
			oStrong.text( aSpan.eq(index).text() );
			
			
		}, function (){
			oPrompt.hide();
		});
	})();
	
	// BBS高亮显示
	(function (){
		$('.bbs ol li').mouseover(function (){
			$('.bbs ol li').removeClass('active').eq($(this).index()).addClass('active');
		});
	})();
	
	// HOT鼠标提示效果
	(function (){
		var arr = [
			'',
			'用户1<br />人气1',
			'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
			'用户3<br />人气3',
			'用户4<br />人气4',
			'用户5<br />人气5',
			'用户6<br />人气6',
			'用户7<br />人气7',
			'用户8<br />人气8',
			'用户9<br />人气9',
			'用户10<br />人气10'
		];
		$('.hot_area li').mouseover(function (){
			
			if ( $(this).index() == 0 ) return;
			
			$('.hot_area li p').remove();
			
			$(this).append('<p style="width:'+ ($(this).width()-12) +'px; height:'+ ($(this).height()-12) +'px;">'+ arr[$(this).index()] +'</p>');
		});
	})();
});