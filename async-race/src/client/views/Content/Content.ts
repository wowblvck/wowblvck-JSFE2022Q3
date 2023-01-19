import { Store } from "../../core/components/Store";
import { AppComponent } from "../../core/interfaces/AppComponent";
import GarageView from "./GarageView/GarageView";
import ScoreView from "./ScoreView/ScoreView";

class Content implements AppComponent {
  private garage: GarageView = new GarageView();

  private score: ScoreView = new ScoreView();

  private store: Store = Store.getInstance();

  render = () => `
    <main id="content" class="flex-shrink-0 py-4">
      ${this.garage.render()}
      ${this.score.render()}
    </main>
  `;

  addEvents = () => {
    this.garage.addEvents();
  };
}

export default Content;
