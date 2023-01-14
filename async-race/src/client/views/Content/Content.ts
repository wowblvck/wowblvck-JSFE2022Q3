import CreateCar from "./CreateCar/CreateCar";
import UpdateCar from "./UpdateCar/UpdateCar";
import Race from "./Race/Race";

import "./Content.scss";

class Content {
  private create: CreateCar = new CreateCar();

  private update: UpdateCar = new UpdateCar();

  private race: Race = new Race();

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
                ${this.race.render()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

export default Content;
