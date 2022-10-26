export default class Generatename {
  constructor(size) {
    this.size = size;
    this.setName();
  }

  setName() {
    const nameLabel = document.querySelector('.name__label');
    const name = localStorage.getItem('name');
    if (!name) {
      let res = '';
      for (let i = 0; i < this.size; i += 1) {
        const random = Math.floor(Math.random() * 27);
        res += String.fromCharCode(97 + random);
      }
      nameLabel.textContent = res;
      localStorage.setItem('name', res);
    } else {
      nameLabel.textContent = name;
    }
  }
}
