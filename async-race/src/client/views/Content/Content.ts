import { AppComponent } from "../../core/interfaces/AppComponent";
import GarageView from "./GarageView/GarageView";

class Content implements AppComponent {
  private garage: GarageView = new GarageView();

  render = () => `
    ${this.garage.render()}
  `;

  addEvents = () => {
    this.garage.addEvents();
  };
}

export default Content;
