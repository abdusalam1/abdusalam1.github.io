// document.addEventListener("DOMContentLoaded", function () {
//   var images = document.querySelectorAll(".comp img");
//   var index = 0;

//   function showImage() {
//       // 隐藏所有图片
//       for (var i = 0; i < images.length; i++) {
//           images[i].classList.remove("active");
//       }

//       // 显示当前图片
//       images[index].classList.add("active");

//       // 更新索引以显示下一张图片
//       index = (index + 1) % images.length;
//   }

//   // 每隔三秒轮换图片
//   setInterval(showImage, 3000);

//   // 初始化显示第一张图片
//   showImage();
// });

document.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll(".comp img");
  var index = 0;

  function showImage() {
      // 隐藏所有图片
      for (var i = 0; i < images.length; i++) {
          images[i].classList.remove("active");
      }

      // 显示当前图片
      images[index].classList.add("active");
  }

  // 点击右箭头切换到下一张图片
  document.querySelector(".right-arrow").addEventListener("click", function() {
    index = (index + 1) % images.length;
    showImage();
  });

  // 点击左箭头切换到上一张图片
  document.querySelector(".left-arrow").addEventListener("click", function() {
    index = (index - 1 + images.length) % images.length;
    showImage();
  });

  // 初始化显示第一张图片
  showImage();
});
