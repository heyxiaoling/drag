window.onload=function(){
	var d1=new Drag("div1");	
	d1.init();
	var d2=new ChildDrag("div2");	
	d2.init();
	console.log(ChildDrag.prototype);
}

function Drag(id){
	this.obj=document.getElementById(id);
	this.disX=0;
	this.disY=0;
}

Drag.prototype={
	constructor: Drag,
	init: function(){
		var This=this;
		this.obj.onmousedown=function(ev){
			var ev=ev||window.event;
			This.fnDown(ev);
			document.onmousemove=function(ev){
				var ev=ev||window.event;
				This.fnMove(ev);	
			};
			document.onmouseup=function(){
				This.fnUp();	
			};
			return false;
		}
	},
	fnDown: function(ev){
		this.disX=ev.clientX-this.obj.offsetLeft;
		this.disY=ev.clientY-this.obj.offsetTop;
	},
	fnMove: function(ev){
		this.obj.style.left=ev.clientX-this.disX+'px';
		this.obj.style.top=ev.clientY-this.disY+'px';
	},
	fnUp: function(){
		document.onmousemove=null;
		document.onmouseup=null;
	}	

}

extend(ChildDrag.prototype,Drag.prototype);

function ChildDrag(id){
	Drag.call(this,id);	
}


function extend(obj1,obj2){
	for(var attr in obj2){
		obj1[attr]=obj2[attr];
	}
}

ChildDrag.prototype.fnMove=function(ev){
	var l=ev.clientX-this.disX;
	var t=ev.clientY-this.disY;
	if(l<0){
		l=0;
	}else if(l>document.documentElement.clientWidth-this.obj.offsetWidth){
		l=document.documentElement.clientWidth-this.obj.offsetWidth;
	}
	
	if(t<0){
		t=0;
	}else if(t>document.documentElement.clientHeight-this.obj.offsetHeight){
		t=document.documentElement.clientHeight-this.obj.offsetHeight;
	}
	
	this.obj.style.left=l+'px';
	this.obj.style.top=t+'px';
}
