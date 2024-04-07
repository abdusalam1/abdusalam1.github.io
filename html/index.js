//下滑翻页
/* const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');

page1.addEventListener('wheel', function(event) {
  if (event.deltaY < 0) {
    page2.scrollIntoView({ behavior: 'smooth' });
  }
}); */


//渐变色
function deleteColor(element) {
    var colorNameElement = element.parentNode.querySelector('.color-name');
    var selectedColor = colorNameElement.textContent.trim();
    var gradientColors = getComputedStyle(document.documentElement).getPropertyValue('--gradient-colors');
    // 从gradientColors删去selectedColor
    gradientColors = gradientColors.replace(RegExp(`${selectedColor},`), '');
    gradientColors = gradientColors.replace(RegExp(`,${selectedColor}`), '');

    document.documentElement.style.setProperty('--gradient-colors', gradientColors);
    element.parentNode.remove();
        // 获取所有颜色块
    var colorBlocks = document.querySelectorAll('.color-block');
    // 遍历所有颜色块
    colorBlocks.forEach(function(colorBlock) {
        // 获取当前颜色块的"delete-btn"
        var deleteBtn = colorBlock.querySelector('.delete-btn');
        // 隐藏"delete-btn"
        deleteBtn.style.display = 'none';
    });
}


// function showColorPicker() {
//     // 创建一个input元素，类型为color
//     var colorInput = document.createElement('input');
//     colorInput.type = 'color';
//     colorInput.style.borderRadius = '50%'; // 将边框半径设置为 50%，使其呈现圆形
// colorInput.style.opacity = '0.5'; // 设置透明度
//     var controlButtonsDiv = document.querySelector('.control-buttons');
//     controlButtonsDiv.appendChild(colorInput);
//     // 模拟点击input元素，打开颜色选择器
//     // colorInput.click();
//     // 添加change事件监听器，当用户选择颜色时触发
//     colorInput.addEventListener('change', function(event) {
//         var selectedColor = event.target.value;
//         addColorBlock(selectedColor);
//         addbkcolor(selectedColor); //增加背景颜色
//         controlButtonsDiv.removeChild(colorInput);
//         // colorInput
//     });
// }



var colorPickerAdded = false;

function showColorPicker() {
    // 获取颜色输入框元素
    var colorInput = document.querySelector('.control-btn0');
    
    // 如果已经添加了事件监听器，则直接返回
    if (colorPickerAdded) {
        return;
    }

    // 添加事件监听器以在颜色更改时触发
    colorInput.addEventListener('change', function(event) {
        // 获取用户选择的颜色值
        var selectedColor = event.target.value;
        addColorBlock(selectedColor);
        addbkcolor(selectedColor); //增加背景颜色
        
        // 在控制台输出颜色值
        console.log('用户选择的颜色是：', selectedColor);
    });
    
    // 将颜色选择器已添加标记设为true
    colorPickerAdded = true;
}



function addbkcolor(selectedColor) {
    var gradientColors = getComputedStyle(document.documentElement).getPropertyValue('--gradient-colors');
    gradientColors += `,${selectedColor}`;
    document.documentElement.style.setProperty('--gradient-colors', gradientColors);
}
function addColorBlock(selectedColor) {
    var colorBlock = document.createElement('div');
    colorBlock.className = 'color-block';

    var colorSquare = document.createElement('div');
    colorSquare.className = 'color-square1';
    colorSquare.style.background = selectedColor;

    var colorName = document.createElement('div');
    colorName.className = 'color-name';
    colorName.textContent = selectedColor;

    var deleteBtn = document.createElement('div');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = function () {
        deleteColor(this);
    };

    colorBlock.appendChild(colorSquare);
    colorBlock.appendChild(colorName);
    colorBlock.appendChild(deleteBtn);

    document.querySelector('.on-gradient').appendChild(colorBlock);
    // document.body.insertBefore(colorBlock, document.querySelector('.control-buttons'));
}


function removeColorBlock() {
    // 获取所有颜色块
    var colorBlocks = document.querySelectorAll('.color-block');
    // 遍历所有颜色块
    colorBlocks.forEach(function(colorBlock) {
        // 获取当前颜色块的"delete-btn"
        var deleteBtn = colorBlock.querySelector('.delete-btn');
        // 显示"delete-btn"
        deleteBtn.style.display = 'block';
    });
}



function refreshPage() {
location.reload(true);
}

