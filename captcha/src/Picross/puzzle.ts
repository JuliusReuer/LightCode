/**
 * @class
 * @type {Puzzle}
 * @this Puzzle
 *
 * the main puzzle class containing the grid of cells, row/column hints, etc.
 *
 * @property {number} width
 * @property {number} height
 * @property {number} totalCells
 * @property {array} cells
 * @property {array} rowHints
 * @property {array} columnHints
 * @property {Creator|null} creator
 * @property {array} grid - a multi-dimensional array representing rows and columns.
 *                   for example a 2x2 grid could be represented by [[0,1],[0,0]]
 */
class Puzzle {
  width: number;
  height: number;
  totalCells: number;
  cells: Array<PuzzleCell> = [];
  rowHints: Array<Array<number>> = [];
  columnHints: Array<Array<number>> = [];
  creator: any;
  grid: Array<Array<number>> = [];

  /**
   * @param {number} width - an integer >= 1 specifying the number of rows
   * @param {number} height - an integer >= 1 specifying the number of columns
   * @throws - error if width or height are invalid
   */
  constructor(width: number, height: number) {
    if (width <= 0 || height <= 0 || (width === 1 && height === 1)) {
      throw (
        "invalid dimensions: " + width.toString() + " x " + height.toString()
      );
    }

    this.width = width;
    this.height = height;
    this.totalCells = this.width * this.height;

    this.reset();
  }

  /**
   * empty all arrays and create zero-filled multidimensional grid array
   */
  reset() {
    const zeroFill = Utility.getZeroFilledArray;

    this.creator = null;
    this.cells = [];
    this.rowHints = [];
    this.columnHints = [];
    this.grid = zeroFill(this.height).map(() => {
      return zeroFill(this.width);
    });
  }

  checkUserSolution(): boolean {
    return this.cells.every((cell) => {
      // cell.solution will be 0 or 1, but cell.userSolution might be null, 0 or 1
      const userValue = cell.userSolution === 1 ? 1 : 0;

      return cell.solution === userValue;
    });
  }

  getRowCells(row: number): Array<any> | boolean {
    const cells = [];
    let start = row * this.width,
      end = start + this.width,
      i;

    for (i = start; i < end; i++) {
      cells.push(this.cells[i]);
    }

    return cells.length > 0 ? cells : false;
  }

  getColumnCells(column: number): Array<any> | boolean {
    const cells = [];
    let i;

    for (i = column; i < this.cells.length; i += this.width) {
      cells.push(this.cells[i]);
    }

    return cells.length > 0 ? cells : false;
  }

  getCellByIndex(index: number): PuzzleCell | null {
    return this.cells[index] ? this.cells[index] : null;
  }
}
