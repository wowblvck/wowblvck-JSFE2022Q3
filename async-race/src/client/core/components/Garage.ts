import Race from "../../views/Content/GarageView/RaceView/RaceView";
import { Store } from "./Store";

class Garage {
  static instance: Garage;

  private store = Store.getInstance();

  static getInstance() {
    if (!Garage.instance) {
      Garage.instance = new Garage();
    }
    return Garage.instance;
  }

  update = () => {
    this.store.loadAllCars();
    const garageRace = document.getElementById("garage-race");
    if (garageRace) {
      const race = new Race();
      garageRace.innerHTML = race.render();
    }
  };
}

export default Garage;
