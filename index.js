import './style.css';

const canvas = document.querySelector("canvas");
var newImg = new Image();
newImg.onload = function() {
      ctx.drawImage(newImg, 0, 0);
}
newImg.src = './image.jpg';


const ctx = canvas.getContext('2d');
