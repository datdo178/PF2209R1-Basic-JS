/**
 * Created by nhatnk on 4/26/17.
 */

function Hero(image, top, left, size, speed) {
  this.image = image;
  this.top = top;
  this.left = left;
  this.size = size;
  this.speed = speed;

  this.getHeroElement = function () {
    return '<img width="' + this.size + '"' +
      ' height="' + this.size + '"' +
      ' src="' + this.image + '"' +
      ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;" />';
  }

  this.move = function (direction) {
    if (direction === 'right') {
      this.left += this.speed;
    }

    if (direction === 'left') {
      this.left -= this.speed;
    }

    if (direction === 'up') {
      this.top -= this.speed;
    }

    if (direction === 'down') {
      this.top += this.speed;
    }
  }
}

var hero = new Hero('knight.png', 20, 30, 200, 50);

function start() {
  let maxLeft = window.innerWidth - hero.size;
  let maxTop = window.innerHeight - hero.size;

  if (hero.left < 20 && hero.top > 20) {
    hero.move('up');
  } else if (hero.left < maxLeft && hero.top < maxTop) {
    hero.move('right');
  } else if (hero.left > maxLeft && hero.top < maxTop) {
    hero.move('down');
  } else if (hero.top > maxTop && hero.left > 20) {
    hero.move('left');
  }
  document.getElementById('game').innerHTML = hero.getHeroElement();
  setTimeout(start, 50)
}

start();