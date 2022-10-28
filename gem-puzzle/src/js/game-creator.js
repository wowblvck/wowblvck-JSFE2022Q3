import clack from '../assets/sounds/clack.wav';
import win from '../assets/sounds/win.wav';
import Score from './score-generator';
import { pad, getRandomBool, removeItemFromLS } from './functions';

export default class Game {
  static sound = {
    enabled: true,
    click: new Audio(clack),
    win: new Audio(win),
  };

  constructor(framesize) {
    this.frameSize = framesize;
    this.state = this.getState();
    this.cellSize = 0;
    this.color = '#008aff';
    this.context = 'null';
    this.clicks = 0;
    this.firstInit = false;
    this.gameState = 'play';
    this.timerEnabled = false;
    this.timer = 'null';
    this.totalTime = 0;

    this.canvasCreate = (p) => this.canvasMove(p);
    this.frameHandler = (p) => this.frameChange(p);

    this.createPuzzle();
    this.eventHandlers();
  }

  createPuzzle = () => {
    const canvas = document.getElementById('puzzle');
    canvas.width = 280;
    canvas.height = 280;

    this.context = canvas.getContext('2d');
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.cellSize = canvas.width / this.frameSize;
    this.mix(300, this.frameSize);
    this.draw();
    this.firstInit = true;
  };

  eventHandlers = () => {
    const list = document.querySelector('.frame__list');
    list.addEventListener('change', this.frameHandler);

    const canvas = document.getElementById('puzzle');
    canvas.addEventListener('click', this.canvasCreate);

    const btnStart = document.querySelector('.btn__start');
    btnStart.addEventListener('click', this.shuffleGame);

    const stopBtn = document.querySelector('.btn__stop');
    stopBtn.addEventListener('click', this.stopGame);

    const saveBtn = document.querySelector('.btn__save');
    saveBtn.addEventListener('click', this.saveGame);

    const loadBtn = document.querySelector('.btn__load');
    loadBtn.addEventListener('click', this.loadGame);

    const soundBtn = document.querySelector('.btn__sound');
    soundBtn.addEventListener('click', this.soundState);

    const resultBtn = document.querySelector('.btn__results');
    resultBtn.addEventListener('click', this.loadResults);
  };

  canvasMove = (e) => {
    if (this.gameState != 'stop') {
      if (this.timerEnabled == false) {
        this.timer = setInterval(this.countUp, 1000);
        this.timerEnabled = true;
      }
      const canvas = document.getElementById('puzzle');
      const x = (e.pageX - canvas.offsetLeft) / this.cellSize | 0;
      const y = (e.pageY - canvas.offsetTop) / this.cellSize | 0;
      this.onEvent(x, y);
    }
  };

  onEvent(x, y) {
    this.move(x, y);
    const canvas = document.getElementById('puzzle');
    this.context.fillRect(0, 0, canvas.width, canvas.height);
    this.draw();

    document.querySelector('.info__step').textContent = `${this.getClicks()}`;

    if (this.victory()) {
      clearInterval(this.timer);
      this.timerEnabled = false;
      this.totalTime = 0;
      this.firstInit = false;
      this.gameState = 'play';

      if (Game.sound.enabled == true) {
        Game.sound.win.play();
      }
      const popup = document.querySelector('.overlay');
      const winPopup = document.querySelector('.win');
      popup.classList.add('active');
      winPopup.classList.add('active');

      const winMovesTitle = document.querySelector('.win__moves');
      winMovesTitle.textContent = `${this.getClicks()}`;

      const winMinutes = document.querySelector('.win__minutes');
      const winSeconds = document.querySelector('.win__seconds');
      const timeMinutes = document.querySelector('.time__minutes');
      const timeSeconds = document.querySelector('.time__seconds');

      winMinutes.textContent = timeMinutes.textContent;
      winSeconds.textContent = timeSeconds.textContent;

      const winTime = `${winMinutes.textContent}:${winSeconds.textContent}`;

      Score.addScore(document.querySelector('.name__label').textContent, this.getClicks(), document.querySelector('.frame__selection').textContent, winTime);

      this.clicks = 0;
      timeMinutes.textContent = '00';
      timeSeconds.textContent = '00';
      document.querySelector('.info__step').textContent = `${this.getClicks()}`;

      popup.addEventListener('click', (e) => {
        if (popup == e.target) {
          popup.classList.remove('active');
          winPopup.classList.remove('active');
        }
      }, true);

      this.createPuzzle();
    }
  }

  saveGame = () => {
    localStorage.setItem('save', 1);
    localStorage.setItem('canvasPos', JSON.stringify(this.state));
    localStorage.setItem('moves', this.getClicks());
    localStorage.setItem('time', this.totalTime);
  };

