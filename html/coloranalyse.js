

function openindex(){
    window.location="index.html"
}

function rgb2Hex(r, g, b) {
        // 将RGB颜色值转换为十六进制表示
        const hexR = r.toString(16).padStart(2, '0');
        const hexG = g.toString(16).padStart(2, '0');
        const hexB = b.toString(16).padStart(2, '0');
        // 返回十六进制颜色值
        return '#' + hexR + hexG + hexB;
    }


    // 将 RGB 颜色值转换为十六进制格式
 function rgbToHex(rgbColor) {
        // 利用正则表达式匹配 RGB 颜色值
        const match = rgbColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        if (!match) return rgbColor; // 如果匹配失败，直接返回原始颜色值
        // 将匹配到的 RGB 颜色值转换为十六进制格式，并返回
        return "#" + ((1 << 24) + (parseInt(match[1]) << 16) + (parseInt(match[2]) << 8) + parseInt(match[3])).toString(16).slice(1);
    }

document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中是否有颜色信息
    const storedColors = localStorage.getItem('colors');
    if (storedColors) {
        // 如果本地存储中有颜色信息，则解析并处理这些颜色信息
        const colors = JSON.parse(storedColors);
      // 获取colorContainer1和colorContainer2元素
        const colorContainer1 = document.getElementById('colorContainer1');
        const colorContainer2 = document.getElementById('colorContainer2');

        // 遍历颜色信息，为每个颜色创建并添加一个color-block元素到相应的colorContainer中
        colors.forEach(function(rgb, index) {
            // 将RGB值转换为十六进制参数
            const hexColor = rgb2Hex(rgb[0], rgb[1], rgb[2]);
            
            // 创建color-block元素
            const colorBlock = document.createElement('div');
            colorBlock.classList.add('color-block');
            
            // 创建color-ring元素
            const colorRing = document.createElement('div');
            colorRing.classList.add('color-ring');
            colorRing.style.backgroundColor = 'rgb(' + rgb.join(',') + ')';
            
            // 创建color-text元素
            const colorText = document.createElement('div');
            colorText.classList.add('color-text');
            colorText.textContent = hexColor;
            
            // 将color-ring和color-text元素添加到color-block中
            colorBlock.appendChild(colorRing);
            colorBlock.appendChild(colorText);
            
          
            // 判断应该添加到哪个colorContainer中
            if (index < 5) {
                colorContainer1.appendChild(colorBlock);   
            } else {
                colorContainer2.appendChild(colorBlock);
            }
          
        });

     }



    

        // 检查本地存储中是否有图片文件
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
        // 将存储的图片文件转换为 Blob 对象
        const blob = dataURLtoBlob(storedImage);
        // 调用 loadimage 函数显示图片
        loadimage(blob);
    }

        // 将数据URL转换为Blob对象
    function dataURLtoBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        // localStorage.clear();
        return new Blob([u8arr], { type: mime });
    }
});

    // 获取文件选择框元素
    const fileInput = document.getElementById('uploadInput');

    // 监听change事件
    fileInput.addEventListener('change', function () {
        

        // 获取选择的文件
          const file = fileInput.files[0];
          loadimage(file);
         // 将文件存储到本地存储
         saveImageToLocal(file);

        });

        // 保存图片到本地存储
    function saveImageToLocal(file) {
            // 创建FileReader对象
            const reader = new FileReader();

            // 当读取完成时执行
            reader.onload = function(event) {
                // 将图片数据存储到LocalStorage中
                localStorage.setItem('uploadedImage', event.target.result);
                console.log('Image saved to local storage.');
            };

            // 读取文件为Data URL
            reader.readAsDataURL(file);
    }

    function loadimage(file) {

            // 获取left_down_no_picture元素
            const leftDownNoPicture = document.getElementById('left_down_no_picture');

            // 创建表示文件的URL
            const imageUrl = URL.createObjectURL(file);

            // 设置left_down_no_picture的背景
            leftDownNoPicture.style.background='none';
            leftDownNoPicture.style.borders='none';
            leftDownNoPicture.style.backgroundImage = `url(${imageUrl})`;
            leftDownNoPicture.style.backgroundSize='contain';
            leftDownNoPicture.style.backgroundRepeat = 'no-repeat';
            leftDownNoPicture.style.backgroundPosition = 'center';
            // 获取元素
            const add1Element = document.getElementById('add1');
            const add2Element = document.getElementById('add2');

            // 隐藏元素
            add1Element.style.display = 'none';
            add2Element.style.display = 'none';
    }
    function clearstorage(){
                // 清除本地存储
                localStorage.clear();
    }

    function uploadFilechanged() {

        const input = document.getElementById('uploadInput');
        const file = input.files[0];

        const formData = new FormData();
        formData.append('file', file);
        
        $.ajax({  
            url: 'http://127.0.0.1:5000/analyse',  
            type: 'POST',  
            data: formData,  
            contentType: false,  
            processData: false,  
            success: function(response) {  
              // 将颜色信息保存到本地存储
                localStorage.setItem('colors', JSON.stringify(response.colors));
                // document.getElementById('responseMessage').innerText = JSON.stringify(response.colors);
                console.log('success');  
            },  
            error: function(error) {  
                console.log('Error:', error);  
            }  
        });  
        
        return false; // 阻止按钮默认行为
    }

