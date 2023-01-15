import { AppComponent } from "../../../../core/interfaces/AppComponent";

class UpdateCar implements AppComponent {
  render = () => `
  <div class="col-lg-5 mb-3 mb-lg-0">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Update car</h5>
          <div class="d-flex align-items-center mb-3 gap-3 mt-3">
            <div class="input-group input-group-md">
              <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
              <input type="text" class="form-control" aria-label="Name of create car" aria-describedby="inputGroup-sizing-sm">
            </div>
            <input type="color" class="color-picker" id="update-car-picker" value="#0000ff">
          </div>
        <button class="btn btn-primary" disabled>Update</button>
      </div>
    </div>
  </div>
  `;
}

export default UpdateCar;
