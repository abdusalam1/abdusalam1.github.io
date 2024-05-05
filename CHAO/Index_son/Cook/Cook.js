console.log("成功调用函数");
var fivePic= document.getElementsByClassName('Cook');
var fivePic2= document.getElementsByClassName('toCook');
function test(){
    return fivePic;
}
console.log(test());
var maxNum=9;
var nowNum=1;
function show() {
    again();
    for(let i=0;i<5;i++){
    let extraNum=nowNum;
    extraNum=extraNum+i;
    extraNum=extraNum%maxNum;
    console.log(extraNum);
    fivePic[i].src="Img/"+"toCook"+extraNum+".png";
    fivePic2[i].src="Img/"+"Cook"+extraNum+".png";
    }
    console.log("reshow");
}
function again(){
   nowNum=nowNum%maxNum;
}
function clickPlay(){
    let left=document.getElementById('fiveIcon_left');
    let right=document.getElementById('fiveIcon_right');
    console.log(left);
    left.onclick = function(){
        nowNum=nowNum+maxNum-5;
        again();
        console.log(nowNum);
        show();
    };
    right.onclick = function(){
        nowNum=nowNum+5;
        again();
        show();
    };
    console.log(nowNum);
}

clickPlay(); 