"use strict";

var Block = require('./block')
const SHAPES = [
  [ 1, 1, 1, 1 ],
  [ 1, 1, 1, 0, 1 ],
  [ 1, 1, 1, 0, 0, 0, 1 ],
  [ 0, 1, 1, 0, 0, 1, 1 ],
  [ 1, 1, 0, 0, 0, 1, 1 ],
  [ 0, 1, 1, 0, 1, 1 ],
  [ 0, 1, 0, 0, 1, 1, 1 ]
];
const COLORS = [ 'brown', 'olive', 'blue', 'chocolate', 'gray', 'green', 'purple' ];
const SOUNDS = {
  collision : document.getElementById("audio_collision"),
  down : document.getElementById("audio_move"),
  rotate : document.getElementById("audio_pop"),
  gameover : document.getElementById("audio_gameover"),
  score : document.getElementById("audio_score")
}

class Tetris {
  constructor(shape,ctx,x,y,color,stroke){
    this.data = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];   // 方块形状数据
    this.shape = shape || 0;                                 // 方块形状代码
    this.ctx = ctx;                                          // canvas对象
    this.color = color || COLORS[shape]
    this.x =  x || 0;                                        // 方块位置数据
    this.y =  y || 0;
    this.stroke = stroke || 'white'
    this.block = new Block(ctx, this.color, this.stroke);    // 组合block对象 

    for(let i = 0; i < SHAPES[this.shape].length; i++){       // 方块形状初始化
      if(SHAPES[this.shape][i]){
        this.data[i % 4][1 + Math.floor(i/4)] = 1;
      }
    }
  }
  cleanCount(){
    let h = 19, levelCount = 0;
    while(h >= 0){
      let count = 0;
      for(let i = 0; i< 10; i++){
        if(this.canSee(i,h)){
          count++;
        }
      } 
      if(count == 0){
        levelCount++;
      }else if(count == 10){
        break;
      }
      h--;
    }
    return levelCount;
  }
  // 消层,计分
  cleanup(){
      let h = 19, levelCount = 0;     //一次消除层数统计变量
      while(h >= 0){                  //从最底层一直找到顶
        let count = 0;              //记录同一层上空位置的数量
        for(let i = 0; i< 10; i++){ //遍历一层
          if(this.canSee(i,h)){   //位置为空，变量加一
            count++;
          }
        } 
        if(count == 0){             //层满，需要消除
          let level = h;          //待消层
          levelCount++;           //消层数量加一
          if(isAudioOpen) SOUNDS['score'].play();
          while(level >= 0){      //将待消层上面的所有层整体下移一层
            let ct = 0;         //记录同一层上空位置的数量
            for(let j = 0; j < 10; j++){
              this.block.erase(j,level);    //清除待消层方格
              if(this.canSee(j,level-1)){   //空位置统计
                ct++;
              }else{
                let bk = new Block(this.ctx,this.block.getColor(j,level-1)) //取垂直上方方格颜色
                bk.draw(j,level)                                            //下移
              }
            }
            if(ct == 10){   //一层都是空位置，整体下移提前完成
              break;
            }else{
              level--;    //楼层上移
            }
          }
        }else if(count == 10){  //一层都是空位置，消层工作提前完成
          break;
        }else{
          h--;
        }
      }
      return levelCount;
  }
  moveUp(){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j] && (this.data[i][j - 1] == 0)){
          if(!this.canSee(this.x + i, this.y + j - 1)){
            return false;
          }
        }
      }
    }
    this.erase();
    this.y--;
    this.draw();
    return true;
  }
  // 方块下移一格
  moveNext(){
    let flag = true;
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j] && (j ==3 || this.data[i][j+1] == 0)){
          if(!this.canSee(this.x + i, this.y + 1 + j)){
            flag = false;
            break;
          }
        }
      }
      if(!flag) break;
    }
    if(flag){           // 下移一层
      this.erase();
      this.y++;
      this.draw();
      return true;
    }else{                            // 到底处理
      let level = this.cleanup();   // 消层处理
      if(level > 0){                // 消层数量大于0
        levels += level;          // 计分
        scores += LVSCS[level]
        document.getElementById('levelShow').value = levels;
        document.getElementById('scoreShow').value = scores;
        if(!isAutoPlay && Math.floor(scores / STEPVAL) != STEP){   // 条速度级别
          clearInterval(interval)
          interval = setInterval( tick, TICKVAL - ++STEP * STEPVAL );
          document.getElementById('speedShow').value = STEP + 1;
        }
      }else{
        if(isAudioOpen) SOUNDS['down'].play()
      }
      return false;
    }
  }
  // 方块移动到底
  moveDown(){
    let yMax = 19;
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j] && (j ==3 || this.data[i][j+1] == 0)){
          let k = 0;
          while(this.canSee(this.x + i, this.y + ++k + j));
          if(k - 1 < yMax) yMax = k - 1;
        }
      }
    }
    this.erase();
    this.y += yMax;
    this.draw();
    let level = this.cleanup();
    if(level > 0){
      levels += level;
      scores += LVSCS[level]
      document.getElementById('levelShow').value = levels;
      document.getElementById('scoreShow').value = scores;
      if(!isAutoPlay && Math.floor(scores / STEPVAL) != STEP){
        clearInterval(interval)
        interval = setInterval( tick, TICKVAL - ++STEP * STEPVAL );
        document.getElementById('speedShow').value = STEP + 1;
      }
    }else{
      if(isAudioOpen) SOUNDS['down'].play()
    }
  }
  // 方块右移一格
  moveRight(){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j] && (i ==3 || this.data[i+1][j] == 0)){
          if(!this.canSee(this.x +1 + i, this.y + j)){
            return false;
          }
        }
      }
    }
    this.erase();
    this.x++;
    this.draw();
    return true;
  }
  // 方块左移一格
  moveLeft(){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j] && (i ==0 || this.data[i-1][j] == 0)){
          if(!this.canSee(this.x -1 + i, this.y + j)){
            return false;
          }
        }
      }
    }
    this.erase();
    this.x--;
    this.draw();
    return true;
  }
  // 方块旋转
  rotate(){
    let b = [[],[],[],[]];
    for(let i=0;i<4;i++){  
      for(let j=0;j<4;j++){  
        b[i][j] = this.data[j][3-i];  
      }  
    }  
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j] == 0 && b[i][j] == 1){
          if(!this.canSee(this.x  + i, this.y + j)){
            return false;
          }
        }
      }
    }
    this.erase();
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        this.data[i][j] = b[i][j];  
      }
    }
    if(isAudioOpen) SOUNDS['rotate'].play();
    this.draw();
  }
  //检测新方块是否能放置，游戏结束检测
  canDrawNext(){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j]){
          if(!this.canSee(this.x + i, this.y + j)){
            if(isAudioOpen) SOUNDS['gameover'].play();
            return false;
          }
        }
      }
    }
    return true;
  }
  //调用block对象，进行俄罗斯方块绘制
  draw(){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j]){
          this.block.draw(this.x + i, this.y + j)
        }
      }
    }
  }
  //调用block对象，进行俄罗斯方块擦除
  erase(){
    for(let i = 0; i < 4; i++){
      for(let j = 0; j < 4; j++){
        if(this.data[i][j]){
          this.block.erase(this.x + i, this.y + j)
        }
      }
    }
  }
  //调用block对象，进行俄罗斯方块放置检测
  canSee(x,y){
    if(x < 0 || x > 9 || y > 19) return false;
    return this.block.canSee(x,y) == 0;
  }
}

module.exports = Tetris;
