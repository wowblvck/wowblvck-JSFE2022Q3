import CreateCar from "./CreateCar/CreateCar";
import UpdateCar from "./UpdateCar/UpdateCar";
import GarageOptions from "./GarageOptions/GarageOptions";
import RaceView from "./RaceView/RaceView";

import "./GarageView.scss";
import { carsLoadedEvent, Store } from "../../../core/components/Store";

class GarageView {
  private create: CreateCar = new CreateCar();

  private update: UpdateCar = new UpdateCar();

  private garageOptions: GarageOptions = new GarageOptions();

  private raceView: RaceView = new RaceView();

  private store: Store = Store.getInstance();

  constructor() {
    carsLoadedEvent.on("cars-loaded", this.updateRender);
  }

  updateRender = () => {
    const garageRace = document.getElementById("race-view");
    if (garageRace) {
      const raceView = new RaceView();
      garageRace.innerHTML = raceView.render();
      raceView.addEvents();
    }
  };

  render = () => `
  <main id="garage" class="flex-shrink-0 py-4">
    <section class="garage-options container">
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Garage Options
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <div class="row">
                ${this.create.render()}
                ${this.update.render()}
                ${this.garageOptions.render()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="race-view" class="py-3 container">
      ${this.raceView.render()}
    </section>
  </main>
  `;

  addEvents = () => {
    this.create.addEvents();
    this.garageOptions.addEvents();
    this.update.addEvents();
  };
}

export default GarageView;
