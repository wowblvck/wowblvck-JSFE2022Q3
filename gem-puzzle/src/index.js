import 'normalize.css';
import './style.scss';
import './index.html';
import GeneratePage from './js/generateHTML';
import Game from './js/game';

const defaultFrame = 4;

class Application {
  constructor() {
    new GeneratePage();
    window.addEventListener('load', () => {
      Game.createPuzzle(defaultFrame);
    });
  }
}

new Application();
