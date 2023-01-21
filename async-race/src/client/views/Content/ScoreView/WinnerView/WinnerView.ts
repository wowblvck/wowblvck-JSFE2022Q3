import Car from "../../../../core/components/Car";

import "./WinnerView.scss";

class WinnerView {
  private car: Car = Car.getInstance();

  private index: number;

  private id: number;

  private carColor: string;

  private name: string;

  private wins: number;

  private time: number;

  constructor(
    index: number,
    id: number,
    carColor: string,
    name: string,
    wins: number,
    time: number
  ) {
    this.index = index;
    this.id = id;
    this.carColor = carColor;
    this.name = name;
    this.wins = wins;
    this.time = time;
  }

  render = () => `
    <tr>
      <th scope="row">${this.index}</th>
      <td class="winner-icon">${this.car.getImage(this.id, this.carColor)}</td>
      <td>${this.name}</td>
      <td>${this.wins}</td>
      <td>${this.time}</td>
    </tr>
  `;
}

export default WinnerView;
