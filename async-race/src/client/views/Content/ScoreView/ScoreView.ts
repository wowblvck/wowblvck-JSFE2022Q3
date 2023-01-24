import { Store } from "../../../core/components/Store";
import WinnerView from "./WinnerView/WinnerView";

import "./ScoreView.scss";

class ScoreView {
  private store: Store = Store.getInstance();

  private winnerComponents: WinnerView[] = [];

  constructor() {
    if (this.store.Winners.length) {
      this.winnerComponents = this.store.Winners.map(
        (winner, i) =>
          new WinnerView(
            i + 1,
            winner.id,
            winner.car.color,
            winner.car.name,
            winner.wins,
            winner.time
          )
      );
      this.store.WinnerItemsOfPage = this.winnerComponents.length;
    }
  }

  addEvents = () => {
    const nextBtn = document.getElementById(
      "next-winner-btn"
    ) as HTMLButtonElement;
    if (!nextBtn) throw new Error("Next button winner not found!");
    nextBtn.addEventListener("click", () => {
      if (this.store.WinnerMaxPages !== 1) {
        if (this.store.WinnerPage >= this.store.WinnerMaxPages) {
          this.store.WinnerPage = 1;
        } else {
          this.store.WinnerPage += 1;
        }
        this.store.loadWinners(
          this.store.Sort,
          this.store.Order,
          this.store.WinnerPage
        );
      }
    });

    const prevBtn = document.getElementById(
      "prev-winner-btn"
    ) as HTMLButtonElement;
    if (!prevBtn) throw new Error("Prev button winner not found!");
    prevBtn.addEventListener("click", () => {
      if (this.store.WinnerMaxPages !== 1) {
        if (this.store.WinnerPage <= 1) {
          this.store.WinnerPage = this.store.WinnerMaxPages;
        } else {
          this.store.WinnerPage -= 1;
        }
        this.store.loadWinners(
          this.store.Sort,
          this.store.Order,
          this.store.WinnerPage
        );
      }
    });

    const winsSort = document.getElementById(
      "wins-sort"
    ) as HTMLTableColElement;
    winsSort.addEventListener("click", () => {
      this.store.Sort = "wins";
      this.store.Order = this.store.Order === "asc" ? "desc" : "asc";
      this.store.loadWinners(
        this.store.Sort,
        this.store.Order,
        this.store.WinnerPage
      );
    });

    const timeSort = document.getElementById(
      "time-sort"
    ) as HTMLTableColElement;
    timeSort.addEventListener("click", () => {
      this.store.Sort = "time";
      this.store.Order = this.store.Order === "asc" ? "desc" : "asc";
      this.store.loadWinners(
        this.store.Sort,
        this.store.Order,
        this.store.WinnerPage
      );
    });
  };

  render = () => `
    <section id="score-table" class="container">
      <h2 class="text-center mb-1">Winners</h2>
      <p class="fs-5 text-center mb-3">Winners: ${this.store.WinnersCount} (${
    this.store.WinnerItemsOfPage
  } on page)</p>
      <table class="table table-striped align-middle">
        <thead class="table-dark">
          <tr class="align-middle">
            <th scope="col">#</th>
            <th scope="col">Car</th>
            <th scope="col">Name</th>
            <th id="wins-sort" class="score-sort" scope="col"><span class="text-decoration-underline">Wins</span></th>
            <th id="time-sort" class="score-sort" scope="col"><span class="text-decoration-underline">Best time (seconds)</span></th>
          </tr>
        </thead>
        <tbody>
          ${this.winnerComponents.map((winner) => winner.render()).join("")}
        </tbody>
      </table>
    </section>
    <nav class="mt-3" aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li id="prev-winner-btn" class="page-item"><button class="page-link">Previous</button></li>
      <li class="page-item"><p class="page-link m-0">${
        this.store.WinnerPage
      } / ${this.store.WinnerMaxPages}</p></li>
      <li id="next-winner-btn" class="page-item"><button class="page-link">Next</button></li>
    </ul>
  </nav>
  `;
}

export default ScoreView;
