import githubIcon from "../../assets/icons/github-icon.svg";
import { AppComponent } from "../../core/interfaces/AppComponent";

class Footer implements AppComponent {
  render = () => `
    <footer class="footer mt-auto py-3">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <div class="col-md-4 d-flex align-items-center">
            <p class="mb-3 mb-md-0 text-muted">&copy 2023 <a href="https://rs.school" target="_blank" class="text-muted">RS School</a></p>
          </div>

          <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3"><a class="text-muted" href="https://github.com/wowblvck" target="_blank"><img class="bi" src="${githubIcon}" width="24" height="24"></a></li>
          </ul>
        </div>
      </div>
    </footer>
  `;
}

export default Footer;
