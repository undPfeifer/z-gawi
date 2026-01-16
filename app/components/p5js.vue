<template>
  <div ref="p5Container" style="width: 100vw; height: 80vh;" ></div>
</template>

<script>
export default {
  async mounted() {
    const { default: p5 } = await import("p5");

    const sketch = (p) => {
      let planeImg;
      let x, y;
      let targetX, targetY;

      p.preload = () => {
        // Replace with your own image path
        planeImg = p.loadImage("/img/spaceship-01.png");
      };

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, 300);
        canvas.parent(p._userNode);

        x = p.width / 2;
        y = p.height / 2;
        targetX = x;
        targetY = y;

        p.imageMode(p.CENTER);
        p.angleMode(p.RADIANS);
      };

      p.draw = () => {
        p.background(230);

        // Mouse target
        targetX = p.mouseX;
        targetY = p.mouseY;

        // Smooth follow
        x = p.lerp(x, targetX, 0.08);
        y = p.lerp(y, targetY, 0.08);

        // Direction-based rotation
        const angle = p.atan2(targetY - y, targetX - x);

        p.push();
        p.translate(x, y);
        p.rotate(angle);
        p.image(planeImg, 0, 0, 60, 60);
        p.pop();
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, 300);
      };
    };

    this.p5Instance = new p5(sketch, this.$refs.p5Container);
  },

  beforeUnmount() {
    this.p5Instance?.remove();
  }
};
</script>
