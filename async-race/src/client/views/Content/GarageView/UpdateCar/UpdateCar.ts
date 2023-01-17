import car from "../../../../core/components/Car";
import { Store } from "../../../../core/components/Store";
import { AppComponent } from "../../../../core/interfaces/AppComponent";

class UpdateCar implements AppComponent {
  private store: Store = Store.getInstance();

  addEvents = () => {
    const input = document.getElementById("update-car") as HTMLInputElement;
    if (!input) throw new Error("Update input not found!");

    const btn = document.getElementById("update-car-btn") as HTMLButtonElement;
    if (!btn) throw new Error("Update button not found!");

    const colorPicker = document.getElementById(
      "update-car-picker"
    ) as HTMLInputElement;
    if (!colorPicker) throw new Error("Update color picker not found!");

    input.addEventListener("input", () => {
      if (this.store.UpdateID !== -1 && input.value.length > 5) {
        btn.disabled = false;
      } else {
        btn.disabled = true;
      }
    });

    btn.addEventListener("click", () => {
      if (!btn.disabled) {
        const body = {
          name: input.value,
          color: colorPicker.value,
        };
        car
          .update(this.store.UpdateID, body)
          .then(() => {
            input.value = "";
            btn.disabled = true;
            colorPicker.value = "#0000ff";
            this.store.UpdateID = -1;
            this.store.loadAllCars(this.store.Page);
          })
          .catch((error) => console.log(error));
      }
    });
  };

  render = () => `
  <div class="col-lg-5 mb-3 mb-lg-0">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Update car</h5>
          <div class="d-flex align-items-center mb-3 gap-3 mt-3">
            <div class="input-group input-group-md">
              <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
              <input id="update-car" type="text" class="form-control" aria-label="Name of create car" aria-describedby="inputGroup-sizing-sm">
            </div>
            <input type="color" class="color-picker" id="update-car-picker" value="#0000ff">
          </div>
        <button id="update-car-btn" class="btn btn-primary" disabled>Update</button>
      </div>
    </div>
  </div>
  `;
}

export default UpdateCar;