function uploadFile() {  
    const input = document.getElementById('uploadInput');  
    const file = input.files[0];  
  
    const formData = new FormData();  
    formData.append('file', file);  
  
    // 使用 fetch 替代 $.ajax  
    fetch('https://15703249.r18.cpolar.top/analyse', {  
        method: 'POST', // 发送 POST 请求  
        body: formData // 发送 FormData 对象  
    })  
    .then(response => {  
        // 检查响应是否成功  
        if (!response.ok) {  
            throw new Error('Network response was not ok.');  
        }  
        // 解析 JSON 响应体  
        return response.json();  
    })  
    .then(data => {  
        // 将颜色信息保存到本地存储  
        localStorage.setItem('colors', JSON.stringify(data.colors));  
        console.log('success');  
    })  
    .catch(error => {  
        console.error('Error:', error);  
    });  
  
    // 阻止按钮默认行为  
    return false;  
}


    function downloadFile() {
        // 清除本地存储
        localStorage.clear();
        
        // 获取 responseMessage 元素
        const responseMessage = document.getElementById('responseMessage');
        
        // 使用 HTML2Canvas 库来截取页面内容并生成图像
        html2canvas(responseMessage).then(canvas => {
            // 将 Canvas 转换为 Data URL
            const dataURL = canvas.toDataURL('image/png');
            
            // 创建一个虚拟的链接元素
            const downloadLink = document.createElement('a');
            
            // 将 Data URL 设置为链接的 href 属性
            downloadLink.href = dataURL;
            
            // 设置下载的文件名
            downloadLink.download = 'responseMessage.png';
            
            // 将链接点击事件模拟为自动触发
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }

    function add_text(){
            // 获取所有盒子元素
        const boxes = document.querySelectorAll('.box');
            // 遍历每个盒子元素
        boxes.forEach((box, index) => {
            // 获取盒子的背景颜色
            const color = window.getComputedStyle(box).backgroundColor;
            // 将颜色转换为十六进制格式
            const hexColor = rgbToHex(color);
            // 获取盒子内的文本元素
            const textElement = box.querySelector('.text');
            // 输出颜色信息到文本元素上
            textElement.textContent = hexColor;
        });
    }
    function add_color() {
        // 检查本地存储中是否有颜色信息
        const storedColors = localStorage.getItem('colors');
        if (storedColors) {
            var first1=document.querySelector(".rectangle-173")
            var first2=document.querySelector(".rectangle-188")

            var two1=document.querySelector(".rectangle-174")
            var two2=document.querySelector(".rectangle-175")
            var two3=document.querySelector(".rectangle-176")
            var two4=document.querySelector(".rectangle-190")

            var three1=document.querySelector(".rectangle-172")
            var three2=document.querySelector(".rectangle-1243")
            var three3=document.querySelector(".rectangle-186")

            var four1=document.querySelector(".rectangle-1245")

            var fives=document.querySelectorAll(".rectangle-2")

            const colors = JSON.parse(storedColors);
            colors.forEach(function(rgb, index) {
                // 只选择前5个盒子
                switch (index) {
                    case 0:
                        var select = '.box:nth-child(1)';
                        first1.style.background = 'rgb(' + rgb.join(',') + ')';
                        first2.style.background = 'rgb(' + rgb.join(',') + ')';
                        break;
                    case 1:
                        var select = '.box:nth-child(2)';
                        two1.style.background = 'rgb(' + rgb.join(',') + ')';
                        two2.style.background = 'rgb(' + rgb.join(',') + ')';
                        two3.style.background = 'rgb(' + rgb.join(',') + ')';
                        two4.style.background = 'rgb(' + rgb.join(',') + ')';
                        break;
                    case 2:
                        var select = '.box:nth-child(3)';
                        three1.style.background = 'rgb(' + rgb.join(',') + ')';
                        three2.style.background = 'rgb(' + rgb.join(',') + ')';
                        three3.style.background = 'rgb(' + rgb.join(',') + ')';
                        break;
                    case 3:
                        var select = '.box:nth-child(4)';
                        four1.style.background = 'rgb(' + rgb.join(',') + ')';
                        break;
                    case 4:
                        var select = '.box:nth-child(5)';
                        fives[0].style.background='rgb(' + rgb.join(',') + ')';
                        fives[1].style.background='rgb(' + rgb.join(',') + ')';
                        break;
                    default:
                        return; // 超过5个盒子的情况，直接返回
                }
                var colorBox = document.querySelector(select);
                // 设置选中的元素背景颜色
                colorBox.style.background = 'rgb(' + rgb.join(',') + ')';
            });
            
            // colors.forEach(function(rgb, index) {
            //     // 只选择前5个盒子
            //     if (index < 5) {
            //         var select = '.box:nth-child(' + (index + 1) + ')';
            //         var colorBox = document.querySelector(select);
            //         // 设置选中的元素背景颜色
            //         colorBox.style.background = 'rgb(' + rgb.join(',') + ')';
            //     }
               
            // });
        }
    }


var button = document.querySelector('.toggle-button');
    // 添加点击事件监听器
button.addEventListener('click', function() {
    button.classList.toggle('active');
    var tip = document.getElementById('toggle-tip');
    var rec = document.getElementById('rectangle');
    if (button.classList.contains('active')) {
        tip.textContent = "点击按钮关闭调色器";
        rec.style.display = 'block';
        window.scrollBy(0, 150); // 向下滚动100像素
        add_color();
        add_text();
    } else {
        tip.textContent = "请点击按钮开启调色器";
        rec.style.display = 'none';
    }

});


// jscolor.presets.default = {
//     position: 'right',
//     palette: [
//         '#000000', '#7d7d7d', '#870014', '#ec1c23', '#ff7e26',
//         '#fef100', '#22b14b', '#00a1e7', '#3f47cc', '#a349a4',
//         '#ffffff', '#c3c3c3', '#b87957', '#feaec9', '#ffc80d',
//         '#eee3af', '#b5e61d', '#99d9ea', '#7092be', '#c8bfe7',
//     ],
//     //paletteCols: 12,
//     //hideOnPaletteClick: true,
// };




    function changeColorText(box,jscolor) {
        var hexColor = jscolor.toHEXString(); // 获取当前颜色的十六进制表示
        var spanElement = document.querySelectorAll('.text');
        spanElement[box-1].textContent = hexColor; // 设置span元素的文字内容为当前颜色的十六进制形式


        var first1=document.querySelector(".rectangle-173");
        var first2=document.querySelector(".rectangle-188");

        var two1=document.querySelector(".rectangle-174");
        var two2=document.querySelector(".rectangle-175");
        var two3=document.querySelector(".rectangle-176");
        var two4=document.querySelector(".rectangle-190");

        var three1=document.querySelector(".rectangle-172");
        var three2=document.querySelector(".rectangle-1243");
        var three3=document.querySelector(".rectangle-186");

        var four1=document.querySelector(".rectangle-1245");

        var fives=document.querySelectorAll(".rectangle-2");
        switch (box-1) {
            case 0:
                first1.style.background = jscolor;
                first2.style.background = jscolor;
                break;
            case 1:
                two1.style.background = jscolor;
                two2.style.background = jscolor;
                two3.style.background = jscolor;
                two4.style.background = jscolor;
                break;
            case 2:
                three1.style.background = jscolor;
                three2.style.background = jscolor;
                three3.style.background = jscolor;
                break;
            case 3:
                four1.style.background = jscolor;
                break;
            case 4:
                fives[0].style.background=jscolor;
                fives[1].style.background=jscolor;
                break;
            default:
                break; // 超过5个盒子的情况，直接返回
        }

    }





//     function changeColor(box) {
        
//         // 获取盒子在父元素中的位置
//         var index = Array.from(box.parentElement.children).indexOf(box);
//         var first1=document.querySelector(".rectangle-173");
//         var first2=document.querySelector(".rectangle-188");

//         var two1=document.querySelector(".rectangle-174");
//         var two2=document.querySelector(".rectangle-175");
//         var two3=document.querySelector(".rectangle-176");
//         var two4=document.querySelector(".rectangle-190");

//         var three1=document.querySelector(".rectangle-172");
//         var three2=document.querySelector(".rectangle-1243");
//         var three3=document.querySelector(".rectangle-186");

//         var four1=document.querySelector(".rectangle-1245");

//         var fives=document.querySelectorAll(".rectangle-2");

//     //  var container=document.querySelector("#box-container");
//         // 创建一个input元素，type设置为color
//         var colorInput = document.createElement('input');
//         colorInput.type = 'color';
//         // colorInput.style.display='none';
// // container.appendChild(colorInput);

//         // 设置input的change事件监听器
//         colorInput.addEventListener('input', function() {
//             // 获取用户选择的颜色值
//             var selectedColor = colorInput.value;
//             // 设置盒子的背景颜色为用户选择的颜色值
//             box.style.background = selectedColor;
//             // 获取盒子内的文本元素
//             const textElement = box.querySelector('.text');
//             // 输出颜色信息到文本元素上
//             textElement.textContent = selectedColor;
//             switch (index) {
//                 case 0:
//                     first1.style.background = selectedColor;
//                     first2.style.background = selectedColor;
//                     break;
//                 case 1:
//                     two1.style.background = selectedColor;
//                     two2.style.background = selectedColor;
//                     two3.style.background = selectedColor;
//                     two4.style.background = selectedColor;
//                     break;
//                 case 2:
//                     three1.style.background = selectedColor;
//                     three2.style.background = selectedColor;
//                     three3.style.background = selectedColor;
//                     break;
//                 case 3:
//                     four1.style.background = selectedColor;
//                     break;
//                 case 4:
//                     fives[0].style.background=selectedColor;
//                     fives[1].style.background=selectedColor;
//                     break;
//                 default:
//                     break; // 超过5个盒子的情况，直接返回
//             }
//             // 销毁input元素
//             document.body.removeChild(colorInput);
//             // container.removeChild(colorInput);
//         });



//  // 模拟用户点击input元素
// colorInput.click();
        
//     }

// 下载配色方案
    function Download_color() {
        // 清除本地存储
        // localStorage.clear();
        // add_text();
        
        // 获取 responseMessage 元素
        const responseMessage = document.getElementById('box-container');
        
        // 使用 HTML2Canvas 库来截取页面内容并生成图像
        html2canvas(responseMessage).then(canvas => {
            // 将 Canvas 转换为 Data URL
            const dataURL = canvas.toDataURL('image/png');
            
            // 创建一个虚拟的链接元素
            const downloadLink = document.createElement('a');
            
            // 将 Data URL 设置为链接的 href 属性
            downloadLink.href = dataURL;
            
            // 设置下载的文件名
            downloadLink.download = '配色方案.png';
            
            // 将链接点击事件模拟为自动触发
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        });
    }
