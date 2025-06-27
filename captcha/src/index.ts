(async () => {
  let canvas: HTMLCanvasElement = document.getElementById(
    "captcha-canvas",
  ) as HTMLCanvasElement;
  //#region getting puzzle settings
  let stored_width_string = localStorage.getItem("puzzle_width");
  let stored_width = stored_width_string
    ? Number.parseInt(stored_width_string)
    : 5;

  let stored_height_string = localStorage.getItem("puzzle_height");
  let stored_height = stored_height_string
    ? Number.parseInt(stored_height_string)
    : 5;

  let stored_steps_string = localStorage.getItem("puzzle_steps");
  let stored_steps = stored_steps_string
    ? Number.parseInt(stored_steps_string)
    : 3;
  //#endregion

  let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  ctx.fillStyle = "#4287f5";
  ctx.fillRect(0, 50, canvas.width, canvas.height);

  ctx.fillStyle = "#000000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "20px Arial";
  ctx.fillText("Solve the puzzle by clicking on the buttons", 195, 25);

  let c = new Creator();
  let puzzle = c.createRandom(stored_width, stored_height);

  let renderer = new PicrossRenderer(
    puzzle,
    ctx,
    new Rect2(new Vector2(0, 50), new Vector2(390, 250)),
  );
  renderer.render();
  let lights = new LightsOut(puzzle, GenerationMode.Steps, stored_steps);
  lights.generate();
  let lightsRenderer = new LightsOutRenderer(renderer, lights, ctx);
  await lightsRenderer.load();
  lightsRenderer.render();
  window.addEventListener("mousemove", (event: MouseEvent) => {
    lightsRenderer.handle_mouse(event);
  });
  window.addEventListener("click", (event: MouseEvent) => {
    lightsRenderer.handle_mouse(event);
  });
  window.addEventListener("mousedown", (event: MouseEvent) => {
    lightsRenderer.handle_mouse(event);
  });
  window.addEventListener("mouseup", (event: MouseEvent) => {
    var solved = lightsRenderer.handle_mouse(event, true);
    console.log(solved);
    if (solved && window.top) window.top.postMessage("success", "*");
  });
})();
