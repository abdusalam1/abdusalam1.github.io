(function(){
  function E(a){return document.getElementById(a)}
  window.addEventListener("scroll",function(){
    console.log("scroll")
    var navbar = E("navbar");
    var scrollHeight = document.documentElement.scrollTop || window.pageYOffset;
    var bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if (scrollHeight > (bodyHeight-navbar.clientHeight)) {
      navbar.className="header nav-color-b"
    } else {
      navbar.className="header nav-color-w"
    }
  })
  function refresh(){
    var background = E("background");
    var orientation = E("orientation");
    var rect = background.getBoundingClientRect();
    orientation.style.height = rect.height + "px";
    console.log()
    orientation.style.paddingTop = 20/1894*rect.height +"px";
  }
  window.addEventListener("resize",refresh);
  refresh();
})();