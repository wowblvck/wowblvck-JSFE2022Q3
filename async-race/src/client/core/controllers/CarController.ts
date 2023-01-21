import Car from "../components/Car";
import { Store } from "../components/Store";
import RaceResult from "../interfaces/Race";
import { getDistanceBetweenElements } from "../utils/utils";

class CarController {
  private store: Store = Store.getInstance();

  private car: Car = Car.getInstance();

  static instance: CarController;

  static getInstance() {
    if (!CarController.instance) {
      CarController.instance = new CarController();
    }
    return CarController.instance;
  }

  animation = (
    carIcon: HTMLElement,
    distance: number,
    animationTime: number
  ) => {
    let start: number;
    const state = {
      id: -1,
    };

    const step = (timestamp: number) => {
      const carElement = carIcon;
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));

      carElement.style.transform = `translateX(${Math.min(
        passed,
        distance
      )}px)`;

      if (passed < distance) {
        state.id = window.requestAnimationFrame(step);
      }
    };

    state.id = window.requestAnimationFrame(step);

    return state;
  };

  startDriving = async (id: number) => {
    const startButton = document.getElementById(
      `btn-engine-start-${id}`
    ) as HTMLButtonElement;
    if (!startButton) throw new Error("Button engine start not found!");
    startButton.disabled = true;
    startButton.classList.remove("btn-outline-primary");
    startButton.classList.add("btn-outline-danger");

    const { velocity, distance } = await this.car.startEngine(id);
    const time = Math.round(distance / velocity);

    startButton.classList.remove("btn-outline-danger");
    startButton.classList.add("btn-outline-primary");

    const btnStop = document.getElementById(
      `btn-engine-stop-${id}`
    ) as HTMLButtonElement;
    if (!btnStop) throw new Error("Button stop engine not found!");
    btnStop.disabled = false;

    const carIcon = document.getElementById(`car-icon-${id}`) as HTMLElement;
    if (!carIcon) throw new Error("Car icon not found!");
    const finishIcon = document.getElementById(
      `finish-icon-${id}`
    ) as HTMLElement;
    if (!finishIcon) throw new Error("Finish icon not found!");
    const htmlDistance =
      Math.floor(getDistanceBetweenElements(carIcon, finishIcon)) + 80;

    this.store.Animation[id] = this.animation(carIcon, htmlDistance, time);
    const { success } = await this.car.drive(id);
    const successFlag = success === undefined ? false : success;
    if (!success) window.cancelAnimationFrame(this.store.Animation[id].id);
    const carItem = this.store.Cars.find((elem) => elem.id === id);
    if (!carItem) throw new Error(`No car found with id ${id}`);
    return { success: successFlag, id, name: carItem.name, time };
  };

  stopDriving = async (id: number) => {
    const btnStop = document.getElementById(
      `btn-engine-stop-${id}`
    ) as HTMLButtonElement;
    if (!btnStop) throw new Error("Button stop engine not found!");
    btnStop.disabled = true;
    btnStop.classList.remove("btn-outline-primary");
    btnStop.classList.add("btn-outline-danger");
    await this.car.stopEngine(id);
    btnStop.classList.remove("btn-outline-danger");
    btnStop.classList.add("btn-outline-primary");

    const startButton = document.getElementById(
      `btn-engine-start-${id}`
    ) as HTMLButtonElement;
    if (!startButton) throw new Error("Button engine start not found!");
    startButton.disabled = false;

    const carIcon = document.getElementById(`car-icon-${id}`) as HTMLElement;
    if (!carIcon) throw new Error("Car icon not found!");
    carIcon.style.transform = `translateX(0)`;
    if (this.store.Animation[id]) {
      window.cancelAnimationFrame(this.store.Animation[id].id);
    }
  };

  raceAll = async (
    promises: Promise<RaceResult>[],
    ids: number[]
  ): Promise<RaceResult> => {
    const { success, id, time } = await Promise.race(promises);

    if (!success) {
      const failedIndex = ids.findIndex((i) => i === id);
      if (failedIndex === -1) throw new Error(`No id ${id} found!`);
      const restPromises = [
        ...promises.slice(0, failedIndex),
        ...promises.slice(failedIndex + 1, promises.length),
      ];
      const restIds = [
        ...ids.slice(0, failedIndex),
        ...ids.slice(failedIndex + 1, ids.length),
      ];
      return this.raceAll(restPromises, restIds);
    }

    const carItem = this.store.Cars.find((elem) => elem.id === id);
    if (!carItem) throw new Error(`No car find with id ${id}`);
    return {
      success: true,
      ...carItem,
      time: +(time / 1000).toFixed(2),
    };
  };

  race = async (action: (id: number) => Promise<RaceResult>) => {
    const promises = this.store.Cars.map((elem) => action(elem.id));
    const winner = await this.raceAll(
      promises,
      this.store.Cars.map((elem) => elem.id)
    );
    return winner;
  };
}

export default CarController;
