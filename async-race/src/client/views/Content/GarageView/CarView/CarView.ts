import Car from "../../../../core/components/Car";
import { Store } from "../../../../core/components/Store";
import CarController from "../../../../core/controllers/CarController";
import { AppComponent } from "../../../../core/interfaces/AppComponent";
import Winner from "../../../../core/components/Winner";

import "./CarView.scss";

class CarView implements AppComponent {
  private id: number;

  private name: string;

  private color: string;

  private store: Store = Store.getInstance();

  private carController: CarController = CarController.getInstance();

  private car: Car = Car.getInstance();

  private winner: Winner = Winner.getInstance();

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  addEvents = () => {
    const btnRemove = document.getElementById(
      `btn-remove-${this.id}`
    ) as HTMLButtonElement;
    if (!btnRemove) throw new Error("Button remove not found!");
    btnRemove.addEventListener("click", () => {
      this.car
        .delete(this.id)
        .then(() => {
          if (this.store.ItemsOfPage <= 1 && this.store.Page !== 1) {
            this.store.Page -= 1;
          }
          this.store.loadAllCars(this.store.Page);
          this.winner
            .delete(this.id)
            .then(() => {
              if (
                this.store.WinnerItemsOfPage <= 1 &&
                this.store.WinnerPage !== 1
              ) {
                this.store.WinnerPage -= 1;
              }
              this.store.loadWinners(
                this.store.Sort,
                this.store.Order,
                this.store.WinnerPage
              );
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => console.log(error));
    });

    const btnEdit = document.getElementById(
      `btn-update-${this.id}`
    ) as HTMLButtonElement;
    if (!btnEdit) throw new Error("Button update not found!");
    btnEdit.addEventListener("click", () => {
      this.store.UpdateID = this.id;
      const updateInput = document.getElementById(
        "update-car"
      ) as HTMLInputElement;
      if (!updateInput) throw new Error("Input update not found!");
      updateInput.value = this.name;
      if (updateInput.value.length) {
        const updateBtn = document.getElementById(
          "update-car-btn"
        ) as HTMLButtonElement;
        if (!updateBtn) throw new Error("Update btn not found!");
        updateBtn.disabled = false;

        const updateColorPicker = document.getElementById(
          "update-car-picker"
        ) as HTMLInputElement;
        if (!updateColorPicker)
          throw new Error("Update color picker not found!");
        updateColorPicker.disabled = false;
        updateColorPicker.value = this.color;
      }
    });

    const btnStart = document.getElementById(
      `btn-engine-start-${this.id}`
    ) as HTMLButtonElement;
    if (!btnStart) throw new Error("Button start engine not found!");
    btnStart.addEventListener("click", () => {
      this.carController
        .startDriving(this.id)
        .then(() => {})
        .catch((error) => console.log(error));
    });

    const btnStop = document.getElementById(
      `btn-engine-stop-${this.id}`
    ) as HTMLButtonElement;
    if (!btnStop) throw new Error("Button stop engine not found!");
    btnStop.addEventListener("click", () => {
      this.carController
        .stopDriving(this.id)
        .then(() => {})
        .catch((error) => console.log(error));
    });
  };

  render = () => `
    <div class="d-flex flex-column flex-md-row gap-2 justify-content-between align-items-center">
      <div class="btn-group btn-group-sm" role="group" aria-label="Controls Options">
        <button id="btn-update-${
          this.id
        }" type="button" class="btn btn-outline-primary">Select car</button>
        <button id="btn-remove-${
          this.id
        }" type="button" class="btn btn-outline-primary">Remove car</button>
        <button id="btn-engine-start-${
          this.id
        }" type="button" class="btn btn-outline-primary">Start Engine</button>
        <button id="btn-engine-stop-${
          this.id
        }" type="button" class="btn btn-outline-primary" disabled>Stop Engine</button>
      </div>
      <p class="fs-6 mb-0">${this.name}</p>
    </div>
    <div style="position: relative; border-bottom: 4px dashed #000000;">
      ${this.car.getImage(this.id, this.color)}
      ${this.car.finishIcon(this.id)}
    </div>
  `;
}

export default CarView;