  loadGame = () => {
    const saveStatus = localStorage.getItem('save');
    if (saveStatus && saveStatus == 1) {
      this.state = JSON.parse(localStorage.getItem('canvasPos'));
      const canvas = document.getElementById('puzzle');
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, 280, 280);
      context.fillRect(0, 0, 280, 280);
      this.draw();
      this.clicks = Number(localStorage.getItem('moves'));
      this.totalTime = Number(localStorage.getItem('time'));
      const titleMinutes = document.querySelector('.time__minutes');
      const titleSeconds = document.querySelector('.time__seconds');
      const clicks = document.querySelector('.info__step');
      clicks.textContent = `${this.getClicks()}`;
      titleSeconds.textContent = pad(this.totalTime % 60);
      titleMinutes.textContent = pad(parseInt(this.totalTime / 60, 10));
    }
  };

  loadResults = () => {
    const popup = document.querySelector('.overlay');
    const resultPopup = document.querySelector('.results');
    popup.classList.add('active');
    resultPopup.classList.add('active');

    popup.addEventListener('click', (e) => {
      if (popup == e.target) {
        popup.classList.remove('active');
        resultPopup.classList.remove('active');
      }
    }, true);
    return this;
  };

  frameChange = (e) => {
    removeItemFromLS('save', 'canvasPos', 'time', 'moves');
    this.clicks = 0;
    clearInterval(this.timer);
    this.timerEnabled = false;
    this.firstInit = false;
    this.gameState = 'play';

    document.querySelector('.info__step').textContent = `${this.getClicks()}`;
    document.querySelector('.time__minutes').textContent = '00';
    document.querySelector('.time__seconds').textContent = '00';

    this.frameSize = e.target.value;
    const selection = document.querySelector('.frame__selection');
    selection.textContent = `${this.frameSize}x${this.frameSize}`;

    const canvas = document.getElementById('puzzle');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, 280, 280);
    context.fillRect(0, 0, 280, 280);

    this.state = this.getState();

    this.createPuzzle();
  };

  shuffleGame = () => {
    removeItemFromLS('save', 'canvasPos', 'time', 'moves');
    this.clicks = 0;
    clearInterval(this.timer);
    this.timerEnabled = false;
    this.firstInit = false;
    this.gameState = 'play';

    document.querySelector('.info__step').textContent = `${this.getClicks()}`;
    document.querySelector('.time__minutes').textContent = '00';
    document.querySelector('.time__seconds').textContent = '00';

    this.createPuzzle();
  };

  countUp = () => {
    const titleMinutes = document.querySelector('.time__minutes');
    const titleSeconds = document.querySelector('.time__seconds');
    this.totalTime += 1;
    titleSeconds.textContent = pad(this.totalTime % 60);
    titleMinutes.textContent = pad(parseInt(this.totalTime / 60, 10));
  };

  stopGame = () => {
    const stopBtn = document.querySelector('.btn__stop');
    if (this.gameState == 'play' && this.totalTime != 0 && this.clicks != 0) {
      this.gameState = 'stop';
      stopBtn.innerHTML = '<span>Start</span>';
      clearInterval(this.timer);
    } else if (this.gameState == 'stop' && this.totalTime > 0 && this.clicks > 0) {
      this.gameState = 'play';
      stopBtn.innerHTML = '<span>Stop</span>';
      this.timer = setInterval(this.countUp, 1000);
    }
  };

  soundState = () => {
    const btnSoundTitle = document.querySelector('.btn__sound');
    if (Game.sound.enabled == true) {
      Game.sound.enabled = false;
      btnSoundTitle.innerHTML = '<span>Sound on</span>';
    } else {
      Game.sound.enabled = true;
      btnSoundTitle.innerHTML = '<span>Sound off</span>';
    }
    return this;
  };

  getState = () => {
    const matrix = [];
    for (let i = 0; i < this.frameSize; i += 1) {
      matrix[i] = [];
      for (let j = 0; j < this.frameSize; j += 1) {
        matrix[i][j] = this.frameSize * i + j + 1;
      }
    }
    matrix[this.frameSize - 1][this.frameSize - 1] = 0;
    return matrix;
  };

  getNullCell = () => {
    for (let i = 0; i < this.frameSize; i += 1) {
      for (let j = 0; j < this.frameSize; j += 1) {
        if (this.state[j][i] === 0) {
          return { x: i, y: j };
        }
      }
    }
    return false;
  };

  mix = (count, n) => {
    let x;
    let y;
    for (let i = 0; i < count; i += 1) {
      const nullCell = this.getNullCell();
      const verticalMove = getRandomBool();
      const upLeft = getRandomBool();

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
  };

  cellView = (x, y) => {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      x + 1,
      y + 1,
      this.cellSize - 2,
      this.cellSize - 2,
    );
  };

  numView = () => {
    this.context.font = `${this.cellSize / 2}px Montserrat`;
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = '#000';
  };

  draw = () => {
    for (let i = 0; i < this.frameSize; i += 1) {
      for (let j = 0; j < this.frameSize; j += 1) {
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

  move = (x, y) => {
    const nullCell = this.getNullCell();
    const canMoveVertical = (x - 1 === nullCell.x || x + 1 === nullCell.x) && y === nullCell.y;
    const canMoveHorizontal = (y - 1 === nullCell.y || y + 1 === nullCell.y) && x === nullCell.x;

    if (canMoveVertical || canMoveHorizontal) {
      this.state[nullCell.y][nullCell.x] = this.state[y][x];
      this.state[y][x] = 0;
      this.clicks += 1;
      if (this.firstInit == true && Game.sound.enabled == true && this.gameState != 'stop') {
        Game.sound.click.play();
      }
    }
  };

  getClicks = () => this.clicks;

  victory() {
    const combination = this.getState();
    let res = true;
    for (let i = 0; i < this.frameSize; i += 1) {
      for (let j = 0; j < this.frameSize; j += 1) {
        if (combination[i][j] != this.state[i][j]) {
          res = false;
          break;
        }
      }
    }
    return res;
  }
}
