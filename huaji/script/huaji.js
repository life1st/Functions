export default function Huaji() {
  this.img = new Image()
  this.img.src = './imgs/huaji.png'
  this.position = {
    top: 0,
    left: 0
  }
  this.size = {
    width: 50,
    height: 50
  }
  this.step = 1
  this.zoom = Math.random() > 0.6

  // 设置初始速度 emmm...有改进空间
  this.speedH = Math.random() > 0.6 ? 10 : -10
  this.speedW = Math.random() > 0.6 ? -10 : 10
}

Huaji.prototype.setPosition = function(top, left) {
  let p = this.position
  p.top = top
  p.left = left
}

Huaji.prototype.setSize = function(width, height) {
  let s = this.size
  s.width = width
  s.height = height
}

Huaji.prototype.scale = function(min, max) {
  if (this.size.width + this.step > max) {
    this.step = -1
  } else if (this.size.width + this.step < min) {
    this.step = 1
  }
  this.setSize(this.size.width + this.step, this.size.height + this.step)
}

Huaji.prototype.animation = function(canvas) {
  let p = { ...this.position }
  if (p.top < 0) {
    this.speedH = 6 + randomNum(1, 4)
  } else if (p.top > canvas.height) {
    this.speedH = -6 + randomNum(-4, 1)
  }
  if (p.left < 0) {
    this.speedW = 8 + randomNum(1, 4)
  } else if (p.left > canvas.width) {
    this.speedW = -8 + randomNum(-6, -1)
  }
  p.top += this.speedH
  p.left += this.speedW
  this.setPosition(p.top, p.left)
  this.zoom
    ? this.scale(50, 150)
    : this.scale(40, 60)

  canvas.drwaImg(this.img, this.position.left, this.position.top, this.size.width, this.size.height)

}
