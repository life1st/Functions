import { randomNum} from "./utils";

export default function Particle(image) {
  this.img = image
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
  this.speedH = Math.random() > 0.6 ? 1 : -1
  this.speedW = Math.random() > 0.6 ? -1 : 1
}

Particle.prototype.setPosition = function(top, left) {
  let p = this.position
  p.top = top
  p.left = left
}

Particle.prototype.setSize = function(width, height) {
  let s = this.size
  s.width = width
  s.height = height
}

Particle.prototype.scale = function(min, max) {
  if (this.size.width + this.step > max) {
    this.step = -1
  } else if (this.size.width + this.step < min) {
    this.step = 1
  }
  this.setSize(this.size.width + this.step, this.size.height + this.step)
}

Particle.prototype.getAnimateInfo = function(drawBoard) {
  let p = Object.assign(this.position)
  if (p.top < 0) {
    this.speedH = 5 + randomNum(1, 4)
  } else if (p.top + this.size.height > drawBoard.height) {
    this.speedH = -5 + randomNum(-4, 1)
  }
  if (p.left < 0) {
    this.speedW = 5 + randomNum(1, 4)
  } else if (p.left + this.size.width > drawBoard.width) {
    this.speedW = -5 + randomNum(-4, -1)
  }
  p.top += this.speedH
  p.left += this.speedW
  this.setPosition(p.top, p.left)
  this.zoom
    ? this.scale(50, 150)
    : this.scale(40, 60)

  return {
    img: this.img,
    position: this.position,
    size: this.size
  }
}
