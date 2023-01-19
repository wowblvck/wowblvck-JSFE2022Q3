import Header from "../views/Header/Header";
import Content from "../views/Content/Content";
import Footer from "../views/Footer/Footer";

class App {
  private header: Header = new Header();

  private content: Content = new Content();

  private footer: Footer = new Footer();

  render = () => `
    ${this.header.render()}
    ${this.content.render()}
    ${this.footer.render()}
  `;

  addEvents = () => {
    this.content.addEvents();
    this.header.addEvents();
  };
}

export default App;
