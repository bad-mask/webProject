function $( v ){
	if (typeof v === 'function' ) {
		window.onload = v;
	}else if (typeof v === 'string') {
		return document.getElementById(v);
	}else if (typeof v === 'object') {
		return v;
	}
}

function getStyle(obj, attr) {
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

/*
obj : 要移动的目标物体；
attr : 要移动的方向；
dir : 图片的运行速度；
target : 在移动的方向上，可活动的距离；
endFn : 满足条件时，执行此方法。*/
function doMove(obj, attr, dir, target, endFn){
	dir = parseInt(getStyle(obj, attr)) < target ? dir : -dir;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var speed = parseInt(getStyle(obj, attr)) + dir;
		if (speed > target && dir > 0 || speed < target && dir < 0) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if (speed == target) {
			clearInterval(obj.timer);
			endFn && endFn();
		}
	}, 30);
}

function shake(obj, attr, endFn) {
	var pos = parseInt(getStyle(obj, attr));
	var arr = [];
	var num = 0;
	var timer = null;

	for (var i = 20; i > 0; i-=2) {
		arr.push(i, -i);
	}
	arr.push(0);
	if (obj.onOff !== true) {
		clearInterval(obj.shake);
		obj.shake = setInterval(function(){
			obj.onOff = true;
			obj.style[attr] = pos + arr[num] + 'px';
			num++;
			if (num === arr.length) {
				clearInterval(obj.shake);
				endFn && endFn();
				obj.onOff = false;
			}
		}, 50);
	}
}