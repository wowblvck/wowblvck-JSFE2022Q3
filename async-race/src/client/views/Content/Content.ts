import { AppComponent } from "../../core/interfaces/AppComponent";
import Garage from "./Garage/Garage";

class Content implements AppComponent {
  private garage: Garage = new Garage();

  render = () => `
    ${this.garage.render()}
  `;

  addEvents = () => {
    this.garage.addEvents();
  };
}

export default Content;
