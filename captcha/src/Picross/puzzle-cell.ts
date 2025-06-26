/**
 * @class
 * @type {PuzzleCell}
 * @this PuzzleCell
 *
 * a container representing a single cell in the puzzle grid
 *
 * @property {number} index
 * @property {number} column
 * @property {number} row
 * @property {*} solution - null, 0, or 1
 * @property {*} userSolution - null, 0, or 1
 * @property {*} aiSolution - null, 0, or 1
 */
class PuzzleCell {
  index: number;
  column: number;
  row: number;
  solution: number | null; // null, 0, or 1
  userSolution: number | null; // null, 0, or 1
  aiSolution: number | null; // null, 0, or 1
  constructor(params: any) {
    this.index = -1;
    this.column = -1;
    this.row = -1;
    this.solution = null;
    this.userSolution = null;
    this.aiSolution = null;

    Object.assign(this, params);
  }
}
