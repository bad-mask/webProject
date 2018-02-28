/* 
	Xie Kai's JavaScript Document.
	After Miaowei Classroom learning, completely write their own code library.
*/

/*
typeof 用以获取一个变量的类型，typeof 一般只能返回如下几个结果：number，boolean，string，function，object，undefined。
使用 typeof 来获取一个变量是否存在，对于 Array、Null 等特殊对象使用 typeof 一律返回 object，这正是 typeof 的局限性。
instanceof 判断一个变量是否是某个对象的实例。*/
/*
==:两边值类型不同时，要先进行类型转换，再比较；
===:不做类型转换，类型不同的一定不等。*/
function $( v ){
	if( typeof v === 'function' ){	//Èç¹ûµÈÓÚº¯Êý£¬¾ÍÔÚÒ³Ãæ¼ÓÔØÍêÖ®ºóÖ´ÐÐ´úÂë
		window.onload = v;
	} else if ( typeof v === 'string' ) {	//Èç¹ûµÈÓÚ×Ö·û´®£¬ÄÇÃ´¾Í²éÕÒid
		return document.getElementById(v);
	} else if ( typeof v === 'object' ) {	//Èç¹ûµÈÓÚ¶ÔÏó£¬¾ÍÖ±½Ó·µ»Ø¶ÔÏó
		return v;
	}
}


//通过 document.getElementById(id).style.XXX 就可以获取到 XXX 的值，但意外的是，这样做只能取到通过内嵌方式设置的样式值，即 style 属性里面设置的值。

/*currentStyle 是 IE 浏览器自娱自乐的一个属性，其与 element.style 可以说是近亲，至少在使用形式上类似，element.currentStyle，
差别在于 element.currentStyle 返回的是元素当前应用的最终 CSS 属性值（包括外链 CSS 文件，页面中嵌入的 <style> 属性等）。*/
function getStyle( obj, attr ){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle( obj )[attr];
}


/*
clearInterval() 方法可取消由 setInterval() 设置的 timeout；clearInterval() 方法的参数必须是由 setInterval() 返回的 ID 值；*/
function doMove ( obj, attr, dir, target, endFn ) {
	
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	
	clearInterval( obj.timer );
	
	obj.timer = setInterval(function () {
		
		var speed = parseInt(getStyle( obj, attr )) + dir;			// ²½³¤
		
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) { //第二个条件不太明白啊
			speed = target;
		}
		
		obj.style[attr] = speed + 'px';
		
		if ( speed == target ) {
			clearInterval( obj.timer );
			
			endFn && endFn();
			
		}
		
	}, 30);
}


function shake ( obj, attr, endFn ) {
	var pos = parseInt( getStyle(obj, attr) );
	var arr = [];			// 20, -20, 18, -18 ..... 0
	var num = 0;
	var timer = null;
		
	for ( var i=20; i>0; i-=2 ) {
		arr.push( i, -i );
	}
	arr.push(0);
	if(obj.onOff !== true ){	//¿ª¹ØÈç¹û²»µÈÓÚtrue£¬¾ÍÖ´ÐÐÏÂÃæµÄ´úÂë ×¢£º±ÜÃâÖØ¸´Ê¹ÓÃ¶¶
		clearInterval( obj.shake );
		obj.shake = setInterval(function (){
			obj.onOff = true;	//¿ªÊ¼Ö´ÐÐµÄÊ±ºò£¬Ò»Ö±Îªtrue£¬µ«ÊÇÕâÀïµÄtrueÊÇ¹Ø±Õ
			obj.style[attr] = pos + arr[num] + 'px';
			num++;
			if ( num === arr.length ) {
				clearInterval( obj.shake );
				endFn && endFn();
				obj.onOff = false;	//Ö´ÐÐÍêÖ®ºó£¬¾Í±ä³Éflase£¬È»ºóÓÖ¿ÉÒÔ¿ªÊ¼µã»÷
			}
		}, 50);
	}
}


