import 'normalize.css';
import './style.scss';
import './index.html';
import GeneratePage from './js/generateHTML';

class Application {
  constructor() {
    new GeneratePage();
  }
}

new Application();
