import 'normalize.css';
import './style.scss';
import './index.html';
import GeneratePage from './js/html-creator';
import Game from './js/game-creator';
import Generatename from './js/name-generator';
// import Generatescore from './js/scoregenerator';

const defaultFrame = 4;

class Application {
  constructor() {
    new GeneratePage();
    window.addEventListener('load', () => {
      Game.createPuzzle(defaultFrame);
      // new Generatescore();
    });
    window.addEventListener('DOMContentLoaded', () => {
      localStorage.clear();
      new Generatename(8).setName();
    });
  }
}

new Application();