function downloadFHD() {
// 获取渐变效果的元素
var gradientElement = document.querySelector('.gradient');

// 使用 HTML2Canvas 将渐变效果的内容转换为图片
html2canvas(gradientElement).then(function(canvas) {
    // 生成图片的 Data URL
    var dataURL = canvas.toDataURL();

    // 创建一个虚拟的 a 元素来触发下载
    var link = document.createElement('a');
    link.href = dataURL;
    link.download = 'gradient_effect.png';

    // 触发点击事件进行下载
    link.click();
});
}

var circlesVisible = true; // 初始状态为大小圆显示

function reverseGradient() {
  var colorBlocks = document.querySelectorAll('.color-block');
  var bigCircle = document.querySelector('.big-circle');
  var smallCircle = document.querySelector('.small-circle');

  if (circlesVisible) {
      // 如果大小圆已经显示，则隐藏它们并显示 color-block
      smallCircle.style.display = 'none';
      bigCircle.style.display = 'none';
      colorBlocks.forEach(function(block) {
          block.style.display = 'block';
      });
      circlesVisible = false; // 更新状态为大小圆隐藏
  } else {
      // 如果大小圆未显示，则显示它们并隐藏 color-block
      smallCircle.style.display = 'block';
      bigCircle.style.display = 'block';
      colorBlocks.forEach(function(block) {
          block.style.display = 'none';
      });
      circlesVisible = true; // 更新状态为大小圆显示
  }

  smallCircle.addEventListener('mousedown', function(event) {
      var offsetX = event.clientX - smallCircle.offsetLeft;
      var offsetY = event.clientY - smallCircle.offsetTop;

      document.addEventListener('mousemove', moveSmallCircle);

      function moveSmallCircle(event) {
          var newX = event.clientX - offsetX;
          var newY = event.clientY - offsetY;

          var centerX = bigCircle.offsetLeft + bigCircle.offsetWidth / 2;
          var centerY = bigCircle.offsetTop + bigCircle.offsetHeight / 2;

          var deltaX = newX - centerX;
          var deltaY = newY - centerY;

          var angle = Math.atan2(deltaY, deltaX);

          var gradientDirection = (angle * 180 / Math.PI) + 180;

          document.documentElement.style.setProperty('--gradient-angle', gradientDirection + 'deg');

          smallCircle.style.left = newX + 'px';
          smallCircle.style.top = newY + 'px';
      }

      document.addEventListener('mouseup', function() {
          document.removeEventListener('mousemove', moveSmallCircle);
      });
  });
}



// function reverseGradient() {
// var gradientColors = getComputedStyle(document.documentElement).getPropertyValue('--gradient-colors');
// var reversedColors = gradientColors.split(',').reverse().join(',');
// document.documentElement.style.setProperty('--gradient-colors', reversedColors);

//     // 反转 color block 顺序
// var colorBlocks = document.querySelectorAll('.color-block');
// var reversedBlocks = Array.from(colorBlocks).reverse();

// // 移动反转后的 color block 到容器
// var container = document.querySelector('.on-gradient');
// container.innerHTML = ''; // 清空容器
// reversedBlocks.forEach(function(colorBlock) {
// container.appendChild(colorBlock);
// });
// }


var slideIndex = 1;
// 创建并存储图片元素
var img1 = document.createElement("img");
img1.src = "images/ind1.jpg";
img1.alt = "图片1";

var img2 = document.createElement("img");
img2.src = "images/ind2.png";
img2.alt = "图片2";

var img3 = document.createElement("img");
img3.src = "images/ind3.png";
img3.alt = "图片3";

// 将图片元素存储在数组中
var images = [img1, img2, img3];


hex_colors1 = ['#F08FA0', '#F7CBD4', '#B0257E', '#B96493', '#0497CB', '#8B92AD', '#744C98', '#DBCA4B', '#671B25', '#A4525E', '#3D70B1'];
hex_colors2 = ['#0B0C10', '#532234', '#923659', '#B1BBC4', '#FAE5F1', '#4C5765', '#D781AA', '#718393', '#E7B1CC', '#A25F82'];
hex_colors3 = ['#000000', '#19374C', '#98DFE3', '#4691AA', '#6EB7C2', '#ACC18F', '#1B7298', '#648154', '#C4D5C3', '#4E4B5E', '#D0F4F2'];
function appendImages(images) {
  // 获取大相框和两个小相框的元素
  var bigFrame = document.querySelector('.big-slideshow-image');
  var smallFrame1 = document.getElementById('smallFrame1');
  var smallFrame2 = document.getElementById('smallFrame2');

  // 清空相框内容
  bigFrame.innerHTML = '';
  smallFrame1.innerHTML = '';
  smallFrame2.innerHTML = '';

  // 将图片添加到相框中
  bigFrame.appendChild(images[0]);
  smallFrame1.appendChild(images[1]);
  smallFrame2.appendChild(images[2]);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  // console.log("dots length:", dots.length);
console.log("slideIndex:", slideIndex);

  var dots = document.getElementsByClassName("dott");
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[slideIndex-1].className += " active";
  if(n==1)
      addDivs(hex_colors1);
    else if(n==2)
      addDivs(hex_colors2);
    else if(n==3)
      addDivs(hex_colors3);
  
  var xx=swapElements(images,0,n-1);
  appendImages(xx);

  
}

