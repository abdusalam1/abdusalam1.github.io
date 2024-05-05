
var Origin_Button=document.querySelector('#Origin_Button');
var Allusion_Button=document.querySelector('#Allusion_Button');
var Custom_Button=document.querySelector('#Custom_Button');
var Allusion_1_Button=document.querySelector('#Allusion_1_Button');
var Allusion_2_Button=document.querySelector('#Allusion_2_Button');
var Allusion_3_Button=document.querySelector('#Allusion_3_Button');
var Allusion_4_Button=document.querySelector('#Allusion_4_Button');
var Allusion_5_Button=document.querySelector('#Allusion_5_Button');
var CustomButton_1=document.querySelector('#CustomButton_1');
var CustomButton_2=document.querySelector('#CustomButton_2');
var CustomButton_3=document.querySelector('#CustomButton_3');
var CustomButton_4=document.querySelector('#CustomButton_4');
var CustomButton=document.querySelector('.CustomButton');
var LittleButton=document.querySelector('.LittleButton');

var Origin = document.querySelector('#Origin');
var Allusion = document.querySelector('#Allusion');
var Custom_1 = document.querySelector('#Custom_1');
var Custom_2 = document.querySelector('#Custom_2');
var Custom_3 = document.querySelector('#Custom_3');
var Custom_4 = document.querySelector('#Custom_4');
var Allusion_1 = document.querySelector('#Allusion_1');
var Allusion_2 = document.querySelector('#Allusion_2');
var Allusion_3 = document.querySelector('#Allusion_3');
var Allusion_4 = document.querySelector('#Allusion_4');
var Allusion_5 = document.querySelector('#Allusion_5');

function OnclickPlay(){
function showDiv(x){
        HideOnBush();
        x.style.visibility = "visible";
}
Origin_Button.onclick=function(){
    LittleButton.style.visibility="hidden";
    CustomButton.style.visibility="hidden";
    showDiv(Origin);
    HideLittleButton();
    HideCustomButton();
};
Allusion_Button.onclick=function(){
    LittleButton.style.visibility="hidden";
    CustomButton.style.visibility="hidden";
    showDiv(Allusion_1);
    LittleButton.style.visibility="visible";
    HideCustomButton();
    VisibleLittleButton();
};
Custom_Button.onclick=function(){
    LittleButton.style.visibility="hidden";
    CustomButton.style.visibility="hidden";
    showDiv(Custom_1);
    CustomButton.style.visibility="visible";
    HideLittleButton();
    VisibleCustomButton();
};
CustomButton_1.onclick=function(){
    showDiv(Custom_1);
};
CustomButton_2.onclick=function(){
    showDiv(Custom_2);
}
CustomButton_3.onclick=function(){
    showDiv(Custom_3);
}
CustomButton_4.onclick=function(){
    showDiv(Custom_4);
}
Allusion_1_Button.onclick=function(){
    showDiv(Allusion_1);
};
Allusion_2_Button.onclick=function(){
    showDiv(Allusion_2);
};
Allusion_3_Button.onclick=function(){
    showDiv(Allusion_3);
};
Allusion_4_Button.onclick=function(){
    showDiv(Allusion_4);
};
Allusion_5_Button.onclick=function(){
    showDiv(Allusion_5);
};
}
function HideOnBush(){
    Origin.style.visibility = "hidden";
    Allusion.style.visibility = "hidden";
    Allusion_1.style.visibility = "hidden";
    Allusion_2.style.visibility = "hidden";
    Allusion_3.style.visibility = "hidden";
    Allusion_4.style.visibility = "hidden";
    Allusion_5.style.visibility = "hidden";
    Custom_1.style.visibility = "hidden";
    Custom_2.style.visibility = "hidden";
    Custom_3.style.visibility = "hidden";
    Custom_4.style.visibility="hidden";
}
function HideLittleButton(){
    Allusion_1_Button.style.left = "-180px";
    Allusion_2_Button.style.left = "-180px";
    Allusion_3_Button.style.left = "-180px";
    Allusion_4_Button.style.left = "-180px";
    Allusion_5_Button.style.left = "-180px";
}
function VisibleLittleButton(){
    Allusion_1_Button.style.left = "-80px";
    Allusion_2_Button.style.left = "-80px";
    Allusion_3_Button.style.left = "-80px";
    Allusion_4_Button.style.left = "-80px";
    Allusion_5_Button.style.left = "-80px";
}
function HideCustomButton(){
    CustomButton_1.style.left ="-180px";
    CustomButton_2.style.left ="-180px";
    CustomButton_3.style.left ="-180px";
    CustomButton_4.style.left ="-180px";
}
function VisibleCustomButton(){
    CustomButton_1.style.left ="-80px";
    CustomButton_2.style.left ="-80px";
    CustomButton_3.style.left ="-80px";
    CustomButton_4.style.left ="-80px";
}


OnclickPlay();
