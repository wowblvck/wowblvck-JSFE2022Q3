class Garage {
  static isExits = false;

  static instance: Garage;

  constructor() {
    this.checkInstance();
  }

  checkInstance = () => {
    if (Garage.isExits) {
      return Garage.instance;
    }
    Garage.isExits = true;
    Garage.instance = this;
    return true;
  };
}

const garage = new Garage();

export default garage;
