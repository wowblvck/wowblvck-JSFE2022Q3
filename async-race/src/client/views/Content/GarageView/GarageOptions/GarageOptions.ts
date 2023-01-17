import { AppComponent } from "../../../../core/interfaces/AppComponent";
import generateRandomCars from "../../../../core/utils/utils";
import car from "../../../../core/components/Car";
import Garage from "../../../../core/components/Garage";
import { Store } from "../../../../core/components/Store";

class GarageOptions implements AppComponent {
  private garage: Garage = Garage.getInstance();

  private store: Store = Store.getInstance();

  render = () => `
  <div class="col-lg-2">
    <div class="card h-100">
      <div class="card-body d-flex align-items-center">
        <div class="d-grid gap-2 col-6 col-lg-12 mx-auto">
          <button type="button" class="btn btn-sm btn-outline-primary">Start Race</button>
          <button type="button" class="btn btn-sm btn-outline-primary">Reset Race</button>
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
  };
}

export default GarageOptions;
