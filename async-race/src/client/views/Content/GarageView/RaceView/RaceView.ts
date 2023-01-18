import { Store } from "../../../../core/components/Store";
import { AppComponent } from "../../../../core/interfaces/AppComponent";
import CarView from "../CarView/CarView";

import "./RaceView.scss";

class RaceView implements AppComponent {
  private store = Store.getInstance();

  private carsComponents: CarView[] = [];

  constructor() {
    if (this.store.Cars.length) {
      this.carsComponents = this.store.Cars.map(
        (car) => new CarView(car.id, car.name, car.color)
      );
      this.store.ItemsOfPage = this.carsComponents.length;
    }
  }

  addEvents = () => {
    this.carsComponents.forEach((car) => {
      car.addEvents();
    });

    const nextBtn = document.getElementById("next-btn") as HTMLLIElement;
    if (!nextBtn) throw new Error("Next button not found!");
    nextBtn.addEventListener("click", () => {
      if (this.store.MaxPages !== 1) {
        if (this.store.Page >= this.store.MaxPages) {
          this.store.Page = 1;
        } else {
          this.store.Page += 1;
        }
        this.store.loadAllCars(this.store.Page);
      }
    });

    const prevBtn = document.getElementById("prev-btn") as HTMLLIElement;
    if (!prevBtn) throw new Error("Prev button not found!");
    prevBtn.addEventListener("click", () => {
      if (this.store.MaxPages !== 1) {
        if (this.store.Page <= 1) {
          this.store.Page = this.store.MaxPages;
        } else {
          this.store.Page -= 1;
        }
        this.store.loadAllCars(this.store.Page);
      }
    });
  };

  render = () => `
    <h2 class="text-center mb-1">Garage</h2>
    <p class="fs-5 text-center mb-3">Cars: ${this.store.CarsCount} (${
    this.store.ItemsOfPage
  } on page)</p>
    <div class="card">
      <div class="card-body d-flex gap-3 flex-column text-bg-light">
        ${this.carsComponents.map((car) => car.render()).join("")}
      </div>
    </div>
    <nav class="mt-3" aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li id="prev-btn" class="page-item"><button class="page-link">Previous</button></li>
        <li class="page-item"><p class="page-link m-0">${this.store.Page} / ${
    this.store.MaxPages
  }</p></li>
        <li id="next-btn" class="page-item"><button class="page-link">Next</button></li>
      </ul>
    </nav>
    <div id="won-alert" class="alert alert-warning alert-dismissible fade show" role="alert">
    </div>
  `;
}

export default RaceView;
