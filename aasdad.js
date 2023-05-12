const fs = require('fs');
import default from './src/utils/method';
const path = require('path');

  const directoryPath = './public/img'; // 图片目录的路径
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif']; // 图片文件扩展名

  const imagePaths = []; // 存储图片相对路径的数组

  // 遍历目录中的所有文件
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    // 筛选出图片文件
    files.forEach((file) => {
      const ext = path.extname(file).toLowerCase();
      if (imageExtensions.includes(ext)) {
        const imagePath = path.join(directoryPath, file);
        const relativePath = path.relative(__dirname, imagePath);
        imagePaths.push({ url: relativePath });
      }
      // console.log(imagePaths);
    });
   export default  imagePaths
  });
