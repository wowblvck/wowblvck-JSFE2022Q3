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
      const canvas = document.getElementById('puzzle');
      canvas.width = 280;
      canvas.height = 280;

      const context = canvas.getContext('2d');
      context.fillRect(0, 0, canvas.width, canvas.height);
      let cellSize = canvas.width / defaultFrame;
      let game = new Game(context, cellSize, defaultFrame);
      game.mix(300, defaultFrame);
      game.draw();

      canvas.addEventListener('click', (e) => {
        const x = (e.pageX - canvas.offsetLeft) / cellSize | 0;
        const y = (e.pageY - canvas.offsetTop) / cellSize | 0;
        onEvent(x, y);
      });

      canvas.addEventListener('touchend', (e) => {
        const x = (e.touches[0].pageX - canvas.offsetLeft) / cellSize | 0;
        const y = (e.touches[0].pageY - canvas.offsetTop) / cellSize | 0;
        onEvent(x, y);
      });

      const list = document.querySelector('.frame__list');
      list.addEventListener('change', (e) => {
        e.preventDefault();
        const nowstate = e.target.value;
        const selection = document.querySelector('.frame__selection');
        selection.textContent = `${nowstate}x${nowstate}`;

        canvas.width = 280;
        canvas.height = 280;

        context.fillRect(0, 0, canvas.width, canvas.height);
        cellSize = canvas.width / e.target.value;
        game = new Game(context, cellSize, e.target.value);
        game.mix(300, e.target.value);
        game.draw();
        document.querySelector('.info__step').textContent = `${game.getClicks()}`;
      });

      function onEvent(x, y) {
        game.move(x, y);
        context.fillRect(0, 0, canvas.width, canvas.height);
        game.draw();
        document.querySelector('.info__step').textContent = `${game.getClicks()}`;
        if (game.victory()) {
          alert(`Собрано за ${game.getClicks()} касание!`);
          game.mix(300);
          context.fillRect(0, 0, canvas.width, canvas.height);
          game.draw(context, cellSize);
        }
      }
    });
  }
}

new Application();
