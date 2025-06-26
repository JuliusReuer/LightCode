class Rect2 {
  public x: number;
  public y: number;
  public width: number;
  public height: number;

  constructor(position: Vector2, size: Vector2) {
    this.x = position.x;
    this.y = position.y;
    this.width = size.x;
    this.height = size.y;
  }

  public get_right(): number {
    return this.x + this.width;
  }

  public get_bottom(): number {
    return this.y + this.height;
  }

  public contains(point: Vector2): boolean {
    return (
      point.x >= this.x &&
      point.x < this.get_right() &&
      point.y >= this.y &&
      point.y < this.get_bottom()
    );
  }

  public intersects(other: Rect2): boolean {
    return !(
      this.get_right() < other.x ||
      this.x > other.get_right() ||
      this.get_bottom() < other.y ||
      this.y > other.get_bottom()
    );
  }

  public toString(): string {
    return `Rect2(x: ${this.x}, y: ${this.y}, width: ${this.width}, height: ${this.height})`;
  }

  public draw(ctx: CanvasRenderingContext2D, color: string = "#000000"): void {
    ctx.fillStyle = color;
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fill();
  }
}
