console.log("成功调用函数");
var oUL=document.querySelector(".Card ul");
oUL.innerHTML+=oUL.innerHTML;
let aLI=document.querySelectorAll(".PicCard");
let left_icon=document.querySelector(".Card_left");
let right_icon=document.querySelector(".Card_right");
var speed=2;

function move(){
    if(oUL.offsetLeft >-(speed*10) ){
        oUL.style.left = -oUL.offsetWidth/2+'px';
    }
    oUL.style.left= oUL.offsetLeft+speed+'px';
}
var timer=setInterval(move,30);


