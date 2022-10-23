import clack from '../assets/sounds/clack.wav';
import win from '../assets/sounds/win.wav';

export default class Game {
  static nowGame;

  static nowCellsize;

  static sound = new Audio(clack);

  static win = new Audio(win);

  static soundEnabled = true;

  constructor(context, cellSize, frameSize) {
    this.nowstate = frameSize;
    this.state = Game.setState(this.nowstate);
    this.color = '#008aff';
    this.context = context;
    this.cellSize = cellSize;
    this.clicks = 0;
    this.timerEnabled = false;
    this.totalSeconds = 0;
    this.intervalTimer = 0;
    this.stopGame = false;
  }

  static setState(n) {
    const matrix = [];
    for (let i = 0; i < n; i += 1) {
      matrix[i] = [];
      for (let j = 0; j < n; j += 1) {
        matrix[i][j] = n * i + j + 1;
      }
    }
    matrix[n - 1][n - 1] = 0;
    return matrix;
  }

  static getRandomBool() {
    if (Math.floor(Math.random() * 2) === 0) {
      return true;
    }
    return false;
  }

  getNullCell() {
    for (let i = 0; i < this.nowstate; i += 1) {
      for (let j = 0; j < this.nowstate; j += 1) {
        if (this.state[j][i] === 0) {
          return { x: i, y: j };
        }
      }
    }
    return false;
  }

  mix(count, n) {
    let x;
    let y;
    for (let i = 0; i < count; i += 1) {
      const nullCell = this.getNullCell();

      const verticalMove = Game.getRandomBool();
      const upLeft = Game.getRandomBool();

      if (verticalMove) {
        x = nullCell.x;
        if (upLeft) {
          y = nullCell.y - 1;
        } else {
          y = nullCell.y + 1;
        }
      } else {
        y = nullCell.y;
        if (upLeft) {
          x = nullCell.x - 1;
        } else {
          x = nullCell.x + 1;
        }
      }

      if (x >= 0 && x <= n - 1 && y >= 0 && y <= n - 1) {
        this.move(x, y);
      }
    }
    this.clicks = 0;
  }

