enum GenerationMode {
  Steps = "steps", // Makes it easyer to control the difficulty of the puzzle
  Random = "random",
  Green = "green",
  Blue = "blue",
  None = "none",
}

class LightsOut {
  private grid: boolean[][];
  private solution: boolean[][];
  private puzzle: Puzzle;
  private mode: GenerationMode;
  private steps: number;

  constructor(
    puzzle: Puzzle,
    mode: GenerationMode = GenerationMode.Steps,
    steps: number = 10,
  ) {
    this.puzzle = puzzle;
    this.grid = [];
    this.solution = [];
    this.mode = mode;
    this.steps = steps;
  }

  generate() {
    this.grid = [];
    this.solution = [];
    for (let i = 0; i < this.puzzle.height; i++) {
      this.grid[i] = [];
      this.solution[i] = [];
      for (let j = 0; j < this.puzzle.width; j++) {
        switch (this.mode) {
          case GenerationMode.Green:
            this.grid[i][j] = false;
            break;
          case GenerationMode.Blue:
            this.grid[i][j] = true;
            break;
          case GenerationMode.Random:
            this.grid[i][j] = Math.random() < 0.5;
            break;
          default:
            this.grid[i][j] = this.puzzle.grid[i][j] == 1;
            break;
        }
        this.solution[i][j] = this.puzzle.grid[i][j] == 1; // Store the initial state as the solution
      }
    }

    if (this.mode === GenerationMode.Steps) {
      for (let i = 0; i < this.steps; i++) {
        const x = Math.floor(Math.random() * this.puzzle.width);
        const y = Math.floor(Math.random() * this.puzzle.height);
        this.toggleLight(x, y);
      }
    }
  }

  toggleLight(x: number, y: number): void {
    this.grid[y][x] = !this.grid[y][x];

    if (y > 0) this.grid[y - 1][x] = !this.grid[y - 1][x];
    if (y < this.grid.length - 1) this.grid[y + 1][x] = !this.grid[y + 1][x];
    if (x > 0) this.grid[y][x - 1] = !this.grid[y][x - 1];
    if (x < this.grid[y].length - 1) this.grid[y][x + 1] = !this.grid[y][x + 1];
  }

  isSolved(): boolean {
    for (let y = 0; y < this.solution.length; y++) {
      for (let x = 0; x < this.solution[y].length; x++) {
        if (this.solution[y][x] != this.grid[y][x]) return false;
      }
    }
    return true;
  }

  getGrid(): boolean[][] {
    return this.grid;
  }
}
