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

    const gamersList = document.createElement('ul');
    gamersList.classList.add('gamers');

    const gamersName = document.createElement('li');
    gamersName.classList.add('gamers__name');
    gamersName.textContent = name;
    gamersList.append(gamersName);

    const gamersMove = document.createElement('li');
    gamersMove.classList.add('gamers__moves');
    gamersMove.textContent = moves;
    gamersList.append(gamersMove);

    const gamersFrame = document.createElement('li');
    gamersFrame.classList.add('gamers__frame');
    gamersFrame.textContent = frame;
    gamersList.append(gamersFrame);

    const gamersTime = document.createElement('li');
    gamersTime.classList.add('gamers__time');
    gamersTime.textContent = time;
    gamersList.append(gamersTime);

    resultWrapper.append(gamersList);
  }
}
