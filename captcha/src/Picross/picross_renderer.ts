class PicrossRenderer {
  static margin: number = 5;
  puzzle: Puzzle;
  scale: number = 1;
  base_rect: Rect2 = new Rect2(new Vector2(0, 0), new Vector2(0, 0));
  boardRect: Rect2;
  ctx: CanvasRenderingContext2D;
  constructor(puzzle: Puzzle, ctx: CanvasRenderingContext2D, boardRect: Rect2) {
    this.puzzle = puzzle;
    this.ctx = ctx;
    this.boardRect = boardRect;
  }
  target_size: Vector2 = new Vector2(390, 225);
  render(solution: boolean = false): void {
    var max_row_Hints = 0;
    var max_column_Hints = 0;
    for (let line of this.puzzle.rowHints) {
      max_row_Hints = Math.max(max_row_Hints, line.length);
    }

    for (let line of this.puzzle.columnHints) {
      max_column_Hints = Math.max(max_column_Hints, line.length);
    }

    var width = this.puzzle.width + max_row_Hints;
    var height = this.puzzle.height + max_column_Hints;

    var scale_x = this.target_size.x / width;
    var scale_y = this.target_size.y / height;
    this.scale = Math.min(scale_x, scale_y);

    // Draw base rectangle
    var base_size = new Vector2(width * this.scale, height * this.scale);
    this.base_rect = new Rect2(
      new Vector2(
        this.boardRect.x + this.boardRect.width / 2 - base_size.x / 2,
        this.boardRect.y + this.boardRect.height / 2 - base_size.y / 2,
      ),
      base_size,
    );

    this.ctx.fillStyle = "#f33469";
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.roundRect(
      this.base_rect.x - PicrossRenderer.margin,
      this.base_rect.y - PicrossRenderer.margin,
      this.base_rect.width + PicrossRenderer.margin * 2,
      this.base_rect.height + PicrossRenderer.margin * 2,
      5,
    );
    this.ctx.fill();
    this.ctx.stroke();

    // Draw grid
    this.ctx.strokeStyle = "#000000";
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    // Draw vertical lines
    for (let i = 1; i <= this.puzzle.height; i++) {
      this.ctx.moveTo(
        this.base_rect.x,
        this.base_rect.y + this.base_rect.height - i * this.scale,
      );
      this.ctx.lineTo(
        this.base_rect.x + this.base_rect.width,
        this.base_rect.y + this.base_rect.height - i * this.scale,
      );
    }
    this.ctx.stroke();

    this.ctx.beginPath();
    // Draw vertical lines
    for (let i = 1; i <= this.puzzle.width; i++) {
      this.ctx.moveTo(
        this.base_rect.x + this.base_rect.width - i * this.scale,
        this.base_rect.y,
      );
      this.ctx.lineTo(
        this.base_rect.x + this.base_rect.width - i * this.scale,
        this.base_rect.y + this.base_rect.height,
      );
    }
    this.ctx.stroke();

    //#region Draw hints
    // Draw row hints
    this.ctx.font = `${this.scale * 0.5}px Arial`;
    this.ctx.fillStyle = "#000000";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.beginPath();
    for (let i = 0; i < this.puzzle.rowHints.length; i++) {
      const hints = this.puzzle.rowHints[i];
      for (let j = hints.length - 1; j >= 0; j--) {
        var hint_rect = new Rect2(
          new Vector2(
            this.base_rect.x +
              this.base_rect.width -
              (this.puzzle.width + hints.length) * this.scale +
              j * this.scale,
            this.base_rect.y +
              this.base_rect.height -
              this.puzzle.height * this.scale +
              i * this.scale,
          ),
          new Vector2(this.scale, this.scale),
        );

        this.ctx.fillText(
          hints[j].toString(),
          hint_rect.x + this.scale * 0.5,
          hint_rect.y + this.scale * 0.5,
        );
      }
    }
    this.ctx.fill();

    // Draw column hints
    this.ctx.beginPath();
    for (let i = 0; i < this.puzzle.columnHints.length; i++) {
      const hints = this.puzzle.columnHints[i];
      for (let j = 0; j < hints.length; j++) {
        var hint_rect = new Rect2(
          new Vector2(
            this.base_rect.x +
              this.base_rect.width -
              this.puzzle.width * this.scale +
              i * this.scale,
            this.base_rect.y +
              this.base_rect.height -
              (this.puzzle.height + hints.length) * this.scale +
              j * this.scale,
          ),
          new Vector2(this.scale, this.scale),
        );

        this.ctx.fillText(
          hints[j].toString(),
          hint_rect.x + this.scale * 0.5,
          hint_rect.y + this.scale * 0.5,
        );
      }
    }
    this.ctx.fill();
    //#endregion

    if (solution) {
      // Draw solution
      for (let i = 0; i < this.puzzle.height; i++) {
        for (let j = 0; j < this.puzzle.width; j++) {
          if (this.puzzle.grid[i][j] === 1) {
            var cell_rect = this.get_cell_rect(new Vector2(j, i));
            cell_rect.draw(this.ctx, "#000000");
          }
        }
      }
    }
  }

  get_cell_board_rect(): Rect2 {
    var rect = new Rect2(
      new Vector2(
        this.base_rect.x +
          this.base_rect.width -
          this.puzzle.width * this.scale,
        this.base_rect.y +
          this.base_rect.height -
          this.puzzle.height * this.scale,
      ),
      new Vector2(
        this.puzzle.width * this.scale,
        this.puzzle.height * this.scale,
      ),
    );
    return rect;
  }
  get_cell_rect(cell: Vector2): Rect2 {
    var cell_rect = new Rect2(
      new Vector2(
        this.base_rect.x +
          this.base_rect.width -
          (this.puzzle.width - cell.x) * this.scale,
        this.base_rect.y +
          this.base_rect.height -
          (this.puzzle.height - cell.y) * this.scale,
      ),
      new Vector2(this.scale, this.scale),
    );
    return cell_rect;
  }
}
