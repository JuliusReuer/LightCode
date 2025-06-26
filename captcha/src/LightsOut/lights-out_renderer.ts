class LightsOutRenderer {
  renderer: PicrossRenderer;
  lightsOut: LightsOut;
  image: HTMLImageElement = new Image();
  excluded: Vector2 = new Vector2(-1, -1);
  ctx: CanvasRenderingContext2D;
  constructor(
    renderer: PicrossRenderer,
    lightsOut: LightsOut,
    ctx: CanvasRenderingContext2D,
  ) {
    this.renderer = renderer;
    this.lightsOut = lightsOut;
    this.ctx = ctx;
  }
  async load(): Promise<void> {
    this.image.src = "assets/Sprites.png";
    this.image.style.imageRendering = "pixelated";
    await new Promise((resolve, reject) => {
      this.image.onload = () => resolve(null);
    });
  }

  render(): void {
    this.ctx.imageSmoothingEnabled = false;

    for (let i = 0; i < this.renderer.puzzle.height; i++) {
      for (let j = 0; j < this.renderer.puzzle.width; j++) {
        if (this.excluded.x == j && this.excluded.y == i) {
          continue; // Skip the excluded cell
        }
        this.draw_image(this.lightsOut.getGrid()[i][j], 0, new Vector2(j, i));
      }
    }
  }

  handle_mouse(event: MouseEvent, trigger_change: boolean = false): boolean {
    let rect = this.renderer.get_cell_board_rect();

    if (rect.contains(new Vector2(event.x, event.y))) {
      this.excluded = new Vector2(
        Math.floor((event.x - rect.x) / this.renderer.scale),
        Math.floor((event.y - rect.y) / this.renderer.scale),
      );

      if (trigger_change) {
        // If the mouse is clicked, toggle the light at the excluded position
        this.lightsOut.toggleLight(this.excluded.x, this.excluded.y);
      }

      this.renderer.render();
      this.render();
      if (event.buttons == 0) {
        this.draw_image(
          this.lightsOut.getGrid()[this.excluded.y][this.excluded.x],
          1,
          this.excluded,
        );
      } else if (event.buttons == 1) {
        this.draw_image(
          this.lightsOut.getGrid()[this.excluded.y][this.excluded.x],
          2,
          this.excluded,
        );
      }
    } else if (!this.excluded.equals(new Vector2(-1, -1))) {
      // If the mouse is outside the grid and we have an excluded cell, redraw the grid
      this.excluded = new Vector2(-1, -1);
      this.renderer.render();
      this.render();
    }

    return this.lightsOut.isSolved();
  }

  draw_image(green: boolean, state: number, position: Vector2) {
    let rect = this.renderer.get_cell_rect(position);

    this.ctx.drawImage(
      this.image,
      green ? 0 : 16, // Source x for the off state
      16 * state, // Source y
      16, // Source width
      16, // Source height
      rect.x, // Destination x
      rect.y, // Destination y
      rect.width, // Destination width
      rect.height, // Destination height
    );
  }
}
