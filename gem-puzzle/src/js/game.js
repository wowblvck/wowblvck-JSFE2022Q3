export default class Game {
  constructor(context, cellSize, frameSize) {
    this.nowstate = frameSize;
    this.state = Game.setState(this.nowstate);
    this.color = '#008aff';
    this.context = context;
    this.cellSize = cellSize;
    this.clicks = 0;
  }

  static setState(n) {
    const matrix = [];
    for (let i = 0; i < n; i += 1) {
      matrix[i] = [];
      for (let j = 0; j < n; j += 1) {
        matrix[i][j] = n * i + j + 1;
      }
    }
    matrix[n - 1][n - 1] = 0;
    return matrix;
  }

  static getRandomBool() {
    if (Math.floor(Math.random() * 2) === 0) {
      return true;
    }
    return false;
  }

  getNullCell() {
    for (let i = 0; i < this.nowstate; i += 1) {
      for (let j = 0; j < this.nowstate; j += 1) {
        if (this.state[j][i] === 0) {
          return { x: i, y: j };
        }
      }
    }
    return false;
  }

  mix(count, n) {
    let x;
    let y;
    for (let i = 0; i < count; i += 1) {
      const nullCell = this.getNullCell();

      const verticalMove = Game.getRandomBool();
      const upLeft = Game.getRandomBool();

      if (verticalMove) {
        x = nullCell.x;
        if (upLeft) {
          y = nullCell.y - 1;
        } else {
          y = nullCell.y + 1;
        }
      } else {
        y = nullCell.y;
        if (upLeft) {
          x = nullCell.x - 1;
        } else {
          x = nullCell.x + 1;
        }
      }

      if (x >= 0 && x <= n - 1 && y >= 0 && y <= n - 1) {
        this.move(x, y);
      }
    }
    this.clicks = 0;
  }

  cellView(x, y) {
    this.context.fillStyle = this.color;
    this.context.fillRect(
      x + 1,
      y + 1,
      this.cellSize - 2,
      this.cellSize - 2,
    );
  }

  numView() {
    this.context.font = '1.8em Montserrat';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.fillStyle = '#000';
  }

  draw = () => {
    for (let i = 0; i < this.nowstate; i += 1) {
      for (let j = 0; j < this.nowstate; j += 1) {
        if (this.state[i][j] > 0) {
          this.cellView(
            j * this.cellSize,
            i * this.cellSize,
          );
          this.numView();
          this.context.fillText(
            this.state[i][j],
            j * this.cellSize + this.cellSize / 2,
            i * this.cellSize + this.cellSize / 2,
          );
        }
      }
    }
  };

  move(x, y) {
    const nullCell = this.getNullCell();
    const canMoveVertical = (x - 1 === nullCell.x || x + 1 === nullCell.x) && y === nullCell.y;
    const canMoveHorizontal = (y - 1 === nullCell.y || y + 1 === nullCell.y) && x === nullCell.x;

    if (canMoveVertical || canMoveHorizontal) {
      this.state[nullCell.y][nullCell.x] = this.state[y][x];
      this.state[y][x] = 0;
      this.clicks += 1;
    }
  }

  getClicks() {
    return this.clicks;
  }

  victory() {
    const combination = Game.setState(this.nowstate);
    let res = true;
    for (let i = 0; i < this.nowstate; i += 1) {
      for (let j = 0; j < this.nowstate; i += 1) {
        if (combination[i][j] != this.state[i][j]) {
          res = false;
          break;
        }
      }
    }
    return res;
  }
}
