import car from "../../../../core/components/Car";
import { Store } from "../../../../core/components/Store";
import { AppComponent } from "../../../../core/interfaces/AppComponent";

class CarView implements AppComponent {
  private id: number;

  private name: string;

  private color: string;

  private store: Store = Store.getInstance();

  constructor(id: number, name: string, color: string) {
    this.id = id;
    this.name = name;
    this.color = color;
  }

  addEvents = () => {
    const btnRemove = document.getElementById(`btn-remove-${this.id}`);
    if (!btnRemove) throw new Error("Button remove not found!");
    btnRemove.addEventListener("click", () => {
      car
        .delete(this.id)
        .then(() => {
          if (this.store.ItemsOfPage <= 1 && this.store.Page !== 1) {
            this.store.Page -= 1;
          }
          this.store.loadAllCars(this.store.Page);
        })
        .catch((error) => console.log(error));
    });

    const btnEdit = document.getElementById(`btn-update-${this.id}`);
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
      }

      const updateColorPicker = document.getElementById(
        "update-car-picker"
      ) as HTMLInputElement;
      if (!updateColorPicker) throw new Error("Update color picker not found!");
      updateColorPicker.value = this.color;
    });
  };

  render = () => `
  <div class="d-flex flex-wrap justify-content-between align-items-center">
    <div class="btn-group btn-group-sm" role="group" aria-label="Controls Options">
      <button id="btn-update-${
        this.id
      }" type="button" class="btn btn-outline-primary">Select car</button>
      <button id="btn-remove-${
        this.id
      }" type="button" class="btn btn-outline-primary">Remove car</button>
      <button type="button" class="btn btn-outline-primary">Start Engine</button>
      <button type="button" class="btn btn-outline-primary">Stop Engine</button>
    </div>
    <p class="fs-6 mb-0">${this.name}</p>
  </div>
  <div style="border-bottom: 4px dashed #000000;">
    ${car.getImage(this.color)}
  </div>
  `;
}

export default CarView;
