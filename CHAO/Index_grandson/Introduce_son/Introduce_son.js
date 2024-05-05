$(document).ready(function(){
    $(".Front_left").animate({'width':'941px'},1500);
    $(".Front_right").animate({'width': '941px'},1500,function(){
        $("#window_pic").fadeIn(800);
    });
});