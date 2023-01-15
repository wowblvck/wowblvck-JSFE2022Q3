import urlPaths from "../../config/config";

class Car {
  static isExits = false;

  static instance: Car;

  constructor() {
    this.checkInstance();
  }

  private checkInstance = () => {
    if (Car.isExits) {
      return Car.instance;
    }
    Car.isExits = true;
    Car.instance = this;
    return false;
  };

  create = async (body: object) =>
    (
      await fetch(urlPaths.Garage, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
}

const car = new Car();

export default car;
