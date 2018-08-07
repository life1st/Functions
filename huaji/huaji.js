function Huaji() {
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
  this.speedH = 10
  this.speedW = 10
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

Huaji.prototype.animation = function(canvas) {
  let p = { ...this.position }
  if (p.top < 0) {
    this.speedH = 8 + randomNum(2, 6)
  } else if (p.top > canvas.height) {
    this.speedH = -8  + randomNum(1, 6)
  }
  if (p.left < 0) {
    this.speedW = 8 + randomNum(1, 5)
  } else if (p.left > canvas.width) {
    this.speedW = -8 + randomNum(4, 7)
  }
  p.top += this.speedH
  p.left += this.speedW 
  this.setPosition(p.top, p.left)
  let scale = Math.random() > 0.5 ? 1 : -1
  this.setSize(this.size.width + scale, this.size.height + scale)

  canvas.drwaImg(this.img, this.position.left, this.position.top, this.size.width, this.size.height)

}
