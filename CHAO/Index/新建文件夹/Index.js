$(document).ready(function(){
    $(".Down").animate({'top':'530px'},1500);
    $(".Mid").animate({'height':'500px'},1500,function(){
        $(".Mid-content").fadeIn(800);
    });
});