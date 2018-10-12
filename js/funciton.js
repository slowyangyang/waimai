//1.透明度轮播图
//参数：
//参数1:轮播点元素集合
//参数2:图片元素集合
//参数3:banner盒子元素
//参数4:左箭头元素
//参数5:右箭头元素
//参数6:轮播点选中时类名(string)
//参数7:自动轮播的时间间隔(number)ms
function banner_oi(btns,imgs,banner,lbtn,rbtn,hot,second){
	//2.定义变量
	let num=0;
	let t;
	//3.初始状态，让第一张图片显示/层级提高
//	btns[0].style.background='#fff'
    btns[0].classList.add(hot);
	imgs[0].style.opacity=1;
	for(let i=0;i<btns.length;i++){
		btns[i].onmouseover=function(){
			for(let j=0;j<imgs.length;j++){
				imgs[j].style.opacity=0;
//				btns[j].style.background='#333';
                btns[j].classList.remove(hot);
			}
			imgs[i].style.opacity=1;
//			btns[i].style.background='#fff';
			btns[i].classList.add(hot);
			num=i;
		}
	}
//	4.自动轮播
	t=setInterval(move,second);
	function move(){
		num++;
		if(num==imgs.length){
			num=0;
		}
		for(let j=0;j<imgs.length;j++){
				imgs[j].style.opacity=0;
//				btns[j].style.background='#333';
				btns[j].classList.remove(hot);
		}
		imgs[num].style.opacity=1;
//		btns[num].style.background='#fff';
        btns[num].classList.add(hot);
	}
//	5.鼠标移入banner消除时间间隔函数
	banner.onmouseover=function(){
		clearInterval(t);
	}
//	6.鼠标移出继续时间间隔函数
	banner.onmouseout=function(){
		t=setInterval(move,second);
	}
//	7、右箭头点击
//	rbtn.onclick=function(){
//		move();
//	}
////	8.左箭头点击
//	lbtn.onclick=function(){
//		/*if(!flag){
//			return;
//		}
//		flag=false;*/
//		movel();
//	}
//	function movel(){
//		num--;
//		if(num<0){
//			num=imgs.length-1;
//		}
//		for(let j=0;j<imgs.length;j++){
//				imgs[j].style.opacity=0;
////				btns[j].style.background='#333';
//				btns[j].classList.remove(hot);
//				/*flag=true;*/
//		}
//		imgs[num].style.opacity=1;
////		btns[num].style.background='#fff';
//		btns[num].classList.add(hot);
//		/*flag=true;*/
//	}
//	9.窗口失去焦点，暂停时间间隔函数
	window.onblur=function(){
		clearInterval(t);
	}
//	10.窗口获得焦点，继续时间间隔函数
	window.onfocus=function(){
		t=setInterval(move,second);
	}
}	

//选项卡
function xuanxiangka(li,list,hot){
	list[0].style.display='block';
	//2.
	for(let i=0;i<li.length;i++){
		//鼠标移入,子元素出现
		li[i].onmouseover=function(){
			//让其余子元素全部消失
			for(let j=0;j<list.length;j++){
				list[j].style.display='none';
				li[j].classList.remove(hot);
				
			}
			//当前子元素出现
			list[i].style.display='block';
			li[i].classList.add(hot);
		}
		//3。鼠标移出时，子元素消失
//		li[i].onmouseout=function(){
//			list[i].style.display='none';
//		}
	}
}


//左右轮播
function banner_lr(btns,imgs,banner,lbtn,rbtn,hot){
	let now = 0;
	let next = 0;
	let widths=parseInt(getComputedStyle(banner,null).width);
	let flag=true;
	btns[0].classList.add(hot);
	imgs[0].style.left = 0;
	for(let i=0;i<btns.length;i++){
		btns[i].onmouseover = function(){
			for(let j=0;j<btns.length;j++){
				btns[j].classList.remove(hot);
				imgs[j].style.left = -widths+"px";
			}
			btns[i].classList.add(hot);
			imgs[i].style.left = 0;
			now=i;
			next=i;
		}
	}

	// 自动轮播
//	t = setInterval(move,1000);
	function move(){
		next++;
		if(next == imgs.length){
			next = imgs.length-1;
			return;
		}
		imgs[now].style.left = 0;
		imgs[next].style.left = widths + "px";
		animate(imgs[now],{left:-widths},function(){
			for(let j=0;j<btns.length;j++){
				btns[j].classList.remove(hot);
//				flag = true;
			}
		});
		animate(imgs[next],{left:0},function(){
			btns[next].classList.add(hot);
//			flag = true;
		});
		now = next;
	}

//	banner.onmouseover = function(){
//		clearInterval(t);
//	}
//	banner.onmouseout = function(){
//		t = setInterval(move,1000);
//	}

	function moveL(){
//		if(!flag){
//			return;
//		}
//		flag = false;
		next--;
		if(next == -1){
			next = 0;
			return;
		}
		imgs[now].style.left = 0;
		imgs[next].style.left = -widths + "px";
		animate(imgs[now],{left:widths},function(){
			for(let j=0;j<btns.length;j++){
				btns[j].classList.remove(hot);
//				flag = true;
			}
		});
		animate(imgs[next],{left:0},function(){
			btns[next].classList.add(hot);
//			flag = true;
		});
		now = next;
	}
	
	lbtn.onclick = function(){
		moveL();
	}
	rbtn.onclick = function(){
		/*if(!flag){
			return;
		}
		flag = false;*/
		move();
	}
	/*window.onblur = function(){
		clearInterval(t);
	}
	window.onfocus = function(){
		t = setInterval(move, 1000);
	}*/

}
