import car from "../../../../core/components/Car";
import { AppComponent } from "../../../../core/interfaces/AppComponent";

class CreateCar implements AppComponent {
  render = () => `
  <div class="col-lg-5 mb-3 mb-lg-0">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Create car</h5>
          <div class="d-flex align-items-center mb-3 gap-3 mt-3">
            <div class="input-group input-group-md">
              <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
              <input id="create-car-input" type="text" class="form-control" aria-label="Name of create car" aria-describedby="inputGroup-sizing-sm">
            </div>
            <input type="color" class="color-picker" id="create-car-picker" value="#0000ff">
          </div>
        <button id="create-car-button" class="btn btn-primary" disabled>Create</button>
        <div id="liveAlertPlaceholder"></div>
      </div>
    </div>
  </div>
  `;

  addEvents = () => {
    const createInput = document.getElementById(
      "create-car-input"
    ) as HTMLInputElement;
    if (!createInput) throw new Error("Create input box not found!");
    const createBtn = document.getElementById(
      "create-car-button"
    ) as HTMLButtonElement;
    if (!createInput) throw new Error("Create button not found!");
    const createColorPicker = document.getElementById(
      "create-car-picker"
    ) as HTMLInputElement;
    if (!createColorPicker) throw new Error("Create picker not found!");
    createInput.addEventListener("input", () => {
      if (createInput.value.length > 5) createBtn.disabled = false;
      else createBtn.disabled = true;
    });
    createBtn.addEventListener("click", () => {
      if (!createBtn.disabled) {
        const body = {
          name: createInput.value,
          color: createColorPicker.value,
        };
        console.log(body);
        car
          .create(body)
          .then(() => {
            createInput.value = "";
            createBtn.disabled = true;
            createColorPicker.value = "#0000ff";
          })
          .catch((error) => console.error(error));
      }
    });
  };
}

export default CreateCar;
