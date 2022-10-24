export default class Generatescore {
  constructor() {
    this.generateScore();
  }

  static generateScore() {
    const score = [];
    for (let i = 0; i < 10; i += 1) {
      score[i] = [{
        name: 'Unknown',
        score: 0,
      }];
    }
    console.log(this.score);
  }
}
