$(document).ready(function(){
    $(".Down").animate({'top':'730px'},1500);
    $(".Mid").animate({'height':'700px'},1500,function(){
        $(".Mid-content").fadeIn(800);
    });
});