function swapElements(arr, index1, index2) {
  // 创建数组的副本
  var newArray = arr.slice();

  // 交换元素
  var temp = newArray[index1];
  newArray[index1] = newArray[index2];
  newArray[index2] = temp;

  return newArray;
}



function addDivs(colors) {
    var bigContainer = document.getElementById("big-container");
    var smallContainer = document.getElementById("small-container");

    // 清除原有的所有子元素
    bigContainer.innerHTML = "";
    smallContainer.innerHTML = "";

    // 遍历颜色列表
    colors.forEach(function(color, index) {
        var div = document.createElement("div");
        div.style.backgroundColor = color; // 将当前颜色设置为当前 div 的背景颜色

        // 创建用于显示颜色的文本节点
        var colorText = document.createTextNode(color);
        var colorSpan = document.createElement("span");
        colorSpan.appendChild(colorText);
        colorSpan.style.position = "absolute";
        colorSpan.style.bottom = "-30px";
        colorSpan.style.left = "15px";
        colorSpan.style.color = "#fff"; // 文本颜色为白色
        colorSpan.style.fontWeight = "bold"; // 设置字体加粗


        // 根据颜色在列表中的位置决定添加到哪个容器中
        if (index < 5) {
          var copydiv = div.cloneNode(true); // 创建 div 元素的副本
    copydiv.className = "small-rec";
    smallContainer.appendChild(copydiv); // 添加到 small-container
              // 将文本节点添加到当前 div 中
            div.appendChild(colorSpan);
            div.className = "big-rec";
            bigContainer.appendChild(div); // 添加到 big-container
        } else {
            div.className = "small-rec";
            smallContainer.appendChild(div); // 添加到 small-container
        }
    });
}



// 定义每隔 3 秒调用一次的函数换图片
function callCurrentSlide() {
    currentSlide(slideIndex); // 调用 currentSlide 函数，传入当前的 n 值
    slideIndex = (slideIndex % 3) + 1; // 更新 n 的值，取值范围为 1, 2, 3
}
// 每隔 3 秒调用一次 callCurrentSlide 函数
setInterval(callCurrentSlide, 3000);
currentSlide(1);


//色环js
function  changeColor1(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter0_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');

                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);
  }

  function  changeColor2(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter1_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');
    
 
                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);


  }
  function  changeColor3(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter2_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');
    

                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);


  }
  function  changeColor4(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter3_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');
    
                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);
     

  }
  function  changeColor5(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter4_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');
    
                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);


  }
  function  changeColor6(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter5_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');
                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);
  

  }
  function  changeColor7(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter6_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');
 
                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);


  }

  function  changeColor8(jscolor){
    // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
    var gElement = document.querySelector('g[filter="url(#filter7_d_150_1792)"]');

    // 选取所有的 <path> 元素
    var pathElements = gElement.querySelectorAll('path');
    
                    // 修改第一个 <path> 元素的 fill 属性
          pathElements[0].setAttribute('fill', jscolor);


  }
//   function  changeColor8(box){
//     // 使用 querySelector 来选取包含指定 filter 属性的 <g> 元素
//     var gElement = document.querySelector('g[filter="url(#filter7_d_150_1792)"]');

//     // 选取所有的 <path> 元素
//     var pathElements = gElement.querySelectorAll('path');
    
//         // 创建一个input元素，type设置为color
//         var colorInput = document.createElement('input');
//         colorInput.type = 'color';

//         // 设置input的change事件监听器
//         colorInput.addEventListener('input', function() {
//             // 获取用户选择的颜色值
//             var selectedColor = colorInput.value;
//             // 设置盒子的背景颜色为用户选择的颜色值
//             box.style.background = selectedColor;
//                     // 修改第一个 <path> 元素的 fill 属性
//           pathElements[0].setAttribute('fill', selectedColor);
//             // 销毁input元素
//             document.body.removeChild(colorInput);
//         });

//         // 模拟用户点击input元素
//         colorInput.click();

//   }


  