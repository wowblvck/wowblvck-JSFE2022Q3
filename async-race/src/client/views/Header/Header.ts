import garageIcon from "../../assets/icons/garage-icon.svg";
import winnerIcon from "../../assets/icons/winners-icon.svg";
import { AppComponent } from "../../core/interfaces/AppComponent";

class Header implements AppComponent {
  render = () => `
    <header class="px-3 py-2 text-bg-dark">
      <div class="container">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a href="/" class="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
            ASYNC RACE
          </a>
          <ul class="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
            <li>
              <a href="/garage" class="nav-link text-secondary">
                <img class="bi d-block mx-auto mb-1" width="24" height="24" src="${garageIcon}" alt="Garage Icon">
                Garage
              </a>
            </li>
            <li>
              <a href="/winners" class="nav-link text-white">
              <img class="bi d-block mx-auto mb-1" width="24" height="24" src="${winnerIcon}" alt="Winners Icon">
                Winners
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  `;
}

export default Header;
