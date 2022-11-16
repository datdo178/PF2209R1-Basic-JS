- Các thuộc tính màu sắc, kiểu dáng, đổ bóng:
    fillStyle
    strokeStyle
    shadowColor

- Các thuộc tính đường, văn bản, thao tác điểm ảnh:
    lineWidth
    font
    width
    height

- Action:
    move
    lineto

- Toạ độ: x,y (ngang - dọc)

# CANVAS

## Quy tắc chung
* Tạo khung vẽ:
```
    <canvas id="myCanvas" width="400" height="300" style="border: 1px solid red;">
        Your browser doesn't support canvas
    </canvas>
```
* Tạo đối tượng 2D để vẽ:
```
<script>
    let c = document.getElementById("myCanvas");
    let ctx = c.getContext("2d");
</script>
```

## Vẽ đường thẳng
- ctx.moveTo(x,y)
- ctx.lineTo(x,y)

* Định dạng nét vẽ
```
ctx.strokeStyle = arrColor[colorIdx];
ctx.stroke();
```

## Vẽ cung tròn
```
ctx.arc(x, y, radius, startAngle, endAngle)
ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)
```
* counterclockwise: default = fault: ngược kim đồng đồ
* startAngle: góc bắt đầu (đơn vị radian, theo số Math.PI)
* endAngle: góc bắt đầu (đơn vị radian, theo số Math.PI)

## Vẽ chữ:
* Layout configuration: font, textAlign, textBaseline, direction 
e.g: ctx.font = "30px Arial";

* Vẽ chữ:
ctx.fillText("Hello World",x,y); 
ctx.strokeText("Hello World",x,y); => chữ chỉ có đường viền
x,y là toạ độ bắt đầu vẽ

## Gradient:
* Linear: createLinearGradient(), addColorStop()
- createLinearGradient(x0, y0, x1, y1)
    x0, y0: toạ độ điểm bắt đầu của gradient linear
    x1, y1: toạ độ điểm kết thúc của gradient linear

* Radial: createRadialGradient()

## Fill:
fill()
fillRect(x, y, width, height)