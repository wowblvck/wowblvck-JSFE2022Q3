import { winnersLoadedEvent } from "../../core/components/Store";
import { AppComponent } from "../../core/interfaces/AppComponent";
import GarageView from "./GarageView/GarageView";
import ScoreView from "./ScoreView/ScoreView";

class Content implements AppComponent {
  private garage: GarageView = new GarageView();

  private score: ScoreView = new ScoreView();

  constructor() {
    winnersLoadedEvent.on("winners-loaded", this.updateRender);
  }

  updateRender = () => {
    const scoreView = document.getElementById("score-view");
    if (scoreView) {
      const score = new ScoreView();
      scoreView.innerHTML = score.render();
      score.addEvents();
    }
  };

  render = () => `
    <main id="content" class="flex-shrink-0 py-4">
      <div id="garage-view">
        ${this.garage.render()}
      </div>
      <div id="score-view" style="display: none;">
        ${this.score.render()}
      </div>
    </main>
  `;

  addEvents = () => {
    this.garage.addEvents();
    this.score.addEvents();
  };
}

export default Content;