  cellView(x, y) {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      x + 1,
      y + 1,
      this.cellSize - 2,
      this.cellSize - 2,
    );
  }

  numView() {
    this.context.font = `${this.cellSize / 2}px Montserrat`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = '#000';
  }

  draw = () => {
    for (let i = 0; i < this.nowstate; i += 1) {
      for (let j = 0; j < this.nowstate; j += 1) {
        if (this.state[i][j] > 0) {
          this.cellView(
            j * this.cellSize,
            i * this.cellSize,
          );
          this.numView();
          this.context.fillText(
            this.state[i][j],
            j * this.cellSize + this.cellSize / 2,
            i * this.cellSize + this.cellSize / 2,
          );
        }
      }
    }
  };

  move(x, y) {
    const nullCell = this.getNullCell();
    const canMoveVertical = (x - 1 === nullCell.x || x + 1 === nullCell.x) && y === nullCell.y;
    const canMoveHorizontal = (y - 1 === nullCell.y || y + 1 === nullCell.y) && x === nullCell.x;

    if (canMoveVertical || canMoveHorizontal) {
      this.state[nullCell.y][nullCell.x] = this.state[y][x];
      this.state[y][x] = 0;
      this.clicks += 1;
    }
  }

  getClicks() {
    return this.clicks;
  }

  victory() {
    const combination = Game.setState(this.nowstate);
    let res = true;
    for (let i = 0; i < this.nowstate; i += 1) {
      for (let j = 0; j < this.nowstate; j += 1) {
        if (combination[i][j] != this.state[i][j]) {
          res = false;
          break;
        }
      }
    }
    return res;
  }

  static setTime() {
    const titleMinutes = document.querySelector('.time__minutes');
    const titleSeconds = document.querySelector('.time__seconds');
    Game.nowGame.totalSeconds += 1;
    titleSeconds.textContent = Game.pad(Game.nowGame.totalSeconds % 60);
    titleMinutes.textContent = Game.pad(parseInt(Game.nowGame.totalSeconds / 60, 10));
  }

  static pad(val) {
    const valString = `${val}`;
    if (valString.length < 2) {
      return `0${valString}`;
    }
    return valString;
  }

  static createPuzzle(n) {
    this.nowstate = n;
    const canvas = document.getElementById('puzzle');
    canvas.width = 280;
    canvas.height = 280;

    const context = canvas.getContext('2d');
    context.fillRect(0, 0, canvas.width, canvas.height);
    const cellSize = canvas.width / n;
    Game.nowCellsize = cellSize;
    const game = new Game(context, cellSize, n);
    Game.nowGame = game;
    game.mix(300, n);
    game.draw();

    this.eventHandlers();
  }

  static eventHandlers() {
    const canvas = document.getElementById('puzzle');
    const list = document.querySelector('.frame__list');
    const startBtn = document.querySelector('.btn__start');
    const stopBtn = document.querySelector('.btn__stop');
    const soundBtn = document.querySelector('.btn__sound');
    canvas.addEventListener('click', (e) => this.canvasMove(e));
    list.addEventListener('change', (e) => this.frameChange(e));
    startBtn.addEventListener('click', (e) => this.shuffleGame(e));
    soundBtn.addEventListener('click', () => this.soundOff());
    stopBtn.addEventListener('click', () => this.stopGame());
  }

  static stopGame() {
    const stopBtn = document.querySelector('.btn__stop');
    if (Game.nowGame.stopGame == false && Game.nowGame.totalSeconds != 0 && Game.nowGame.clicks != 0) {
      Game.nowGame.stopGame = true;
      stopBtn.innerHTML = '<span>Start</span>';
      clearInterval(Game.nowGame.intervalTimer);
    } else if (Game.nowGame.stopGame == true && Game.nowGame.totalSeconds > 0 && Game.nowGame.clicks > 0) {
      Game.nowGame.stopGame = false;
      stopBtn.innerHTML = '<span>Stop</span>';
      Game.nowGame.intervalTimer = setInterval(this.setTime, 1000);
    }
  }

  static soundOff() {
    const btnSoundTitle = document.querySelector('.btn__sound');
    if (Game.soundEnabled == true) {
      Game.soundEnabled = false;
      btnSoundTitle.innerHTML = '<span>Sound on</span>';
    } else {
      Game.soundEnabled = true;
      btnSoundTitle.innerHTML = '<span>Sound off</span>';
    }
  }

  static canvasMove(e) {
    if (Game.nowGame.stopGame != true) {
      if (Game.soundEnabled == true) {
        Game.sound.play();
      }
      if (Game.nowGame.timerEnabled == false) {
        Game.nowGame.intervalTimer = setInterval(this.setTime, 1000);
        Game.nowGame.timerEnabled = true;
      }
      const canvas = document.getElementById('puzzle');
      const x = (e.pageX - canvas.offsetLeft) / Game.nowCellsize | 0;
      const y = (e.pageY - canvas.offsetTop) / Game.nowCellsize | 0;
      this.onEvent(Game.nowGame, x, y);
    }
  }

  static frameChange(e) {
    e.preventDefault();
    clearInterval(Game.nowGame.intervalTimer);
    Game.nowGame.timerEnabled = false;
    const list = document.querySelector('.frame__list');
    list.replaceWith(list.cloneNode(true));

    const soundBtn = document.querySelector('.btn__sound');
    soundBtn.replaceWith(soundBtn.cloneNode(true));

    Game.nowGame.stopGame = false;
    const stopBtn = document.querySelector('.btn__stop');
    stopBtn.innerHTML = '<span>Stop</span>';
    stopBtn.replaceWith(stopBtn.cloneNode(true));

    this.clicks = 0;
    this.nowstate = e.target.value;
    const selection = document.querySelector('.frame__selection');
    selection.textContent = `${this.nowstate}x${this.nowstate}`;
    Game.createPuzzle(this.nowstate);
    document.querySelector('.info__step').textContent = `${Game.nowGame.getClicks()}`;
    document.querySelector('.time__minutes').textContent = '00';
    document.querySelector('.time__seconds').textContent = '00';
  }

  static shuffleGame(e) {
    e.preventDefault();
    clearInterval(Game.nowGame.intervalTimer);
    Game.nowGame.timerEnabled = false;

    const list = document.querySelector('.frame__list');
    list.replaceWith(list.cloneNode(true));

    const startBtn = document.querySelector('.btn__start');
    startBtn.replaceWith(startBtn.cloneNode(true));

    Game.nowGame.stopGame = false;
    const stopBtn = document.querySelector('.btn__stop');
    stopBtn.innerHTML = '<span>Stop</span>';
    stopBtn.replaceWith(stopBtn.cloneNode(true));

    this.clicks = 0;
    Game.createPuzzle(this.nowstate);
    document.querySelector('.info__step').textContent = `${Game.nowGame.getClicks()}`;
    document.querySelector('.time__minutes').textContent = '00';
    document.querySelector('.time__seconds').textContent = '00';
  }

  static onEvent(game, x, y) {
    game.move(x, y);
    const canvas = document.getElementById('puzzle');
    const context = canvas.getContext('2d');
    context.fillRect(0, 0, canvas.width, canvas.height);
    game.draw();
    document.querySelector('.info__step').textContent = `${game.getClicks()}`;
    if (game.victory()) {
      clearInterval(game.intervalTimer);
      Game.nowGame.timerEnabled = false;
      if (Game.soundEnabled == true) {
        Game.win.play();
      }

      const popup = document.querySelector('.overlay');
      const winPopup = document.querySelector('.win');
      popup.classList.add('active');
      winPopup.classList.add('active');

      const winMovesTitle = document.querySelector('.win__moves');
      winMovesTitle.textContent = `${game.getClicks()}`;

      const winMinutes = document.querySelector('.win__minutes');
      const winSeconds = document.querySelector('.win__seconds');
      const timeMinutes = document.querySelector('.time__minutes');
      const timeSeconds = document.querySelector('.time__seconds');

      winMinutes.textContent = timeMinutes.textContent;
      winSeconds.textContent = timeSeconds.textContent;

      popup.addEventListener('click', (e) => {
        if (popup == e.target) {
          this.clicks = 0;
          Game.nowGame.totalSeconds = 0;
          timeMinutes.textContent = '00';
          timeSeconds.textContent = '00';
          document.querySelector('.info__step').textContent = `${Game.nowGame.getClicks()}`;
          popup.classList.remove('active');
          winPopup.classList.remove('active');
          game.mix(300, this.nowstate);
          context.fillRect(0, 0, canvas.width, canvas.height);
          game.draw(context, this.cellSize, this.nowstate);
        }
      }, true);
    }
  }
}
