$(document).ready(function(){
    $(".Front_left").animate({'left':'-1050px'},1500);
    $(".Front_right").animate({'right':'-1050px'},1500,function(){
        $("#thePic").fadeIn(800);
    });
});