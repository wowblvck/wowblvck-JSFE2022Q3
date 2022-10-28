import { createNode } from './functions';

export default class Score {
  constructor() {
    this.score = JSON.parse(localStorage.getItem('score'));
  }

  static addScore(name, moves, frame, time) {
    if (!this.score) {
      this.score = [];
      this.score.push({
        name,
        moves,
        frame,
        time,
      });
      localStorage.setItem('score', JSON.stringify(this.score));
    } else {
      this.score.push({
        name,
        moves,
        frame,
        time,
      });
      localStorage.setItem('score', JSON.stringify(this.score));
    }

    const resultWrapper = document.querySelector('.results');

    const gamersList = createNode('ul', 'gamers');

    const gamersName = createNode('li', 'gamers__name');
    gamersName.textContent = name;

    const gamersMove = createNode('li', 'gamers__moves');
    gamersMove.textContent = moves;

    const gamersFrame = createNode('li', 'gamers__frame');
    gamersFrame.textContent = frame;

    const gamersTime = createNode('li', 'gamers__time');
    gamersTime.textContent = time;

    gamersList.append(gamersName, gamersMove, gamersFrame, gamersTime);

    resultWrapper.append(gamersList);
  }
}
