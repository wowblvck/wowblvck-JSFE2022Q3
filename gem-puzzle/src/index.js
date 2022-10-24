import 'normalize.css';
import './style.scss';
import './index.html';
import GeneratePage from './js/generateHTML';
import Game from './js/game';
import Generatename from './js/namegenerator';
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
      new Generatename(8).setName();
    });
  }
}

new Application();
