import { AppComponent } from "../../../../core/interfaces/AppComponent";
import { generateRandomCars } from "../../../../core/utils/utils";
import car from "../../../../core/components/Car";
import { Store } from "../../../../core/components/Store";
import CarController from "../../../../core/controllers/CarController";

class GarageOptions implements AppComponent {
  private store: Store = Store.getInstance();

  private carController: CarController = CarController.getInstance();

  render = () => `
  <div class="col-lg-2">
    <div class="card h-100">
      <div class="card-body d-flex align-items-center">
        <div class="d-grid gap-2 col-6 col-lg-12 mx-auto">
          <button type="button" id="race-btn" class="btn btn-sm btn-outline-primary">Start Race</button>
          <button type="button" id="reset-race-btn" class="btn btn-sm btn-outline-primary" disabled>Reset Race</button>
          <button type="button" id="generate-car-btn" class="btn btn-sm btn-outline-primary">Generate cars</button>
        </div>
      </div>
    </div>
  </div>
  `;

  addEvents = () => {
    const generateBtn = document.getElementById(
      "generate-car-btn"
    ) as HTMLButtonElement;
    if (!generateBtn) throw new Error("Generate button not found!");
    generateBtn.addEventListener("click", () => {
      if (!generateBtn.disabled) {
        generateBtn.disabled = true;
        const cars = generateRandomCars();
        Promise.all(cars.map((elem) => car.create(elem)))
          .then(() => {
            this.store.loadAllCars(this.store.Page);
          })
          .catch((error) => console.log(error));
        generateBtn.disabled = false;
      }
    });

    const raceBtn = document.getElementById("race-btn") as HTMLButtonElement;
    if (!raceBtn) throw new Error("Race button not found!");
    raceBtn.addEventListener("click", () => {
      raceBtn.disabled = true;
      this.carController
        .race(this.carController.startDriving)
        .then(({ name, time }) => {
          const resetBtn = document.getElementById(
            "reset-race-btn"
          ) as HTMLButtonElement;
          if (!resetBtn) throw new Error("Reset race button not found!");
          resetBtn.disabled = false;

          const wonAlert = document.getElementById(
            "won-alert"
          ) as HTMLDivElement;
          if (!wonAlert) throw new Error("Won alert not found!");

          const alertContent = `
            <strong>${name} won</strong>. Time: ${time}s.
            <button id="won-alert-close" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          `;
          wonAlert.innerHTML = alertContent;
          wonAlert.style.visibility = "visible";
          setTimeout(() => {
            wonAlert.style.visibility = "hidden";
          }, 3000);
        })
        .catch((error) => console.log(error));
    });

    const raceResetBtn = document.getElementById(
      "reset-race-btn"
    ) as HTMLButtonElement;
    if (!raceResetBtn) throw new Error("Reset race button not found!");
    raceResetBtn.addEventListener("click", () => {
      raceResetBtn.disabled = true;
      this.store.Cars.map((elem) => this.carController.stopDriving(elem.id));
      raceBtn.disabled = false;
    });
  };
}

export default GarageOptions;
