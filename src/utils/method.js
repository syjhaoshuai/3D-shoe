function img (text,color){
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // 设置画布大小为文字大小
  const fontSize = 30;
  ctx.font = `${fontSize}px Arial`;

  // 测量文字宽度
  let  textWidth = ctx.measureText(text).width;
  console.log(textWidth,'textWidth');
  if(textWidth<150){
    textWidth=150
  }
  // 调整画布大小以确保文字居中
  canvas.width = textWidth;
  canvas.height = textWidth/2;

  // 设置文字样式和对齐方式
  ctx.font = `30px Arial`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle'; // 垂直居中
  ctx.textAlign = 'center'; // 水平居中

  // 在画布上绘制文字
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  // 将画布转换为数据URL
  const imageData = canvas.toDataURL('image/png');
  console.log(imageData);
  return imageData;
 
}


function deepCopy(obj) {
  // 如果不是对象类型，直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // 创建一个新的对象，该对象的原型指向被拷贝的原始对象的原型
  const clonedObj = Object.create(Object.getPrototypeOf(obj));

  // 递归拷贝所有属性和方法
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepCopy(obj[key]);
    }
  }

  return clonedObj;
}

export default {
  img,
  deepCopy
}


