/**
 * @class
 * @type {PuzzleLine}
 * @this PuzzleLine
 *
 * a container representing a complete row or column of grid cells
 *
 * @property {string} type - either 'row' or 'column'
 * @property {number} index - the column or row index
 * @property {number} length
 * @property {number} minimumSectionLength
 * @property {array} sections
 * @property {array} cells
 * @property {boolean} solved
 */
class PuzzleLine {
  type: string;
  index: number;
  length: number;
  minimumSectionLength: number;
  sections: Array<any>;
  cells: Array<any>;
  solved: boolean;
  constructor(params: any) {
    this.type = "";
    this.index = -1;
    this.length = 0;
    this.minimumSectionLength = 0;
    this.sections = [];
    this.cells = [];
    this.solved = false;

    Object.assign(this, params);
  }
}
