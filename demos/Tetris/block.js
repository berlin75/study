"use strict";

const BLOCKWIDTH = 30;

class Block{
  constructor(ctx,fillColor,strokeColor){
    this.ctx = ctx;                            // canvas对象
    this.width = BLOCKWIDTH;                   // 小方块边长
    this.fillColor = fillColor || 'blue';
    this.strokeColor = strokeColor || 'white';
  }
  // 绘制小方块
  draw(x,y){
    this.ctx.save();
    this.ctx.fillStyle = this.fillColor;
    this.ctx.fillRect(x*this.width + 1,y*this.width + 1,this.width-2,this.width-2)
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.strokeRect(x*this.width + 1,y*this.width + 1,this.width-2,this.width-2);
    this.ctx.restore();
  }
  // 擦除小方块
  erase(x,y){
    this.ctx.clearRect(x*this.width , y*this.width , 30, 30)
  }
  // 看某个位置是否为空,取指定位置象素颜色属性，模拟方块“视觉”
  canSee(x,y){
    let c = this.ctx.getImageData(x*this.width+9,y*this.width+9,1,1)
    return c.data[0] | c.data[1] | c.data[2] | c.data[3]; //黑色为全零，异或为0时，位置为空，其它表示位置已经被占用
  }
  // 取某个位置上的颜色
  getColor(x,y){
    let c = this.ctx.getImageData(x*this.width+9,y*this.width+9,1,1)
    return 'rgba('+c.data[0]+','+c.data[1]+','+c.data[2]+','+c.data[3]+')';
  }
}

module.exports = Block;
