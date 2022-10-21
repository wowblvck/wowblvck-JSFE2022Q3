import 'normalize.css';
import './style.scss';
import './index.html';
import GeneratePage from './js/generateHTML';
import Game from './js/game';

const defaultFrame = 4;

class Application {
  constructor() {
    new GeneratePage();
    Game.createPuzzle(defaultFrame);
  }

  // selectSize = () => {
  //   this.list = document.querySelector('.frame__list');
  //   this.selection = document.querySelector('.frame__selection');
  //   this.list.addEventListener('change', (e) => {
  //     e.preventDefault();
  //     const nowstate = e.target.value;
  //     this.selection.textContent = `${nowstate}x${nowstate}`;
  //     const canvas = document.getElementById('puzzle');
  //     canvas.width = 320;
  //     canvas.height = 320;

  //     const context = canvas.getContext('2d');
  //     context.fillRect(0, 0, canvas.width, canvas.height);

  //     const cellSize = canvas.width / nowstate;

  //     const game = new Game(context, cellSize, nowstate);
  //     game.mix(300);
  //     game.draw();
  //   });
  // };
}

new Application();
