export default class GeneratePage {
  constructor() {
    this.element = `
      <div class="wrapper">
          <div class="control">
                  <button type="button" class="btn btn__start"><span>Shuffle and start</span></button>
                  <button type="button" class="btn btn__stop"><span>Stop</span></button>
                  <button type="button" class="btn btn__save"><span>Save</span></button>
                  <button type="button" class="btn btn__load"><span>Load</span></button>
                  <button type="button" class="btn btn__results"><span>Results</span></button>
                  <button type="button" class="btn btn__sound"><span>Sound off</span></button>
              </div>
              <div class="info">
                  <p class="info__name">Name: <span class="name__label">Unknown</span></p>
                  <p class="info__moves">Move: <span class="info__step">0</span></p>
                  <p class="info__time">Time: <span class="time__minutes">00</span>:<span class="time__seconds">00</span></p>
              </div>
              <canvas id="puzzle" class="game"></canvas>
              <div class="frame">
                  <p class="frame__title">Frame: <span class="frame__selection">4x4</span></p>
                  <div class="frame__wrapper">
                      <select class="frame__list" name="frames">
                          <option class="frame__option" selected disabled>Choose size:</option>
                          <option class="frame__option" value="3">3x3</option>
                          <option class="frame__option" value="4">4x4</option>
                          <option class="frame__option" value="5">5x5</option>
                          <option class="frame__option" value="6">6x6</option>
                          <option class="frame__option" value="7">7x7</option>
                          <option class="frame__option" value="8">8x8</option>
                      </select>
                  </div>
              </div>
              <div class="overlay"></div>
              <div class="win">
                <p class="win__title">Hooray! You solved the puzzle in <span class="win__minutes">00</span>:<span class="win__seconds">00</span> and <span class="win__moves">0</span> moves!</p>
              </div>
              <div class="results">
                <ul class="scoreboard">
                  <li class="scoreboard__item">Name</li>
                  <li class="scoreboard__item">Moves</li>
                  <li class="scoreboard__item">Frame<br>Size</li>
                  <li class="scoreboard__item">Time</li>
                </ul>
              </div>
            </div>
          </div>
      </div>
    `;
    this.generate();
  }

  generate = () => {
    document.body.innerHTML = this.element;
  };
}
